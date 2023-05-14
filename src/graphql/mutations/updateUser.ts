import { gql } from '@apollo/client';

export const updateUserMutation = gql`
  mutation updateUser($id: Number!, $username: String, $email: String, $bio: String, $online: String) {
    updateUser(id: , updateUserInput:{ username: $username, email: $email, bio: $bio, online: $online }) {
      id
      username
      email
      online
    }
  }
`