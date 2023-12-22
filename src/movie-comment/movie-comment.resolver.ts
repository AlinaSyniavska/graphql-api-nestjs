import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { MovieComment } from './movie-comment.model';
import { MovieCommentService } from './movie-comment.service';
import { UserService } from '../user/user.service';
import { MovieCommentInput } from './movie-comment.input';
import { User } from '../user/user.model';

@Resolver(() => MovieComment)
export class MovieCommentResolver {
  constructor(
    private movieCommentService: MovieCommentService,
    private userService: UserService,
  ) {}

  @Mutation(() => MovieComment)
  async createMovieComment(
    @Args('movieCommentInput') movieCommentInput: MovieCommentInput,
  ): Promise<MovieComment> {
    return this.movieCommentService.createMovieComment(movieCommentInput);
  }

  @ResolveField('user', () => User)
  async getUserThatLikedTheComment(
    @Parent() movieComment: MovieComment,
  ): Promise<User> {
    const { userId } = movieComment;
    return this.userService.getUserById(userId);
  }
}
