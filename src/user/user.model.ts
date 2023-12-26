import { User as UserClient } from '@prisma/client';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User model' })
export class User implements UserClient {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String, {
    nullable: true,
    description: "Description to user's username",
    defaultValue: '',
  })
  description: string | null;

  @Field(() => String)
  username: string;
}
