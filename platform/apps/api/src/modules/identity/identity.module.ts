import { Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import { AuthService, OTP_DISPATCHER } from "./auth/auth.service";
import { TokenService } from "./auth/token.service";
import { OTP_STORE, REFRESH_STORE, USER_STORE } from "./auth/auth.types";
import {
  ConsoleOtpDispatcher,
  MemoryOtpStore,
  MemoryRefreshStore,
  MemoryUserStore,
} from "./auth/stores.memory";

/**
 * Identity & Access context. Memory adapters bootstrap local development;
 * Prisma adapters replace them behind the same ports without touching the
 * service (E2 sprint work).
 */
@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    { provide: USER_STORE, useClass: MemoryUserStore },
    { provide: OTP_STORE, useClass: MemoryOtpStore },
    { provide: REFRESH_STORE, useClass: MemoryRefreshStore },
    { provide: OTP_DISPATCHER, useClass: ConsoleOtpDispatcher },
  ],
  exports: [TokenService],
})
export class IdentityModule {}
