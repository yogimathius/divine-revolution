import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { loginMutation } from '../../graphql/mutations/login';
import { useAuthHandler } from '../../hooks';

const Login= () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setAuthToken} = useAuthHandler()

  // isTokenExpired()
  const [login, {error, data}] = useMutation(loginMutation, {
    variables: {
      username,
      password
    }
  })

  const handleLogin = () => {
    // Reset form fields
    console.log(username, password);
    login()
  };
  
  useEffect(() => {
    if (data) {
      console.log(data);
      
      setAuthToken(data.login.token)
      setUsername('');
      setPassword('');
    }
  }, [data])

  return (
  <div className="flex flex-col items-center justify-center space-y-4 bg-blue-100 rounded-lg mx-auto p-24 h-max">
      {error ? <p>Oh no! {error.message}</p> : null}
      <h2 className="text-2xl font-semibold mb-2">Login</h2>
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
      <Button variant='contained' onClick={() => handleLogin()}>Login</Button>
    </div>
  );
};

export default Login;
