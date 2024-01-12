import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import {AuthUserService} from "../auth-user/auth-user.service";
import {PrismaService} from "../../prisma/prisma.service";

@Module({
  providers: [AuthService, AuthResolver, AuthUserService, PrismaService]
})
export class AuthModule {}
