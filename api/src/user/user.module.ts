import { forwardRef, Module } from '@nestjs/common';

import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { MovieCommentModule } from '../movie-comment/movie-comment.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [forwardRef(() => MovieCommentModule)],
  providers: [UserService, PrismaService, UserResolver],
  exports: [UserService, UserResolver],
})
export class UserModule {}
