import { forwardRef, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import { MovieService } from './movie.service';
import { PrismaService } from '../../prisma/prisma.service';
import { MovieResolver } from './movie.resolver';
import { MovieCommentModule } from '../movie-comment/movie-comment.module';
import { AuthUserService } from '../auth-user/auth-user.service';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/strategy';

@Module({
  imports: [forwardRef(() => MovieCommentModule), AuthModule],
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
    JwtStrategy,
  ],
  controllers: [],
  exports: [MovieResolver, MovieService],
})
export class MovieModule {}
