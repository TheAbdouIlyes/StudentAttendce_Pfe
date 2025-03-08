import React, { useState } from 'react'
import "./ListModules.css"
import ModelTable from './Comps/ModelTable'
import EditButtons from './Comps/EditButtons'
import { Button, Menu, MenuItem } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



export default function ListModels() {


  const [isEditing, setIsEditing] = useState(false);


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilter = (filterType) => {
    // Implement your filter logic here
    console.log(`Filtering by: ${filterType}`);
    handleClose();
  };


  


  //Add ---------\
  const handleAddStudent = () => {
    // Implement your add student logic here
    console.log("Add Model button clicked");
  };


  const handleEditStudent = () => {
    console.log("Edit Model button clicked");
    setIsEditing(prev=>!prev);
  };

  const handleDeleteStudent = () => {
    console.log("Delete Model button clicked");
  };



  return (
    <div className='Modules_container'>
      <div className='MainSection-Top'>
        <h1> Subject List</h1>

        

        {/* <EditButtons/> */}

        <Button variant="contained" startIcon={<AddIcon />}  onClick={handleAddStudent} >
          Add
        </Button>

        <Button variant="contained" startIcon={<EditIcon />} onClick={handleEditStudent}>
          Edit
        </Button>

        <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleDeleteStudent}>
          Delete
        </Button>

        <Button variant="contained" startIcon={<FilterListIcon />} onClick={handleClick}>
          Filter
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleFilter('semester')}>Filter by semester</MenuItem>
          <MenuItem onClick={() => handleFilter('speciality')}>Filter by speciality</MenuItem>
          <MenuItem onClick={() => handleFilter('level')}>Filter by level</MenuItem>
        </Menu>


      </div>

      <div className='MainSection-Bottom'>
        <ModelTable isEditing={isEditing} setIsEditing={setIsEditing} />
      </div>
    </div>
  )
}
