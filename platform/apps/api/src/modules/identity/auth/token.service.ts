import { Injectable } from "@nestjs/common";
import { SignJWT, jwtVerify } from "jose";
import { createHash, randomBytes } from "node:crypto";
import type { AuthUser } from "./auth.types";

const encoder = new TextEncoder();

@Injectable()
export class TokenService {
  private readonly secret = encoder.encode(
    process.env.JWT_ACCESS_SECRET ?? "dev-only-secret-change-me"
  );
  readonly accessTtlSec = Number(process.env.JWT_ACCESS_TTL ?? 900);

  async signAccess(user: AuthUser): Promise<string> {
    return new SignJWT({
      role: user.role,
      ver: user.tokenVersion,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(user.id)
      .setAudience("gfe-api")
      .setIssuedAt()
      .setExpirationTime(`${this.accessTtlSec}s`)
      .sign(this.secret);
  }

  async verifyAccess(token: string) {
    const { payload } = await jwtVerify(token, this.secret, {
      audience: "gfe-api",
    });
    return payload;
  }

  /** Opaque refresh token: random value returned to the client, hash stored. */
  mintRefresh(): { token: string; hash: string } {
    const token = randomBytes(48).toString("base64url");
    return { token, hash: TokenService.hash(token) };
  }

  static hash(value: string): string {
    return createHash("sha256").update(value).digest("hex");
  }
}
