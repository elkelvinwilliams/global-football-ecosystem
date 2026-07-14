import { z } from "zod";

export const OtpRequestDto = z
  .object({
    email: z.string().email().optional(),
    phone: z.string().regex(/^\+[1-9]\d{6,14}$/, "E.164 phone required").optional(),
  })
  .refine((v) => !!v.email !== !!v.phone, {
    message: "Provide exactly one of email or phone",
  });
export type OtpRequestDto = z.infer<typeof OtpRequestDto>;

export const OtpVerifyDto = z.object({
  identifier: z.string().min(3), // the email or phone used in the request
  code: z.string().length(6),
  device: z.string().max(200).optional(),
});
export type OtpVerifyDto = z.infer<typeof OtpVerifyDto>;

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthUser {
  id: string;
  email?: string;
  phone?: string;
  role: string;
  status: string;
  tokenVersion: number;
}

export interface OtpChallenge {
  identifier: string;
  codeHash: string;
  expiresAt: number;
  attempts: number;
}

export interface RefreshRecord {
  tokenHash: string;
  familyId: string;
  userId: string;
  expiresAt: number;
  revokedAt?: number;
}

/** Persistence ports — in-memory for tests, Prisma adapter in production. */
export interface UserStore {
  findById(id: string): Promise<AuthUser | null>;
  findByIdentifier(identifier: string): Promise<AuthUser | null>;
  createFromIdentifier(identifier: string): Promise<AuthUser>;
}

export interface OtpStore {
  put(challenge: OtpChallenge): Promise<void>;
  get(identifier: string): Promise<OtpChallenge | null>;
  delete(identifier: string): Promise<void>;
  incrementAttempts(identifier: string): Promise<number>;
}

export interface RefreshStore {
  put(record: RefreshRecord): Promise<void>;
  getByHash(tokenHash: string): Promise<RefreshRecord | null>;
  revokeFamily(familyId: string): Promise<void>;
}

export const USER_STORE = Symbol("USER_STORE");
export const OTP_STORE = Symbol("OTP_STORE");
export const REFRESH_STORE = Symbol("REFRESH_STORE");
