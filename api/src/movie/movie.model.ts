import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Movie as MovieClient } from '@prisma/client';

@ObjectType({ description: 'Movie model' })
export class Movie implements MovieClient {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;

  @Field(() => String, {
    nullable: false,
    description: "User's title to the movie",
    defaultValue: '',
  })
  title: string;

  @Field(() => String, {
    nullable: true,
    description: "User's description to the movie",
  })
  description: string;
}
