import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAccessToken } from "./authCheck"; 

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getAccessToken();
      setIsAuthenticated(!!token);
      setCheckingAuth(false);
    };
    
    checkAuth();
  }, []);

  if (checkingAuth) return <div>Loading...</div>; // Show loading while checking authentication

  return isAuthenticated ? children : <Navigate to="/admin" />;
};

export default ProtectedRoute;
