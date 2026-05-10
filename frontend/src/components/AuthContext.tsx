import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthState: (user: User | null, status: boolean) => void;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/me", {
        credentials: "include",
      });

      if (!response.ok) {
        logoutUser();
        return;
      }

      const user: User = await response.json();
      setCurrentUser(user);
      setIsAuthenticated(true);
    } catch {
      logoutUser();
    } finally {
      setIsLoading(false);
    }
  };

  const setAuthState = (user: User | null, status: boolean) => {
    setCurrentUser(user);
    setIsAuthenticated(status);
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    navigate("/login");
    // Opcionalno: backend logout endpoint za serializer cookie
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, isLoading, setAuthState, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}