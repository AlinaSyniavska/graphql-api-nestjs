/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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

export type MoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type MoviesQuery = { __typename?: 'Query', getAllMovies: Array<{ __typename?: 'Movie', title: string, description?: string | null }> };


export const MoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Movies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllMovies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<MoviesQuery, MoviesQueryVariables>;