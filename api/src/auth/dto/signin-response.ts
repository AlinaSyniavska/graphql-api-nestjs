import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SigninResponse {
  @Field()
  username: string;

  @Field()
  accessToken: string;
}
