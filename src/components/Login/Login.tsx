import React, { useState } from 'react';
import { TextField, Button,  AlphaCard, Text } from '@shopify/polaris';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
    // Reset form fields
    setUsername('');
    setPassword('');
  };

  return (
  <div className="flex flex-col items-center justify-center space-y-4 bg-blue-100 rounded-lg mx-auto p-24 h-max">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <TextField
        label="Username"
        value={username}
        onChange={setUsername}
        autoComplete="username"
      />
      <TextField
        label="Password"
        value={password}
        onChange={setPassword}
        autoComplete="current-password"
        type="password"
      />
      <Button submit>Login</Button>
    </div>
  );
};

export default Login;
