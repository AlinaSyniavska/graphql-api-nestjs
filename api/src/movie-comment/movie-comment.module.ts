import { forwardRef, Module } from '@nestjs/common';

import { MovieCommentService } from './movie-comment.service';
import { PrismaService } from '../../prisma/prisma.service';
import { MovieCommentResolver } from './movie-comment.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [PrismaService, MovieCommentService, MovieCommentResolver],
  exports: [MovieCommentService, MovieCommentResolver],
})
export class MovieCommentModule {}
