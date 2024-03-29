import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Movie } from '@prisma/client';

import { MovieInputCreate, MovieInputEdit } from './movie.input';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async getAllMovies(): Promise<Movie[]> {
    return this.prisma.movie.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async getMovieById(id: number): Promise<Movie> {
    return this.prisma.movie.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  async createMovie({ title, description }: MovieInputCreate): Promise<Movie> {
    return this.prisma.movie.create({
      data: {
        title,
        description,
      },
    });
  }

  async updateMovie({
    id,
    title,
    description,
  }: MovieInputEdit): Promise<Movie> {
    return this.prisma.movie.upsert({
      update: {
        title,
        description,
      },
      create: {
        title,
        description,
      },
      where: {
        id,
      },
    });
  }

  async deleteMovie(movieId: number): Promise<Movie> {
    return this.prisma.movie
      .delete({
        where: {
          id: movieId,
        },
      })
      .catch(() => {
        throw new NotFoundException(`Can't find item with id ${movieId}`);
      });
  }
}
