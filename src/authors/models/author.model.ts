import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../../posts/models/post.model';

@ObjectType({ description: 'Author model' })
export class Author {
  @Field((type) => Int)
  id: number;

  @Field({
    nullable: true,
    description: "Author's last name",
    defaultValue: 'Clementina',
  })
  firstName?: string;

  @Field({
    nullable: true,
    description: "Author's last name",
    defaultValue: 'DuBuque',
  })
  lastName?: string;

  @Field((type) => [Post], { description: 'Lists of posts' })
  posts: Post[];
}
