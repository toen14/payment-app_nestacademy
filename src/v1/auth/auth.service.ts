import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";

import { UserService } from "src/v1/user/user.service";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import { RefreshToken } from "./entities/refresh-token.entity";
import { JWTTokenInterface } from "./interfaces/jwt.interface";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<User> {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const checkPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!checkPassword) {
      throw new UnauthorizedException();
    }

    delete user.password;

    return user;
  }

  async login(user: User) {
    const refreshToken = this.refreshTokenRepository.create({ user });
    const { refreshTokenId } = await this.refreshTokenRepository.save(
      refreshToken,
    );

    const payload: JWTTokenInterface = {
      name: user.name,
      sub: user.id,
      role: user.role,
      refresh_token_id: refreshTokenId,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async refreshToken(token: string) {
    const tokenDecode = this.jwtService.decode(token) as JWTTokenInterface;

    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { refreshTokenId: tokenDecode.refresh_token_id },
    });

    if (!refreshToken && new Date() > refreshToken.expiredAt) {
      throw new UnauthorizedException();
    }

    delete tokenDecode.exp;

    return this.jwtService.signAsync(tokenDecode);
  }

  async logout(token: string) {
    const tokenDecode = this.jwtService.decode(token) as JWTTokenInterface;

    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { refreshTokenId: tokenDecode.refresh_token_id },
    });

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    return this.refreshTokenRepository.remove(refreshToken);
  }

  async removeRefreshTokens(token: string) {
    const tokenDecode = this.jwtService.decode(token) as JWTTokenInterface;

    const refreshToken = await this.refreshTokenRepository.find({
      where: { user: tokenDecode.sub },
    });

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    return this.refreshTokenRepository.remove(refreshToken);
  }
}
