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
        description
        likes
      }
    }
  }
`;