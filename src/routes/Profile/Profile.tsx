import { useContext } from 'react';
import { AuthContext } from '../../context';
import { Edit, Show } from '../../components/Profile';
import useVisualMode from '../../hooks/useVisualMode';
import {  useUpdateUserMutation } from '../../graphql/hooks';

const SHOW = "SHOW";
const EDIT = "EDIT";
const SAVING = "SAVING";

const ProfilePage = () => {
  const { mode, transition, back } = useVisualMode(
     SHOW
  );
  const { user, setUser } = useContext(AuthContext);

  const { error: userUpdateError, updateUser } = useUpdateUserMutation()

  const handleSave = (username?: string, email?: string, bio?: string) => {
    updateUser(user.id, username, email, bio)
      .then(() => transition(SHOW))
  };

  const handleCancel = () => {
    back()
  };

  const handleEdit = () => {
    transition(EDIT)
  };
  

  return (
    <div className='h-screen mt-8 max-w-4xl w-full mx-4 sm:mx-auto '>
      {userUpdateError ? (
        <div>{userUpdateError.message}</div>
      ) : null}
      {mode === SHOW ? (
        <>
          <Show user={user} handleEdit={handleEdit} />
        </>
      ) : null }

      {mode === EDIT ? (
        <Edit user={user} handleSave={handleSave} handleCancel={handleCancel} />
      ) : null }
    </div>
  );
};

export default ProfilePage;
