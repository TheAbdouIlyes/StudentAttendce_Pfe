import React from 'react'
import './NavButtons.css'
import { NavLink } from 'react-router-dom'  // Import NavLink instead of Link


function NavButtons({ title, icon, navPath }) {
  return (
    
    <div className='navButton'>
      
      <NavLink 
        to={navPath} 
        className={({ isActive }) => `buttonContent ${isActive ? 'active' : ''}`}  // Add active class conditionally
      >
        <span className='icon'>
          {icon}
        </span>

        {title}
        

      </NavLink>
      
    </div>
 
  )
}

export default NavButtons
