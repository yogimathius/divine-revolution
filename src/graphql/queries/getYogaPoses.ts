import { gql } from '@apollo/client';

export const getYogaPosesQuery = gql`
  query {
    yogaPoses {
      poseName
      poseDescription
      posePoints
    }
  }
`
