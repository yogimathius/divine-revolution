import useGetUsersQuery from '../../graphql/hooks/useGetUsersQuery'

function Home() {
  const { loading, error, data }  = useGetUsersQuery()
  console.log('test: ', loading, error, data);
  
  return (
    <div className="">
      Protected
    </div>
  )
}

export default Home
