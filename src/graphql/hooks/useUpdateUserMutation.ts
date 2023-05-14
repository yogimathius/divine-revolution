import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { updateUserMutation } from '../mutations';

const useUpdateUserMutation = () => {
  const [updateUser, { loading, error, data }] = useMutation(updateUserMutation);

  const updateUserUser = useCallback(
    async ( id: number, username?: string, email?: string, bio?: string) => {
      try {
        const response = await updateUser({
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
    [updateUser]
  );

  return { loading, error, data, updateUserUser };
};

export default useUpdateUserMutation;
