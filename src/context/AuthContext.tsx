import { createContext, ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
};

type IAuthContext = {
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
};

const initialValue = {
  isAuthenticated: false,
  setAuthenticated: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setAuthenticated] = useState(initialValue.isAuthenticated);

  const handleSetAuthenticated = (isAuthenticated: boolean) => {
    setAuthenticated(isAuthenticated);
    // navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated: handleSetAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
