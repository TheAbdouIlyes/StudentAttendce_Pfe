import React from 'react'
import { NavLink } from 'react-router-dom'; // ✅ Import NavLink
import "./LogInAdmin.css";
import LogInstudentform from './LoginStudentfrom';
import ReturnButton from '../comps/ReturnButton';
import { BookOpen} from "lucide-react";
import StudentSvg from "../assets/TheStudentSVG.svg"


export default function LogInStudent() {
  return (
   
         <div className='Admin-Container'>
              <div className='LeftSide-LogIn'>
                <div className='LeftSide-LogIn2'>
                  <div className='LeftSide-LogIn3'>
                    {/* Left side content */}
                    <img className='Login-SVG' src={StudentSvg} alt="Teacher" />
                    
                  </div>
                </div>
              </div>
        
              <div className='RightSide-LogIn'>
                <div className='ReturnLog'>
                  <ReturnButton/>
                </div>
                

                <h1 className='LogIn-Title'>Login as Student <BookOpen className="role-card-icon" /></h1>
                <LogInstudentform/>
              </div>
            </div>

    
  )
}

