import React from 'react'
import { NavLink } from 'react-router-dom'; // ✅ Import NavLink
import "./LogInAdmin.css";
import LogInteacherform from './Loginteacherform';
export default function LogInTeacher() {
  return (
   
         <div className='Admin-Container'>
              <div className='LeftSide-LogIn'>
                <div className='LeftSide-LogIn2'>
                  <div className='LeftSide-LogIn3'>
                    {/* Left side content */}
                  </div>
                </div>
              </div>
        
              <div className='RightSide-LogIn'>
                <h1 className='LogIn-Title'>LogIn</h1>
                <LogInteacherform/>
              </div>
            </div>

    
  )
}
