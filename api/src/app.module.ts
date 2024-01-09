import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { MovieCommentModule } from './movie-comment/movie-comment.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      subscriptions: {
        "graphql-ws": true,
        'subscriptions-transport-ws': true,
      },
    }),
    MovieModule,
    UserModule,
    MovieCommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
