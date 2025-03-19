import React from 'react'
import "./Dashboard.css"

export default function Dashboard() {
  const token=localStorage.getItem("accessToken");
  console.log(token);
  return (
    <div className='Dashboard'>
      
    </div>
    
  )
}
