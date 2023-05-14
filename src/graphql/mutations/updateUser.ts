import { gql } from '@apollo/client';

export const updateUserMutation = gql`
  mutation updateUser($id: ID!, $username: String, $email: String, $bio: String, $online: Boolean) {
    updateUser(id: $id, updateUserInput:{ username: $username, email: $email, bio: $bio, online: $online }) {
      id
      username
      email
      online
    }
  }
`