import { AuthUser as AuthUserClient } from '@prisma/client';
import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType({description: 'User model'})
export class AuthUser implements AuthUserClient {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    createdAt: Date;

    @Field(() => String)
    password: string;

    @Field(() => String)
    username: string;
}
