import { gql } from '@apollo/client';

export const loginMutation = gql`
  mutation login($username: String!, $password: String!) {
    login(input: {username: $username, password: $password}) {
      expiration
      token
      user {
        username
      }
    }
  }
`