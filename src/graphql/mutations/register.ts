import { gql } from '@apollo/client';

export const registerMutation = gql`
  mutation signup($username: String!, $password: String!, $bio: String, $email: String) {
    login(input: {username: $username, password: $password, bio: $bio, email: $email}) {
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