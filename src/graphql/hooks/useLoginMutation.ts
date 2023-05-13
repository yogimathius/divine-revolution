import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { loginMutation } from '../mutations';

const useLoginMutation = () => {
  const [login, { loading, error, data }] = useMutation(loginMutation);

  const loginUser = useCallback(
    async (username: string, password: string) => {
      try {
        const response = await login({
          variables: {
            username,
            password,
          },
        });
        return response.data
        // Handle response if needed
      } catch (error) {
        return error
        // Handle error if needed
      }
    },
    [login]
  );

  return { loading, error, data, loginUser };
};

export default useLoginMutation;
