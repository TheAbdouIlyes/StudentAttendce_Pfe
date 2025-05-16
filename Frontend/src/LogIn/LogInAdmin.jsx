import React from 'react';
import "./LogInAdmin.css";
import LogInForm from './LogInForm';
import ReturnButton from '../comps/ReturnButton';
import {Users } from "lucide-react";
import AdminSvg from "../assets/TheAdminSVG.svg"
import { Button } from '@mui/material';
// import useTheme from '@mui/material';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";


export default function LogInAdmin() {
  // const theme =useTheme();

    const navigate = useNavigate();
  
  return (
    <div className='Admin-Container'>
      <div className='LeftSide-LogIn'>
        <div className='LeftSide-LogIn2'>
          <div className='LeftSide-LogIn3'>
            {/* Left side content */}
            <img className='Login-SVG' src={AdminSvg} alt="Admin" />
          </div>
        </div>
      </div>

      <div className='RightSide-LogIn'>
        <div className='ReturnLog'>
          <ReturnButton/>
          {/* <Button startIcon={<ExitToAppIcon />} sx={{mt:5,ml:1,height:40}} color="info" variant='contained' onClick={() => navigate(-1)}>Change Role</Button> */}

        </div>
        
        
        
        <h1 className='LogIn-Title'>Login as Admin<Users className="role-card-icon" /></h1>
        <LogInForm />
      </div>
    </div>
  );
}
