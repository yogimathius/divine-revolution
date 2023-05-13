import { gql } from '@apollo/client';

export const getUserQuery = gql`
  query GetUserByID($id: ID!) {
    user(id: $id) {
      id
      username
      email
      bio
    }
  }
`