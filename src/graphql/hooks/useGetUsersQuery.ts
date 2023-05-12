import { useQuery } from '@apollo/client'
import {getUsersQuery} from '../queries'

const useGetUsersQuery = () => {
  const { loading, error, data }  = useQuery(getUsersQuery)
  return { loading, error, data } 
}

export default useGetUsersQuery
