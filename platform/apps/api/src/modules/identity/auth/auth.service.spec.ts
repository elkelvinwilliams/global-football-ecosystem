import { beforeEach, describe, expect, it } from "vitest";
import { UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TokenService } from "./token.service";
import {
  MemoryOtpStore,
  MemoryRefreshStore,
  MemoryUserStore,
  SilentOtpDispatcher,
} from "./stores.memory";

describe("AuthService", () => {
  let auth: AuthService;
  let users: MemoryUserStore;
  let otps: MemoryOtpStore;
  let refresh: MemoryRefreshStore;
  let dispatcher: SilentOtpDispatcher;
  let tokens: TokenService;

  const PHONE = "+233201234567";

  beforeEach(() => {
    users = new MemoryUserStore();
    otps = new MemoryOtpStore();
    refresh = new MemoryRefreshStore();
    dispatcher = new SilentOtpDispatcher();
    tokens = new TokenService();
    auth = new AuthService(users, otps, refresh, dispatcher, tokens);
  });

  async function login() {
    await auth.requestOtp(PHONE);
    const { code } = dispatcher.sent.at(-1)!;
    return auth.verifyOtp(PHONE, code);
  }

  it("issues a token pair for a new user on correct OTP", async () => {
    const pair = await login();
    expect(pair.accessToken).toBeTruthy();
    expect(pair.refreshToken).toBeTruthy();

    const claims = await tokens.verifyAccess(pair.accessToken);
    expect(claims.role).toBe("PLAYER");
    const user = await users.findByIdentifier(PHONE);
    expect(user?.id).toBe(claims.sub);
  });

  it("rejects a wrong code and burns the challenge after max attempts", async () => {
    await auth.requestOtp(PHONE);
    for (let i = 0; i < 5; i++) {
      await expect(auth.verifyOtp(PHONE, "000000")).rejects.toThrow(
        UnauthorizedException
      );
    }
    // 6th attempt exceeds the cap even with the right code
    const { code } = dispatcher.sent.at(-1)!;
    await expect(auth.verifyOtp(PHONE, code)).rejects.toThrow(
      "Too many attempts"
    );
  });

  it("rejects an expired challenge", async () => {
    await auth.requestOtp(PHONE);
    const challenge = await otps.get(PHONE);
    challenge!.expiresAt = Date.now() - 1;
    const { code } = dispatcher.sent.at(-1)!;
    await expect(auth.verifyOtp(PHONE, code)).rejects.toThrow(
      "OTP expired or not requested"
    );
  });

  it("rotates the refresh token and keeps the session alive", async () => {
    const first = await login();
    const second = await auth.refreshPair(first.refreshToken);
    expect(second.refreshToken).not.toBe(first.refreshToken);

    const third = await auth.refreshPair(second.refreshToken);
    expect(third.accessToken).toBeTruthy();
  });

  it("burns the whole family on refresh-token reuse", async () => {
    const first = await login();
    const second = await auth.refreshPair(first.refreshToken);

    // Replay of the first (already-rotated) token = theft signal
    await expect(auth.refreshPair(first.refreshToken)).rejects.toThrow(
      "Refresh token reuse detected"
    );
    // The current generation must be dead too
    await expect(auth.refreshPair(second.refreshToken)).rejects.toThrow(
      UnauthorizedException
    );
  });

  it("rejects unknown refresh tokens", async () => {
    await expect(auth.refreshPair("not-a-token")).rejects.toThrow(
      "Invalid refresh token"
    );
  });
});
