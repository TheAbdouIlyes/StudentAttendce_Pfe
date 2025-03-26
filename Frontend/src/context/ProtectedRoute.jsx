import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

// Helper functions to retrieve auth data
const getAccessToken = () => localStorage.getItem("accessToken");
const getUserRole = () => localStorage.getItem("role")?.toLowerCase();

const ProtectedRoute = ({ requiredRole }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAccessToken());
  const [userRole, setUserRole] = useState(getUserRole());

  // Function to check authentication and role
  const checkAuth = () => {
    setIsAuthenticated(!!getAccessToken());
    setUserRole(getUserRole());
  };

  // Listen for storage changes across tabs
  useEffect(() => {
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Re-check authentication on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Redirect if NOT authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Redirect if role is incorrect
  if (userRole !== requiredRole.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;