import {
  Inject,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { randomInt, randomUUID } from "node:crypto";
import {
  OTP_STORE,
  REFRESH_STORE,
  USER_STORE,
  type AuthUser,
  type OtpStore,
  type RefreshStore,
  type TokenPair,
  type UserStore,
} from "./auth.types";
import { TokenService } from "./token.service";

const OTP_TTL_MS = 5 * 60_000;
const OTP_MAX_ATTEMPTS = 5;
const REFRESH_TTL_MS =
  Number(process.env.REFRESH_TTL_DAYS ?? 30) * 24 * 60 * 60_000;

/** Pluggable dispatcher: console in dev, SMS/WhatsApp/email in prod. */
export interface OtpDispatcher {
  send(identifier: string, code: string): Promise<void>;
}
export const OTP_DISPATCHER = Symbol("OTP_DISPATCHER");

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_STORE) private readonly users: UserStore,
    @Inject(OTP_STORE) private readonly otps: OtpStore,
    @Inject(REFRESH_STORE) private readonly refresh: RefreshStore,
    @Inject(OTP_DISPATCHER) private readonly dispatcher: OtpDispatcher,
    private readonly tokens: TokenService
  ) {}

  async requestOtp(identifier: string): Promise<void> {
    const code = randomInt(0, 1_000_000).toString().padStart(6, "0");
    await this.otps.put({
      identifier,
      codeHash: TokenService.hash(code),
      expiresAt: Date.now() + OTP_TTL_MS,
      attempts: 0,
    });
    await this.dispatcher.send(identifier, code);
  }

  async verifyOtp(identifier: string, code: string): Promise<TokenPair> {
    const challenge = await this.otps.get(identifier);
    if (!challenge || challenge.expiresAt < Date.now()) {
      throw new UnauthorizedException("OTP expired or not requested");
    }
    const attempts = await this.otps.incrementAttempts(identifier);
    if (attempts > OTP_MAX_ATTEMPTS) {
      await this.otps.delete(identifier);
      throw new UnauthorizedException("Too many attempts");
    }
    if (challenge.codeHash !== TokenService.hash(code)) {
      throw new UnauthorizedException("Invalid code");
    }
    await this.otps.delete(identifier);

    const user =
      (await this.users.findByIdentifier(identifier)) ??
      (await this.users.createFromIdentifier(identifier));
    if (user.status === "SUSPENDED" || user.status === "DELETED") {
      throw new ForbiddenException("Account unavailable");
    }
    // Fresh login starts a fresh token family.
    return this.issuePair(user, randomUUID());
  }

  /**
   * Rotating refresh with reuse detection. The family id is stable across
   * rotations: rotating revokes every live token in the family and mints the
   * next generation inside it. Presenting an already-revoked token is
   * evidence of theft — the whole family (including the current generation)
   * is burned and the caller must re-authenticate.
   */
  async refreshPair(presented: string): Promise<TokenPair> {
    const record = await this.refresh.getByHash(TokenService.hash(presented));
    if (!record || record.expiresAt < Date.now()) {
      throw new UnauthorizedException("Invalid refresh token");
    }
    if (record.revokedAt) {
      await this.refresh.revokeFamily(record.familyId);
      throw new UnauthorizedException("Refresh token reuse detected");
    }
    const user = await this.users.findById(record.userId);
    if (!user || user.status === "SUSPENDED" || user.status === "DELETED") {
      throw new UnauthorizedException("Account unavailable");
    }
    await this.refresh.revokeFamily(record.familyId);
    return this.issuePair(user, record.familyId);
  }

  private async issuePair(user: AuthUser, familyId: string): Promise<TokenPair> {
    const { token, hash } = this.tokens.mintRefresh();
    await this.refresh.put({
      tokenHash: hash,
      familyId,
      userId: user.id,
      expiresAt: Date.now() + REFRESH_TTL_MS,
    });
    return {
      accessToken: await this.tokens.signAccess(user),
      refreshToken: token,
      expiresIn: this.tokens.accessTtlSec,
    };
  }
}
