import { ReactNode, createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
  isLoggedIn: false,
  setAuthToken: (token: string) => {},
  logout: () => {}
});

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

  const setAuthToken = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/login');

  };

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, setAuthToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
