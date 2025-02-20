import React from 'react'
import { NavLink } from 'react-router-dom'; // ✅ Import NavLink
export default function LogInStudent() {
  return (
    <div>
        <NavLink to={"/Dashboard"} className="Id-Div">Student</NavLink>

    </div>
  )
}
