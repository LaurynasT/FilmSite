import { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import { getUserData } from "../services/userService";
import { User } from "../interfaces/user/User";

interface AuthProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);


export function AuthProvider({ children }: AuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  async function checkAuthStatus() {
    try {
      const userData = await getUserData(); 
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
}

  useEffect(() => {
    checkAuthStatus();
  }, []);


  async function login() {
   const userData = await getUserData();
   if(userData) {
    setUser(userData);
    setIsAuthenticated(true)
   }
  }


  function logout() {
    setUser(null);
    setIsAuthenticated(false);
  }


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        checkAuthStatus,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}