import React from 'react'
import './Navbar.css'

export default function Navbar() {
  return (
    <div className='Navbar-container'>
        <div className='NavbarButtons'>
          <button>Dashbard</button>
          <button>List etudiants</button>
          <button>List Profs</button>
          <button>List exams</button>
          <button>List modules</button>
        </div>

        <div className='LogOut'>
          <button>Log out - </button>
        </div>
    </div>
  )
}
