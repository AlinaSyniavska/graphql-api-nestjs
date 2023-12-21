import { Resolver } from '@nestjs/graphql';
import { Author } from './models/author.model';

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(

  ) {}
}
