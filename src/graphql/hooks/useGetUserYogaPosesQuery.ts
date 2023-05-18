import { useLazyQuery } from '@apollo/client'
import {getUserYogaPosesQuery} from '../queries'
import { useCallback } from 'react';

const useGetUserYogaPosesQuery = () => {
  const [getUserYogaPose, { loading, error, data }] = useLazyQuery(getUserYogaPosesQuery);

  const getUserYogaPoseData = useCallback(
    (userId: number) => {
      getUserYogaPose({
        variables: {
          id: userId,
        },
      });
    },
    [getUserYogaPose]
  );

  return { loading, error, data, getUserYogaPoseData };
}

export default useGetUserYogaPosesQuery
