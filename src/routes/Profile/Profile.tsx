import { useContext } from 'react';
import { AuthContext } from '../../context';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-4 shadow-md rounded-md">
        <p className="mb-2">
          <span className="font-semibold">Username:</span> {user.username}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Bio:</span> {user.bio}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
