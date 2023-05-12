import { useState } from 'react';
import { TextField, Button } from '@mui/material';



const Login= () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Reset form fields
    console.log(username, password);
    
    setUsername('');
    setPassword('');
  };

  
  return (
  <div className="flex flex-col items-center justify-center space-y-4 bg-blue-100 rounded-lg mx-auto p-24 h-max">
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
