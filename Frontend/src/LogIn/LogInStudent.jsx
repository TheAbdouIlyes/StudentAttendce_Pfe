import React from 'react';
import { NavLink } from 'react-router-dom'; // ✅ Import NavLink
import "./LogInAdmin.css";
import LogInstudentform from './LoginStudentfrom';
import ReturnButton from '../comps/ReturnButton';
import { BookOpen } from "lucide-react";
import StudentSvg from "../assets/TheStudentSVG.svg";
import { motion } from "framer-motion"; // ✅ Add Framer Motion

export default function LogInStudent() {
  return (
    <div className='Admin-Container'>

      {/* Left side with slide-in animation */}
      <motion.div
        className='LeftSide-LogIn'
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <motion.div
          className='LeftSide-LogIn2'
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className='LeftSide-LogIn3'
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {/* Popping SVG */}
            <motion.img
              className='Login-SVG'
              src={StudentSvg}
              alt="Student"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right side with scale pop-in */}
      <motion.div
        className='RightSide-LogIn'
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className='ReturnLog'>
          <ReturnButton />
        </div>

        <h1 className='LogIn-Title'>
          Login as Student <BookOpen className="role-card-icon" />
        </h1>

        <LogInstudentform />
      </motion.div>
    </div>
  );
}
