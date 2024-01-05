import { forwardRef, Module } from '@nestjs/common';

import { MovieService } from './movie.service';
import { PrismaService } from '../../prisma/prisma.service';
import { MovieResolver } from './movie.resolver';
import { MovieCommentModule } from '../movie-comment/movie-comment.module';

@Module({
  imports: [forwardRef(() => MovieCommentModule)],
  providers: [MovieResolver, MovieService, PrismaService],
  controllers: [],
  exports: [MovieResolver, MovieService],
})
export class MovieModule {}
