import useGetUsersQuery from '../../graphql/hooks/useGetUsersQuery'

function Home() {
  const { loading, error, data }  = useGetUsersQuery()
  
  return (
    <div className="">
      Protected
    </div>
  )
}

export default Home
