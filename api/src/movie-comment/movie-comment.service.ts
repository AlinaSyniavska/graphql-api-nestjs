import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { MovieComment } from './movie-comment.model';
import { MovieCommentInput } from './movie-comment.input';

@Injectable()
export class MovieCommentService {
  constructor(private prisma: PrismaService) {}

  async getMovieCommentsCountByMovieId(movieId: number): Promise<number> {
    return this.prisma.movieComment.count({
      where: {
        movieId,
      },
    });
  }

  async getAllMovieCommentsByMovieId(movieId: number): Promise<MovieComment[]> {
    return this.prisma.movieComment.findMany({
      where: {
        movieId,
      },
    });
  }

  async getMovieCommetById(id: number): Promise<MovieComment> {
    return this.prisma.movieComment.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async createMovieComment(
    movieCommentInput: MovieCommentInput,
  ): Promise<MovieComment> {
    return this.prisma.movieComment.create({
      data: {
        movieId: movieCommentInput.movieId,
        userId: movieCommentInput.userId,
        description: movieCommentInput.description,
        likes: 0,
      },
    });
  }

  async deleteAllMovieCommentsByMovieId(movieId: number): Promise<unknown> {
    return this.prisma.movieComment.deleteMany({
      where: {
        movieId,
      },
    });
  }

  async getAllMovieCommentsByUserId(userId: number): Promise<MovieComment[]> {
    return this.prisma.movieComment.findMany({
      where: {
        userId,
      },
    });
  }
}
