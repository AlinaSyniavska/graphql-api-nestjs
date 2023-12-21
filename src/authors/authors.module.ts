import { Module } from '@nestjs/common';

import { PostsModule } from '../posts/posts.module';

@Module({})
export class AuthorsModule {
  imports: [PostsModule];
}
