import { isTokenExpired } from "./authCheck";

export const checkAndRefreshToken = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || isTokenExpired(accessToken)) {
    if (refreshToken && !isTokenExpired(refreshToken)) {
      try {
        const response = await fetch("http://localhost:8000/refresh/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("accessToken", data.access);
          return data.access;
        } else {
          handleLogout();
        }
      } catch (error) {
        handleLogout();
      }
    } else {
      handleLogout();
    }
  }
  return accessToken;
};
