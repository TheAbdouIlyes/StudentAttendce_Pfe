import React from 'react'
import { NavLink } from 'react-router-dom'; // ✅ Import NavLink
import "./LogInAdmin.css";
import LogInteacherform from './Loginteacherform';
import ReturnButton from '../comps/ReturnButton';
import {Building2 } from "lucide-react";


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
                <div className='ReturnLog'>
                  <ReturnButton/>
                </div>
        
              
                <h1 className='LogIn-Title'>Login as Teacher <Building2 className="role-card-icon" /> </h1>
                <LogInteacherform/>
              </div>
            </div>

    
  )
}
