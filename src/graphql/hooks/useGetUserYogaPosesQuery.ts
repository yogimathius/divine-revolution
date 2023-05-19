import { useLazyQuery } from '@apollo/client'
import {getUserYogaPosesQuery} from '../queries'
import { useCallback } from 'react';
import { UserYogaPose } from '../../context/ExperienceContext';
import { Scalars } from '../../__generated__/graphql';

interface GetUserYogaPoseVariable {
  id: Scalars['ID'];
}

interface GetUserYogaPoses {
  userYogaPoses: UserYogaPose[]
}

const useGetUserYogaPosesQuery = () => {
  const [getUserYogaPose, { loading, error, data, refetch }] = useLazyQuery<GetUserYogaPoses, GetUserYogaPoseVariable>(getUserYogaPosesQuery);

  const getUserYogaPoseData = useCallback(
    (userId: Scalars['ID']) => {
      getUserYogaPose({
        variables: {
          id: userId,
        },
      });
    },
    [getUserYogaPose]
  );

  return { loading, error, data, refetch, getUserYogaPoseData };
}

export default useGetUserYogaPosesQuery
