import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserResolver } from './auth-user.resolver';

@Module({
  providers: [AuthUserService, AuthUserResolver]
})
export class AuthUserModule {}
