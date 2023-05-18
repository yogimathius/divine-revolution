import { gql } from '@apollo/client';

export const getUserYogaPosesQuery = gql`
  query GetUserYogaPoses($id: ID!) {
    userYogaPoses(userId: $id) {
    pose {
      poseName
      posePoints
    }
  }
  }
`