import { useContext, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context';
import useRegisterMutation from '../../graphql/hooks/useRegisterMutation';
import useLoginMutation from '../../graphql/hooks/useLoginMutation';

const Register= () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthToken, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const { error, registerUser } = useRegisterMutation()
  const { error: loginError, loginUser } = useLoginMutation()

  const handleLogin = async () => {
    const result = await registerUser(username, password)
    console.log('success!', result);
    if (result) {
      const data = await loginUser(username, password)
      if (!loginError && data) {
        setAuthToken(data.createUser.token, data.createUser.user.id)
        setUser(data.createUser.user)
        setUsername('');
        setPassword('');
        navigate('/')
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 bg-blue-100 rounded-lg mx-auto p-24 h-max">
      {error ? <p>Oh no! {error.message}</p> : null}
      {loginError ? <p>Oh no! {loginError.message}</p> : null}
      <h2 className="text-2xl font-semibold mb-2">Register</h2>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
        variant="outlined"
        sx={{bgcolor: 'background.paper'}}
      />
      <TextField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        type="password"
        sx={{bgcolor: 'background.paper'}}
      />
      <Button variant='contained' onClick={() => handleLogin()}>Register</Button>
    </div>
  );
};

export default Register;
