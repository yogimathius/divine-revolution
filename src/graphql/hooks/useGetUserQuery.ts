import { useLazyQuery } from "@apollo/client";
import { useCallback } from "react";
import { getUserQuery } from "../queries";
import { Scalars } from "../../__generated__/graphql";

const useGetUserQuery = () => {
  const [getUser, { loading, error, data }] = useLazyQuery(getUserQuery);

  const getUserData = useCallback(
    (userId: Scalars['ID']) => {
      getUser({
        variables: {
          id: userId,
        },
      });
    },
    [getUser]
  );

  return { loading, error, data, getUserData };
};

export default useGetUserQuery;
