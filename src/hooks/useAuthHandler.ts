import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import jwt from 'jsonwebtoken';

const useAuthHandler = () => {
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate()
  // Function to set the token in localStorage
  const setAuthToken = (token: string) => {
    localStorage.setItem('authToken', token);
    setToken(token);
  };

  // Function to remove the token from localStorage
  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    navigate('/login')
  };

  const isAuthenticated = !!token

  useEffect(() => {
    // Check if a token exists in localStorage on initial render
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  
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
  return {
    token,
    setToken,
    setAuthToken,
    logout,
    isAuthenticated
  }
}

export default useAuthHandler
