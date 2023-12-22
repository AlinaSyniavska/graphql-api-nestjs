import { Module } from '@nestjs/common';
import { MovieCommentService } from './movie-comment.service';

@Module({
  providers: [MovieCommentService],
})
export class MovieCommentModule {}
