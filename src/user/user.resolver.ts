import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { UserService } from './user.service';
import { MovieCommentService } from '../movie-comment/movie-comment.service';
import { User } from './user.model';
import { MovieComment } from '../movie-comment/movie-comment.model';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private movieCommentService: MovieCommentService,
  ) {}

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Query(() => User)
  async getUserById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> {
    return this.userService.getUserById(id);
  }

  @ResolveField('movieCommentsUserLeft', () => [MovieComment])
  async getMovieCommentsThatUserWritten(
    @Parent() user: User,
  ): Promise<MovieComment[]> {
    const { id } = user;

    return this.movieCommentService.getAllMovieCommentsByUserId(id);
  }
}
