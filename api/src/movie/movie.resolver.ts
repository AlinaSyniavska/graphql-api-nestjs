import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';

import { MovieInputCreate, MovieInputEdit } from './movie.input';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';
import { MovieCommentService } from '../movie-comment/movie-comment.service';
import { MovieComment } from '../movie-comment/movie-comment.model';
import { Inject, UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

const movieEvents = {
  MOVIE_ADDED: 'movieAdded',
  MOVIE_DELETED: 'movieDeleted',
};

@Resolver(() => Movie)
@UseGuards(JwtAuthGuard)
export class MovieResolver {
  constructor(
    private movieService: MovieService,
    private movieCommentService: MovieCommentService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Query(() => [Movie])
  async getAllMovies(): Promise<Movie[]> {
    return this.movieService.getAllMovies();
  }

  @Query(() => Movie)
  async getMovieById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Movie> {
    return this.movieService.getMovieById(id);
  }

  @Mutation(() => Movie)
  async createMovie(
    @Args('movieInputCreate') movieInputCreate: MovieInputCreate,
  ): Promise<Movie> {
    // return this.movieService.createMovie(movieInputCreate);

    const newMovie = this.movieService.createMovie(movieInputCreate);
    await this.pubSub.publish(movieEvents.MOVIE_ADDED, {
      movieAddedSubscription: newMovie,
    });

    return newMovie;
  }

  @Mutation(() => Movie)
  async updateMovie(
    @Args('movieInputEdit') movieInputEdit: MovieInputEdit,
  ): Promise<Movie> {
    return this.movieService.updateMovie(movieInputEdit);
  }

  @Mutation(() => Movie)
  async deleteMovie(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Movie> {
    // return this.movieService.deleteMovie(id);
    const movie = this.movieService.deleteMovie(id);
    await this.pubSub.publish(movieEvents.MOVIE_DELETED, {
      movieDeletedSubscription: movie,
    });
    return movie;
  }

  @ResolveField('movieComment', () => [MovieComment])
  async getMovieComment(@Parent() movie: Movie) {
    const { id } = movie;
    return this.movieCommentService.getAllMovieCommentsByMovieId(id);
  }

  @Subscription(() => Movie, {
    name: 'movieAddedSubscription',
  })
  movieAdded() {
    return this.pubSub.asyncIterator(movieEvents.MOVIE_ADDED);
  }

  @Subscription(() => Movie, {
    name: 'movieDeletedSubscription',
    description: 'Subscription for movie deleting',
  })
  movieDeleted() {
    return this.pubSub.asyncIterator(movieEvents.MOVIE_DELETED);
  }
}
