import { gql } from '@apollo/client';

export const loginMutation = gql`
  mutation login($username: string, $password: string) {
    login(input: {username: $username, password: $password}) {
      expiration
      token
      user {
        username
      }
    }
  }
`