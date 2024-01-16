import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { AuthUserInput } from './auth-user.input';
import { ISignupResponse } from './interfaces';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '@prisma/client';

@Injectable()
export class AuthUserService {
  constructor(private prisma: PrismaService) {}

  async createUser(user: AuthUserInput): Promise<ISignupResponse> {
    const { username, password } = user;

    const newUser: AuthUser = await this.prisma.authUser
      .create({
        data: {
          username,
          password,
        },
      })
      .catch((error) => {
        if (error.code === '23505' || error.code === 'P2002') {
          throw new ConflictException(`Username ${username} already exist.`);
        } else {
          throw new BadRequestException();
        }
      });

    return { username: newUser.username };
  }

  async getUser(username: string): Promise<AuthUser> {
    return this.prisma.authUser.findFirstOrThrow({
      where: {
        username,
      },
    });
  }
}
