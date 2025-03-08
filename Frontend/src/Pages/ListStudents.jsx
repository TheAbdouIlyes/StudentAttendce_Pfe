import React, { useState ,useEffect} from 'react'
import "./ListStudents.css"
import StudentTable from './Comps/StudentTable'
import EditButtons from './Comps/EditButtons'
import { Button, Menu, MenuItem } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


import TouchAppIcon from '@mui/icons-material/TouchApp';


export default function ListStudents() {

  const initialRows = [
    { id: 1, firstName: "Alice12", lastName: "Johnson", email: "alice.johnson@example.com", speciality: "Informatics", yearOfStudy: "L1" },
    { id: 2, firstName: "Bob", lastName: "Smith", email: "bob.smith@example.com", speciality: "Biology", yearOfStudy: "L2" },
    { id: 3, firstName: "Charlie", lastName: "Brown", email: "charlie.brown@example.com", speciality: "Medicine", yearOfStudy: "L3" },
    { id: 4, firstName: "David", lastName: "Williams", email: "david.williams@example.com", speciality: "Informatics", yearOfStudy: "M1" },
    { id: 5, firstName: "Emma", lastName: "Davis", email: "emma.davis@example.com", speciality: "Biology", yearOfStudy: "M2" },
    { id: 6, firstName: "Emma", lastName: "Davis", email: "emma.davis@example.com", speciality: "Biology", yearOfStudy: "M2" },
    { id: 7, firstName: "Emma", lastName: "Davis", email: "emma.davis@example.com", speciality: "Biology", yearOfStudy: "M2" },
    { id: 8, firstName: "Emma", lastName: "Davis", email: "emma.davis@example.com", speciality: "Biology", yearOfStudy: "M2" },
    { id: 9, firstName: "Emma", lastName: "Davis", email: "emma.davis@example.com", speciality: "Biology", yearOfStudy: "M2" },
    { id: 10, firstName: "Emma", lastName: "Davis", email: "emma.davis@example.com", speciality: "Biology", yearOfStudy: "M2" },
  ];


  const [isEditing, setIsEditing] = useState(false);


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleFilter = (filterType) => {
  //   // Implement your filter logic here
  //   console.log(`Filtering by: ${filterType}`);
  //   handleClose();
  // };


  const [filterType, setFilterType] = useState(null);
  const [filterValue, setFilterValue] = useState(null);

  const handleFilter = (type, value) => {
    setFilterType(type);
    setFilterValue(value);
    handleClose();
  };

  


  //Add ---------\
  const handleAddStudent = () => {
    // Implement your add student logic here
    console.log("Add student button clicked");
  };


  const handleEditStudent = () => {
    console.log("Edit student button clicked");
    setIsEditing(prev=>!prev);
  };

  const handleDeleteStudent = () => {
    console.log("Delete student button clicked");
  };



  return (
    <div className='Student-Container'>
      <div className='MainSection-Top'>


        <h1 className='StudentListTitle'>Student List</h1>

        

        {/* <EditButtons/> */}

        <div className='Buttons-side'>
          <Button variant="contained" startIcon={<AddIcon />}  onClick={handleAddStudent} className="add-button" >
            Add
          </Button>

          <Button variant="contained" startIcon={<EditIcon />} onClick={handleEditStudent}>
            Edit
          </Button>

          <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleDeleteStudent}>
            Delete
          </Button>
        </div>

{/* 
        <Button variant="contained" startIcon={<FilterListIcon />} onClick={handleClick}>
          Filter
        </Button> */}

        {/* <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleFilter('name')}>Filter by Name</MenuItem>
          <MenuItem onClick={() => handleFilter('id')}>Filter by ID</MenuItem>
          <MenuItem onClick={() => handleFilter('class')}>Filter by Class</MenuItem>
        </Menu> */}


        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => handleFilter('speciality', 'Informatics')}>Informatics</MenuItem>
          <MenuItem onClick={() => handleFilter('speciality', 'Biology')}>Biology</MenuItem>
          <MenuItem onClick={() => handleFilter('speciality', 'Medicine')}>Medicine</MenuItem>
          <MenuItem onClick={() => handleFilter('yearOfStudy', 'L1')}>Year: L1</MenuItem>
          <MenuItem onClick={() => handleFilter('yearOfStudy', 'L2')}>Year: L2</MenuItem>
          <MenuItem onClick={() => handleFilter('yearOfStudy', 'M1')}>Year: M1</MenuItem>
          <MenuItem onClick={() => handleFilter(null, null)}>Reset Filter</MenuItem>
        </Menu>


      </div>

      <div className='MainSection-Bottom'>
        <StudentTable initialRows={initialRows} isEditing={isEditing} setIsEditing={setIsEditing} filterType={filterType} filterValue={filterValue} />
      </div>
    </div>
  )
}
