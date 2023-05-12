import useGetUsersQuery from './graphql/hooks/useGetUsersQuery'
import { Login } from './routes/Login';


function App() {
  const { loading, error, data }  = useGetUsersQuery()
  console.log('test: ', loading, error, data);
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex items-center max-w-4xl w-full mx-4 sm:mx-auto px-6 py-8 bg-white shadow-md rounded-md min-h-screen">
        <Login />
      </div>
    </div>
  )
}

export default App
