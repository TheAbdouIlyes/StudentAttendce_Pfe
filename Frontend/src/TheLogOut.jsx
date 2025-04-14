import React, { useEffect } from 'react';
// import CircularProgress from '@mui/material/CircularProgress';

export default function LogOut() {

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          const response = await fetch("http://127.0.0.1:8000/check-token/", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();

          if (data.expired) {
            console.log("Token expired.");
          } else {
            console.log("Token still valid, but logging out anyway.");
          }
        } catch (error) {
          console.error("Error checking token:", error);
        }
      }

      // Clear auth data
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");

      // Notify other parts of the app
      window.dispatchEvent(new Event("storage"));

      // Redirect to login or home
      window.location.href = "/";
    };

    logout();
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {/* <CircularProgress disableShrink /> */}
      Logging out...

    </div>
  );
}
