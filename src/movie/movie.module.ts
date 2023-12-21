import { Module } from '@nestjs/common';

import { MovieService } from './movie.service';
import { PrismaService } from '../../prisma/prisma.service';
import { MovieResolver } from './movie.resolver';

@Module({
  providers: [MovieResolver, MovieService, PrismaService],
  controllers: [],
  exports: [MovieResolver, MovieService],
})
export class MovieModule {}
