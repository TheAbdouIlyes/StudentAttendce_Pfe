import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion"; // ✅ Framer Motion
import "./LogInAdmin.css";
import LogInteacherform from './Loginteacherform';
import ReturnButton from '../comps/ReturnButton';
import { Building2 } from "lucide-react";
import TeacherSvg from "../assets/TheTeacherSVG.svg";

export default function LogInTeacher() {
  return (
    <div className='Admin-Container'>
      
      <motion.div
        className='LeftSide-LogIn'
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <motion.div className='LeftSide-LogIn2'
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div className='LeftSide-LogIn3'
          
           initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        >
           <motion.img
              className='Login-SVG'
              src={TeacherSvg}
              alt="Admin"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            />

          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div className='RightSide-LogIn'
             initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              >
        <div className='ReturnLog'>
          <ReturnButton />
        </div>

        <h1 className='LogIn-Title'>Login as Teacher <Building2 className="role-card-icon" /></h1>
        <LogInteacherform />
      </motion.div>
    </div>
  );
}
