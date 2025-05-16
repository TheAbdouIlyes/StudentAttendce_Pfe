import React from 'react';
import "./LogInAdmin.css";
import LogInForm from './LogInForm';
import ReturnButton from '../comps/ReturnButton';
import { Users } from "lucide-react";
import AdminSvg from "../assets/TheAdminSVG.svg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LogInAdmin() {
  const navigate = useNavigate();

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
            {/* Popping admin SVG */}
            <motion.img
              className='Login-SVG-Admin'
              src={AdminSvg}
              alt="Admin"
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
          Login as Admin <Users className="role-card-icon" />
        </h1>

        <LogInForm />
      </motion.div>
    </div>
  );
}
