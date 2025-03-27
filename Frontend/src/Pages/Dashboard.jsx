import React from 'react'
import "./Dashboard.css"

export default function Dashboard() {
async () => {
  
    const response = await fetch("http://127.0.0.1:8000/check-token/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.expired) {
      console.log("expired token")
    } 
  
}
  return (
    <div className='Dashboard'>
      <script></script>
      <button onClick={()=>{console.log("Logout button clicked");

// Remove authentication data from localStorage
localStorage.removeItem("accessToken");
localStorage.removeItem("role");

// Dispatch a custom event to notify other parts of the app
window.dispatchEvent(new Event("storage"));

// Optionally, navigate to the login page programmatically
window.location.href = "/";}}>logout</button>
    </div>
    
  )
}
