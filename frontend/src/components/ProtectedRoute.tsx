import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

type AuthState = "loading" | "authenticated" | "unauthorized";

const API_BASE_URL = "";

export default function ProtectedRoute() {
  const [authState, setAuthState] = useState<AuthState>("loading");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/me`, {
          credentials: "include",
        });

        if (!response.ok) {
          
          setAuthState("unauthorized");
          return;
        }

        setAuthState("authenticated");
      } catch (error) {
        console.error("PROTECTED ROUTE AUTH ERROR:", error);
        setAuthState("unauthorized");
      }
    };

    checkAuth();
  }, []);

  if (authState === "loading") {
    return <div>Provjera prijave...</div>;
  }

  if (authState === "unauthorized") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}