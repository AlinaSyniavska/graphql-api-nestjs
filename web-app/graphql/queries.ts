import { gql } from '@apollo/client';

/*export const CHARACTERS_QUERY = gql`
  query characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        image
        name
        gender
        species
        episode {
          id
          episode
          air_date
        }
        origin {
          dimension
          id
        }
      }
    }
  }
`;

export const CHARACTER_QUERY = gql`
  query character($id: ID!) {
    character(id: $id) {
      id
      image
      name
      gender
      species
      origin {
        dimension
        id
      }
    }
  }
`;*/

export const MOVIES_QUERY = gql`
  query getAllMovies {
    getAllMovies {
      id
      title
      description
    }
  }
`;

export const SINGLE_MOVIE_QUERY = gql`
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

export const CREATE_MOVIE = gql`
  mutation createMovie($movie: MovieInputCreate!) {
    createMovie(movieInputCreate: $movie) {
      title
      description
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation deleteMovie($id: Int!) {
    deleteMovie(id: $id) {
      id
      title
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation updateMovie($movie: MovieInputEdit!) {
    updateMovie(movieInputEdit: $movie) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`;

const MOVIE_ADDED = gql`
  subscription movieAdded {
    movieAddedSubscription {
      id
      title
      createdAt
    }
  }
`;

const MOVIE_DELETED = gql`
  subscription movieDeleted {
    movieDeletedSubscription {
      id
      title
    }
  }
`;
