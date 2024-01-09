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
import { PubSub } from 'graphql-subscriptions';

import { MovieInputCreate, MovieInputEdit } from './movie.input';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';
import { MovieCommentService } from '../movie-comment/movie-comment.service';
import { MovieComment } from '../movie-comment/movie-comment.model';

const MOVIE_ADDED_EVENT = 'movieAdded';

const pubSub = new PubSub();

@Resolver(() => Movie)
export class MovieResolver {
  constructor(
    private movieService: MovieService,
    private movieCommentService: MovieCommentService,
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
    await pubSub.publish(MOVIE_ADDED_EVENT, {
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
    return this.movieService.deleteMovie(id);
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
    return pubSub.asyncIterator(MOVIE_ADDED_EVENT);
  }
}
