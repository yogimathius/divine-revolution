import { gql } from '@apollo/client'

export const completeYogaPoseMutation = gql`
mutation completeYogaPose($createUserYogaPoseInput: CreateUserYogaPoseInput!) {
  createUserYogaPose(createUserYogaPoseInput: $createUserYogaPoseInput) {
    user {
      # Include the fields you want to retrieve from the 'user' object
      id
      username
      # Add more fields as needed
    }
    pose {
      # Include the fields you want to retrieve from the 'pose' object
      poseId
      poseName
      posePoints
      # Add more fields as needed
    }
    completion_date
  }
}

`