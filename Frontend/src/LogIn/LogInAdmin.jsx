import React from 'react';
import "./LogInAdmin.css";
import LogInForm from './LogInForm';
import ReturnButton from '../comps/ReturnButton';
import {Users } from "lucide-react";
import AdminSvg from "../assets/AdminSVG.svg"

export default function LogInAdmin() {
  return (
    <div className='Admin-Container'>
      <div className='LeftSide-LogIn'>
        <div className='LeftSide-LogIn2'>
          <div className='LeftSide-LogIn3'>
            {/* Left side content */}
            <img className='Login-SVG' src={AdminSvg} alt="Admin" />
            <h1 className='LogIn-Text'>System administration <br /> and management</h1>
          </div>
        </div>
      </div>

      <div className='RightSide-LogIn'>
        <div className='ReturnLog'>
          <ReturnButton/>
        </div>
        
        
        <h1 className='LogIn-Title'>Login as Admin<Users className="role-card-icon" /></h1>
        <LogInForm />
      </div>
    </div>
  );
}
