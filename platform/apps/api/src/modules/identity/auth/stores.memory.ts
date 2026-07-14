import { randomUUID } from "node:crypto";
import type {
  AuthUser,
  OtpChallenge,
  OtpStore,
  RefreshRecord,
  RefreshStore,
  UserStore,
} from "./auth.types";
import type { OtpDispatcher } from "./auth.service";

/**
 * In-memory adapters: unit tests and local bootstrapping. The Prisma-backed
 * adapters replace these behind the same ports (E2 sprint work).
 */

export class MemoryUserStore implements UserStore {
  private byId = new Map<string, AuthUser>();
  private byIdentifier = new Map<string, string>();

  async findById(id: string) {
    return this.byId.get(id) ?? null;
  }

  async findByIdentifier(identifier: string) {
    const id = this.byIdentifier.get(identifier);
    return id ? (this.byId.get(id) ?? null) : null;
  }

  async createFromIdentifier(identifier: string): Promise<AuthUser> {
    const user: AuthUser = {
      id: randomUUID(),
      ...(identifier.includes("@") ? { email: identifier } : { phone: identifier }),
      role: "PLAYER",
      status: "PENDING",
      tokenVersion: 1,
    };
    this.byId.set(user.id, user);
    this.byIdentifier.set(identifier, user.id);
    return user;
  }
}

export class MemoryOtpStore implements OtpStore {
  private challenges = new Map<string, OtpChallenge>();

  async put(challenge: OtpChallenge) {
    this.challenges.set(challenge.identifier, challenge);
  }
  async get(identifier: string) {
    return this.challenges.get(identifier) ?? null;
  }
  async delete(identifier: string) {
    this.challenges.delete(identifier);
  }
  async incrementAttempts(identifier: string) {
    const c = this.challenges.get(identifier);
    if (!c) return Number.MAX_SAFE_INTEGER;
    c.attempts += 1;
    return c.attempts;
  }
}

export class MemoryRefreshStore implements RefreshStore {
  private byHash = new Map<string, RefreshRecord>();

  async put(record: RefreshRecord) {
    this.byHash.set(record.tokenHash, record);
  }
  async getByHash(tokenHash: string) {
    return this.byHash.get(tokenHash) ?? null;
  }
  async revokeFamily(familyId: string) {
    const now = Date.now();
    for (const record of this.byHash.values()) {
      if (record.familyId === familyId && !record.revokedAt) {
        record.revokedAt = now;
      }
    }
  }
}

export class ConsoleOtpDispatcher implements OtpDispatcher {
  async send(identifier: string, code: string) {
    // eslint-disable-next-line no-console
    console.log(`[OTP] ${identifier} -> ${code}`);
  }
}

export class SilentOtpDispatcher implements OtpDispatcher {
  sent: Array<{ identifier: string; code: string }> = [];
  async send(identifier: string, code: string) {
    this.sent.push({ identifier, code });
  }
}
