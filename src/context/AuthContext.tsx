import { ReactNode, createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scalars } from '../__generated__/graphql';

interface User {
  id: Scalars['ID'];
  username: string;
  email: string;
  bio: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  setAuthToken: (token: string, userId: number) => void;
  logout: () => void;
  user: User | null;
  setUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setAuthToken: () => {},
  logout: () => {},
  user: {
    id: '',
    username: '',
    email: '',
    bio: '',
  },
  setUser: () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate()

  const setAuthToken = (token: string, userId: number) => {
    localStorage.setItem('authToken', token);
    setUserIdStorage(userId)
    setIsLoggedIn(true);
  };

  const setUserIdStorage = (userId: number) => {
    localStorage.setItem('userId', JSON.stringify(userId));
  }

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
