import { useLazyQuery } from "@apollo/client";
import { useCallback } from "react";
import { getUserQuery } from "../queries";

const useGetUserQuery = () => {
  const [getUser, { loading, error, data }] = useLazyQuery(getUserQuery);

  const getUserData = useCallback(
    (userId: number) => {
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
