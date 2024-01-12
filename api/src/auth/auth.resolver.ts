import {Args, Mutation, Resolver} from '@nestjs/graphql';

import { AuthService } from './auth.service';
import {SignupResponse} from "./signup-response";
import {AuthUserInput} from "../auth-user/auth-user.input";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => SignupResponse)
  async signup(@Args('loginUserInput') loginUserInput: AuthUserInput): Promise<SignupResponse> {
    return this.authService.signup(loginUserInput);
  }
}
