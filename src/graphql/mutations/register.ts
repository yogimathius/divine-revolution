import { gql } from '@apollo/client';

export const registerMutation = gql`
  mutation signUp($username: String!, $password: String!) {
    register(input: {username: $username, password: $password}) {
      expiration
      token
      user {
        id
        username
        email
        bio
      }
    }
  }
`