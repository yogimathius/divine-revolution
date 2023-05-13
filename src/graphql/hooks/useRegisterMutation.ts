import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { registerMutation } from '../mutations';

const useRegisterMutation = () => {
  const [register, { loading, error, data }] = useMutation(registerMutation);

  const registerUser = useCallback(
    async (username: string, password: string, bio?: string, email?: string) => {
      try {
        const response = await register({
          variables: {
            username,
            password,
            bio,
            email,
          },
        });
        return response.data
        // Handle response if needed
      } catch (error) {
        return error
        // Handle error if needed
      }
    },
    [register]
  );

  return { loading, error, data, registerUser };
};

export default useRegisterMutation;
