import { gql } from '@apollo/client';

export const getYogaPosesQuery = gql`
  query {
    yogaPoses {
      poseId
      poseName
      poseDescription
      posePoints
    }
  }
`
