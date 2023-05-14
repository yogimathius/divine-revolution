import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context';
import useGetUserQuery from '../../graphql/hooks/useGetUserQuery';
import { useLocalStorage } from '../../hooks';
import { Show } from '../../components/Profile';

const ProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userId] = useLocalStorage("userId")

  const { getUserData, loading, error, data }  = useGetUserQuery()

  useEffect(() => {
    if (userId) {
      getUserData(userId)
    }
  }, [getUserData, userId])

  useEffect(() => {
    if (data) {
      setUser(data.user)
    }
  }, [data, setUser, user])

  if (loading && !user) {
    return (
      <div className="bg-blue-500 text-white p-4 rounded shadow">
        Loading...
      </div>
    )
  }
  
  return (
    <div className='h-screen mt-8 max-w-4xl w-full mx-4 sm:mx-auto '>
      <Show user={user} />
    </div>
  );
};

export default ProfilePage;
