
import React, { useState } from 'react'
import "./ListStudents.css"
import ReactVirtualizedTable from './ReactVirtualizedTable'
import EditButtons from './Comps/EditButtons'
import { Button, Menu, MenuItem } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



export default function ListStudents() {


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
    console.log("Add student button clicked");
  };


  const handleEditStudent = () => {
    console.log("Edit student button clicked");
  };

  const handleDeleteStudent = () => {
    console.log("Delete student button clicked");
  };



  return (
    <div className='Student-Container'>
      <div className='MainSection-Top'>
        <h1>Student List</h1>

        

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
          <MenuItem onClick={() => handleFilter('name')}>Filter by Name</MenuItem>
          <MenuItem onClick={() => handleFilter('id')}>Filter by ID</MenuItem>
          <MenuItem onClick={() => handleFilter('class')}>Filter by Class</MenuItem>
        </Menu>


      </div>

      <div className='MainSection-Bottom'>
        <ReactVirtualizedTable/>
      </div>
    </div>
  )
}
