import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { loginMutation } from '../../graphql/mutations/login';
import jwt from 'jsonwebtoken';

const Login= () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);

  // Function to set the token in localStorage
  const setAuthToken = (token: string) => {
    localStorage.setItem('authToken', token);
    setToken(token);
  };

  // Function to remove the token from localStorage
  const removeAuthToken = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };

  useEffect(() => {
    // Check if a token exists in localStorage on initial render
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // TODO fix bug in this function about util.inherits not being a function
  // // Check if the token has expired
  // const isTokenExpired = () => {
  //   if (!token) {
  //     return true; // Token not found, consider it expired
  //   }
  //   const decodedToken = jwt.decode(token); // You can use a JWT library to decode the token
  //   console.log(decodedToken);
    
  //   if (!decodedToken) {
  //     return false
  //   }
  //   const expirationDate = new Date(decodedToken * 1000);
  //   const currentTime = new Date();
  //   return expirationDate < currentTime;
  // };

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
