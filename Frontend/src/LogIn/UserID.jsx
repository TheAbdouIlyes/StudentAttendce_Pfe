import React from 'react'
import "./USerID.css"
import { NavLink } from 'react-router-dom'

export default function LogIn() {
  return (
    <div className='LogIn'>

        <div className='ID-Container'>
            <NavLink to={"/Admin"} className="Id-Div">Admin</NavLink>
            <NavLink to={"/Student"} className="Id-Div">Student</NavLink>
            <NavLink to={"/Teacher"} className="Id-Div">Teacher</NavLink>

        </div>

    </div>
  )
}
