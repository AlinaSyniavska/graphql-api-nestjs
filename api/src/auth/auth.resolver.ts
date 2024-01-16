import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignupResponse } from './signup-response';
import { AuthUserInput } from '../auth-user/auth-user.input';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => SignupResponse)
  async signup(@Args('loginUserInput') loginUserInput: AuthUserInput): Promise<SignupResponse> {
    return this.authService.signup(loginUserInput);
  }

  @Mutation(() => SignupResponse)
  @UseGuards(GqlAuthGuard)
  async signin(
    @Args('loginUserInput') loginUserInput: AuthUserInput,
    @Context() context,
  ): Promise<SignupResponse> {
    return this.authService.signin(context.user);
  }
}
