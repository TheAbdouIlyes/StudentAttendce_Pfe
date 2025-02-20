import React from 'react'
import { NavLink } from 'react-router-dom'; // ✅ Import NavLink

export default function LogInTeacher() {
  return (
    <div>
        <NavLink to={"/Dashboard"} className="Id-Div">Teacher</NavLink>

    </div>
  )
}
