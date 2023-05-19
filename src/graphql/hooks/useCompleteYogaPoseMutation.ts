import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { completeYogaPoseMutation } from '../mutations';
import { Scalars } from '../../__generated__/graphql';

const useCompleteYogaPoseMutation = () => {
  const [execute, { loading, error, data }] = useMutation(completeYogaPoseMutation);

  const completeYogaPose = useCallback(
    async ( userId: Scalars['ID'], poseId: string, completionDate: string) => {
      try {
        const response = await execute({
          variables: {
            createUserYogaPoseInput: {
              userId,
              poseId,
              completionDate
            }
          },
        });
        return response.data
        // Handle response if needed
      } catch (error) {
        return error
        // Handle error if needed
      }
    },
    [execute]
  );

  return { loading, error, data, completeYogaPose };
};

export default useCompleteYogaPoseMutation;
