import { Controller, Post, Body, Headers, Get } from "@nestjs/common";
import { PublicGuard } from "../common/decorators/public.decorators";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("v1/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicGuard()
  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto);

    return this.authService.login(user);
  }

  @Get("refresh-token")
  async refreshToken(@Headers("Authorization") jwtToken: string) {
    return {
      access_token: await this.authService.refreshToken(jwtToken.split(" ")[1]),
    };
  }

  @Get("logout")
  async logout(@Headers("Authorization") jwtToken: string) {
    await this.authService.logout(jwtToken.split(" ")[1]);
    return {
      massage: "Logout successfully",
    };
  }

  @Get("logout-refresh-tokens")
  async removeRefreshTokens(@Headers("Authorization") jwtToken: string) {
    await this.authService.removeRefreshTokens(jwtToken.split(" ")[1]);
    return {
      massage: "Logout successfully",
    };
  }
}
