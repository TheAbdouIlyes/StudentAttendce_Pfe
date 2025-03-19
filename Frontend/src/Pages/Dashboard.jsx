import React from 'react'
import "./Dashboard.css"

export default function Dashboard() {
  
  return (
    <div className='Dashboard'>
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
