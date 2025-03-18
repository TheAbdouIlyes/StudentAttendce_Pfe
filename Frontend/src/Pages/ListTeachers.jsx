import React from 'react'
import "./ListTeachers.css"
import TableTeacher from './Comps/TableTeacher'

import { Button } from '@mui/material'

import { useState,useEffect } from 'react'

import AddIcon from '@mui/icons-material/Add'

import EditIcon from '@mui/icons-material/Edit'

import DeleteIcon from '@mui/icons-material/Delete'
import FilterIcon from '@mui/icons-material/FilterList'
import { useNavigate } from "react-router-dom";

export default function ListTeachers() {
  const navigate = useNavigate();
   const [isEditing, setIsEditing] = useState(false);
  
  
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };


    
  //Add ---------\
  const handleAddTeacher = () => {
    // Implement your add student logic here
    console.log("Add teacher button clicked");
  };


  const handleEditTeacher = () => {
    console.log("Edit teacher button clicked");
    setIsEditing(prev=>!prev);
  };

  const handleDeleteTeacher = () => {
    console.log("Delete teacher button clicked");
  };

  return (
    <div className='Teachers-Container'>
      
      <div className='ListTeacher-Top'>

        <div className='TeacherListTitle'>
          Teacher List 
        </div>
        
        <div className='Buttons-side'>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("addTeacher")}>
            Add
          </Button>

          <Button variant="contained" startIcon={<EditIcon />} onClick={handleEditTeacher}>
            Edit
          </Button>

          <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleDeleteTeacher}>
            Delete
          </Button>

          
        </div>
        <Button variant="contained" startIcon={<FilterIcon />} >filter</Button>
      </div>

      <div className='ListTeacher-Main'>
        <TableTeacher/>
      </div>
    </div>
  )
}
