import { forwardRef, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import { MovieService } from './movie.service';
import { PrismaService } from '../../prisma/prisma.service';
import { MovieResolver } from './movie.resolver';
import { MovieCommentModule } from '../movie-comment/movie-comment.module';
import {AuthUserService} from "../auth-user/auth-user.service";
import {ConfigService} from "@nestjs/config";

@Module({
  imports: [forwardRef(() => MovieCommentModule)],
  providers: [
    MovieResolver,
    MovieService,
    PrismaService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
      AuthUserService,
      ConfigService,
  ],
  controllers: [],
  exports: [MovieResolver, MovieService],
})
export class MovieModule {}
