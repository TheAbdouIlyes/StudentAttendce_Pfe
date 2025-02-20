import React from 'react'
import "./LogInAdmin.css"

import { NavLink } from 'react-router-dom';

import LogInForm from './LogInForm';

export default function LogInAdmin() {
  
  return (
    <div className='Admin-Container'>
        <div className='LeftSide-LogIn'>
            <div className='LeftSide-LogIn2'>
                <div className='LeftSide-LogIn3'>

                  {/* left side */}
                </div>
            </div>
        </div>

        <div className='RightSide-LogIn'>

            <h1 className='LogIn-Title'>LogIn</h1>

            <LogInForm/>

            <NavLink to={"/Dashboard"} className="Login-Submit">Submit</NavLink>


        </div>
       
        
    </div>
  )
}
