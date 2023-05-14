import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { updateUserMutation } from '../mutations';
import { Scalars } from '../../__generated__/graphql';

const useUpdateUserMutation = () => {
  const [query, { loading, error, data }] = useMutation(updateUserMutation);

  const updateUser = useCallback(
    async ( id: Scalars['ID'], username?: string, email?: string, bio?: string) => {
      try {
        const response = await query({
          variables: {
            id,
            username,
            email,
            bio,
          },
        });
        return response.data
        // Handle response if needed
      } catch (error) {
        return error
        // Handle error if needed
      }
    },
    [query]
  );

  return { loading, error, data, updateUser };
};

export default useUpdateUserMutation;
