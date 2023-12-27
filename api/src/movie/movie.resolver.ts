import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { MovieInputCreate } from './movie.input';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';
import { MovieCommentService } from '../movie-comment/movie-comment.service';
import { MovieComment } from '../movie-comment/movie-comment.model';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(
    private movieService: MovieService,
    private movieCommentService: MovieCommentService,
  ) {}

  @Query(() => [Movie])
  async getAllMovies(): Promise<Movie[]> {
    const data = this.movieService.getAllMovies();

    console.log('1---------');
    console.log(data);
    console.log('1---------');

    return data;
    // return this.movieService.getAllMovies();
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
    return this.movieService.createMovie(movieInputCreate);
  }

  @ResolveField('movieComment', () => [MovieComment])
  async getMovieComment(@Parent() movie: Movie) {
    const { id } = movie;
    return this.movieCommentService.getAllMovieCommentsByMovieId(id);
  }
}