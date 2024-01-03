// THIS IS A GENERATED FILE, use `yarn codegen` to regenerate
/* tslint:disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Movie model */
export type Movie = {
  __typename?: 'Movie';
  createdAt: Scalars['String']['output'];
  /** User's description to the movie */
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  movieComment: Array<MovieComment>;
  /** User's title to the movie */
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type MovieComment = {
  __typename?: 'MovieComment';
  createdAt: Scalars['String']['output'];
  /** Comment that was added */
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  /** How many likes a Movie has */
  likes: Scalars['Float']['output'];
  movieId: Scalars['Float']['output'];
  user: User;
  userId: Scalars['Float']['output'];
};

export type MovieCommentInput = {
  /** User's description */
  description: Scalars['String']['input'];
  /** Movie which was commented */
  movieId: Scalars['Float']['input'];
  /** User who wrote the comment */
  userId: Scalars['Float']['input'];
};

export type MovieInputCreate = {
  /** User's description to the movie */
  description?: InputMaybe<Scalars['String']['input']>;
  /** User's title to the movie */
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMovie: Movie;
  createMovieComment: MovieComment;
};


export type MutationCreateMovieArgs = {
  movieInputCreate: MovieInputCreate;
};


export type MutationCreateMovieCommentArgs = {
  movieCommentInput: MovieCommentInput;
};

export type Query = {
  __typename?: 'Query';
  getAllMovies: Array<Movie>;
  getAllUsers: Array<User>;
  getMovieById: Movie;
  getUserById: User;
};


export type QueryGetMovieByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int']['input'];
};

/** User model */
export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  /** Description to user's username */
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  movieCommentsUserLeft: Array<MovieComment>;
  username: Scalars['String']['output'];
};

export type GetAllMoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMoviesQuery = { __typename?: 'Query', getAllMovies: Array<{ __typename?: 'Movie', id: number, title: string, description?: string | null }> };

export type GetMovieByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetMovieByIdQuery = { __typename?: 'Query', getMovieById: { __typename?: 'Movie', id: number, title: string, description?: string | null, movieComment: Array<{ __typename?: 'MovieComment', id: number, description?: string | null, likes: number }> } };

export type NewMovieMutationVariables = Exact<{
  movie: MovieInputCreate;
}>;


export type NewMovieMutation = { __typename?: 'Mutation', createMovie: { __typename?: 'Movie', title: string, description?: string | null } };


export const GetAllMoviesDocument = gql`
    query getAllMovies {
  getAllMovies {
    id
    title
    description
  }
}
    `;

/**
 * __useGetAllMoviesQuery__
 *
 * To run a query within a React component, call `useGetAllMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMoviesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllMoviesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllMoviesQuery, GetAllMoviesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllMoviesQuery, GetAllMoviesQueryVariables>(GetAllMoviesDocument, options);
      }
export function useGetAllMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllMoviesQuery, GetAllMoviesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllMoviesQuery, GetAllMoviesQueryVariables>(GetAllMoviesDocument, options);
        }
export function useGetAllMoviesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllMoviesQuery, GetAllMoviesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllMoviesQuery, GetAllMoviesQueryVariables>(GetAllMoviesDocument, options);
        }
export type GetAllMoviesQueryHookResult = ReturnType<typeof useGetAllMoviesQuery>;
export type GetAllMoviesLazyQueryHookResult = ReturnType<typeof useGetAllMoviesLazyQuery>;
export type GetAllMoviesSuspenseQueryHookResult = ReturnType<typeof useGetAllMoviesSuspenseQuery>;
export type GetAllMoviesQueryResult = Apollo.QueryResult<GetAllMoviesQuery, GetAllMoviesQueryVariables>;
export const GetMovieByIdDocument = gql`
    query getMovieById($id: Int!) {
  getMovieById(id: $id) {
    id
    title
    description
    movieComment {
      id
      description
      likes
    }
  }
}
    `;

/**
 * __useGetMovieByIdQuery__
 *
 * To run a query within a React component, call `useGetMovieByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMovieByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMovieByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMovieByIdQuery(baseOptions: Apollo.QueryHookOptions<GetMovieByIdQuery, GetMovieByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMovieByIdQuery, GetMovieByIdQueryVariables>(GetMovieByIdDocument, options);
      }
export function useGetMovieByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMovieByIdQuery, GetMovieByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMovieByIdQuery, GetMovieByIdQueryVariables>(GetMovieByIdDocument, options);
        }
export function useGetMovieByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMovieByIdQuery, GetMovieByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMovieByIdQuery, GetMovieByIdQueryVariables>(GetMovieByIdDocument, options);
        }
export type GetMovieByIdQueryHookResult = ReturnType<typeof useGetMovieByIdQuery>;
export type GetMovieByIdLazyQueryHookResult = ReturnType<typeof useGetMovieByIdLazyQuery>;
export type GetMovieByIdSuspenseQueryHookResult = ReturnType<typeof useGetMovieByIdSuspenseQuery>;
export type GetMovieByIdQueryResult = Apollo.QueryResult<GetMovieByIdQuery, GetMovieByIdQueryVariables>;
export const NewMovieDocument = gql`
    mutation newMovie($movie: MovieInputCreate!) {
  createMovie(movieInputCreate: $movie) {
    title
    description
  }
}
    `;
export type NewMovieMutationFn = Apollo.MutationFunction<NewMovieMutation, NewMovieMutationVariables>;

/**
 * __useNewMovieMutation__
 *
 * To run a mutation, you first call `useNewMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newMovieMutation, { data, loading, error }] = useNewMovieMutation({
 *   variables: {
 *      movie: // value for 'movie'
 *   },
 * });
 */
export function useNewMovieMutation(baseOptions?: Apollo.MutationHookOptions<NewMovieMutation, NewMovieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewMovieMutation, NewMovieMutationVariables>(NewMovieDocument, options);
      }
export type NewMovieMutationHookResult = ReturnType<typeof useNewMovieMutation>;
export type NewMovieMutationResult = Apollo.MutationResult<NewMovieMutation>;
export type NewMovieMutationOptions = Apollo.BaseMutationOptions<NewMovieMutation, NewMovieMutationVariables>;