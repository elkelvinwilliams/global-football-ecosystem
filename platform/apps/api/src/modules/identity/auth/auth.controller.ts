import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { OtpRequestDto, OtpVerifyDto } from "./auth.types";

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("otp/request")
  @HttpCode(204)
  async requestOtp(@Body() body: unknown): Promise<void> {
    const parsed = OtpRequestDto.safeParse(body);
    if (!parsed.success) throw new BadRequestException(parsed.error.issues);
    const identifier = parsed.data.email ?? parsed.data.phone!;
    await this.auth.requestOtp(identifier);
  }

  @Post("otp/verify")
  @HttpCode(200)
  async verifyOtp(@Body() body: unknown) {
    const parsed = OtpVerifyDto.safeParse(body);
    if (!parsed.success) throw new BadRequestException(parsed.error.issues);
    return this.auth.verifyOtp(parsed.data.identifier, parsed.data.code);
  }

  @Post("refresh")
  @HttpCode(200)
  async refresh(@Body() body: { refreshToken?: string }) {
    if (!body?.refreshToken) {
      throw new BadRequestException("refreshToken required");
    }
    return this.auth.refreshPair(body.refreshToken);
  }
}
