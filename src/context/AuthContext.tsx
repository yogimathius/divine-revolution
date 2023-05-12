import { ReactNode, createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  email: string;
  bio: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  setAuthToken: (token: string) => void;
  logout: () => void;
  user: User;
  setUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setAuthToken: (token: string) => {},
  logout: () => {},
  user: {
    username: '',
    email: '',
    bio: '',
  },
  setUser: (user: User) => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: '',
    email: '',
    bio: '',
  });

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
    <AuthContext.Provider value={{ isLoggedIn, setAuthToken, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
