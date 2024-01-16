import {Field, InputType} from "@nestjs/graphql";
import {IsString, Length, Matches} from "class-validator";

@InputType()
export class AuthUserInput {
    @Field(() => String)
    @IsString()
    @Length(3, 20)
    username: string;

    @Field(() => String)
    @IsString()
    @Length(8, 40)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message: 'Password is too weak',
    })
    password: string;
}
