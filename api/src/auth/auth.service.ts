import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthUserInput } from '../auth-user/auth-user.input';
import { SignupResponse } from './signup-response';
import { AuthUserService } from '../auth-user/auth-user.service';

@Injectable()
export class AuthService {
  constructor(private authUserService: AuthUserService) {}

  async signup(loginUserInput: AuthUserInput): Promise<SignupResponse> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(loginUserInput.password, salt);
    loginUserInput.password = hashPassword;

    return this.authUserService.createUser(loginUserInput);
  }
}
