import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy } from "passport-jwt";

import { AuthUserService } from '../../auth-user/auth-user.service';
import { ExtractJwt } from 'passport-jwt';
import { AuthUser } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authUserService: AuthUserService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const { username } = payload;
    const user: AuthUser = await this.authUserService.getUser(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
