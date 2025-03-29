import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const getAccessToken = () => localStorage.getItem("accessToken");
const getUserRole = () => localStorage.getItem("role")?.toLowerCase();

const ProtectedRoute = ({ requiredRole }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(getUserRole());
  const [loading, setLoading] = useState(true);

  // Function to check token validity
  const checkAuth = async () => {
    const token = getAccessToken();

    if (!token) {
      logoutUser();
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/check-token/?token=${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const isValid = await response.json(); // Boolean response from the API

      if (isValid) {
        setIsAuthenticated(true);
        setUserRole(getUserRole());
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error("Error checking token:", error);
      logoutUser();
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  if (loading) return <p>Loading...</p>; // Show loading indicator

  if (!isAuthenticated) return <Navigate to="/" replace />;

  if (userRole !== requiredRole.toLowerCase()) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
