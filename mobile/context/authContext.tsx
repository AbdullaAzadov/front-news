import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  isAuthenticated: boolean;
} | null>(null);

export const useSession = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useSession must be used within a SessionProvider');
  return context;
};

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = () => setIsAuthenticated(true);
  const signOut = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
