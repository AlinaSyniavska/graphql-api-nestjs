import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthUserService } from '../auth-user/auth-user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtStrategy, LocalStrategy } from './strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        signOptions: {
          expiresIn: '10h',
        },
        secret: configService.get('JWT_SECRET'),
      }),
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    AuthUserService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
  ],
/*  exports: [
    JwtModule,
    PassportModule,
    AuthService,
  ],*/
})
export class AuthModule {}
