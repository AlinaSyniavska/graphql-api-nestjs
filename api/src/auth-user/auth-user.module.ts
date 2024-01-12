import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserResolver } from './auth-user.resolver';
import {PrismaService} from "../../prisma/prisma.service";

@Module({
  providers: [AuthUserService, AuthUserResolver, PrismaService]
})
export class AuthUserModule {}
