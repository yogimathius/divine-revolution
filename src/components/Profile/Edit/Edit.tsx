import { User } from "../../../__generated__/graphql";
import { useState } from "react";
import { TextField, Button } from '@mui/material';

interface Props {
  user: Partial<User>;
  handleSave: (username?: string, email?: string, bio?: string) => void;
  handleCancel: () => void;
}

const Edit = ({ user, handleSave, handleCancel }: Props) => {
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");

  return (
    <div className="border-b border-gray-300 p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="pb-4 mb-4">
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
        variant="outlined"
        sx={{bgcolor: 'background.paper'}}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="current-email"
        type="email"
        sx={{bgcolor: 'background.paper'}}
      />
      </div>
      <div>
        <TextField label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
      </div>
      <div className="flex justify-end mt-4">
        <Button onClick={() => handleSave(username, email, bio)}>Save</Button>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Edit;
