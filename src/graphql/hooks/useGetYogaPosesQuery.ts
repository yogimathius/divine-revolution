import { useQuery } from '@apollo/client'
import {getYogaPosesQuery} from '../queries'

const useGetYogaPosesQuery = () => {
  const { loading, error, data }  = useQuery(getYogaPosesQuery)
  return { loading, error, data } 
}

export default useGetYogaPosesQuery
