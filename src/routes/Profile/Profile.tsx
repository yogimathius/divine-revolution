import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context';
import useGetUserQuery from '../../graphql/hooks/useGetUserQuery';
import { useLocalStorage } from '../../hooks';

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
      <div className=" border-b border-gray-300 p-6  ">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="pb-4 mb-4">
          <p className="text-lg font-semibold">
            <span className="text-blue-600">Username:</span> {user.username}
          </p>
          <p className="text-lg font-semibold">
            <span className="text-blue-600">Email:</span> {user.email}
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold">
            <span className="text-blue-600">Bio:</span> {user.bio}
          </p>
        </div>
      </div>
    </div>

  );
};

export default ProfilePage;
