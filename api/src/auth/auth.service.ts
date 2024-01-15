import {HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import {AuthUserInput} from '../auth-user/auth-user.input';
import {SignupResponse} from './signup-response';
import {AuthUserService} from '../auth-user/auth-user.service';
import {AuthUser} from '@prisma/client';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private authUserService: AuthUserService,
                private jwtService: JwtService,) {
    }

    async signup(loginUserInput: AuthUserInput): Promise<SignupResponse> {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(loginUserInput.password, salt);
        loginUserInput.password = hashPassword;

        return this.authUserService.createUser(loginUserInput);
    }

    async validateUser(username: string, password: string): Promise<AuthUser> {
        const user = await this.authUserService.getUser(username);

        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        throw new UnauthorizedException();
    }

    async signin(user: AuthUser): Promise<SignupResponse> {
        const username = user.username;
        const access_token = await this.jwtService.sign({
            username,
            sub: user.id,
        });

        if(!access_token) {
            throw new HttpException('Invalid credentials', 404)
        }

        return {
            username,
            accessToken: access_token,
        };
    }
}
