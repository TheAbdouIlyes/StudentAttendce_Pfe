import { jwtDecode } from "jwt-decode";

const API_REFRESH_URL = "http://localhost:8000/refresh/"; // Change this to your backend refresh endpoint

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    return null; // No tokens found, user is logged out
  }

  try {
    // Decode the token
    const decoded = jwtDecode(accessToken);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (!isExpired) {
      return accessToken; // Token is still valid
    }

    // Token is expired, try refreshing it
    const response = await fetch(API_REFRESH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Refresh token expired");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.access);
    return data.access;

  } catch (error) {
    console.error("Auth check failed:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null; // Redirect to login
  }
};
