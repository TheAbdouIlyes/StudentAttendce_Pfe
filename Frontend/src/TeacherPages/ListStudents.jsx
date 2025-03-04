import React, { useState } from 'react';
import "./ListStudents.css";
import ReactVirtualizedTable from './componants/ReactVirtualizedTable';
import { Button, Menu, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import QRCOde from './componants/QR-CodeTest/QRCOde';

export default function ListStudents() {
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [students, setStudents] = useState([
    { id: 1, matricule: "202212345", firstName: "Alice", lastName: "Johnson", examan: "Maths", presence: "Absent" },
    { id: 2, matricule: "202267890", firstName: "Bob", lastName: "Smith", examan: "Science", presence: "Absent" },
  ]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleFilter = (filterType) => {
    console.log(`Filtering by: ${filterType}`);
    handleClose();
  };

  // ✅ Function to update student presence when QR code is scanned
  const handleScan = (scannedMatricule) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.matricule === scannedMatricule ? { ...student, presence: "Present" } : student
      )
    );
  };

  const handleAddStudent = () => console.log("Add student button clicked");
  const handleEditStudent = () => setIsEditing(prev => !prev);
  const handleDeleteStudent = () => console.log("Delete student button clicked");

  return (
    <div className='Student-Container'>
      <div className='MainSection-Top'>
        <h1 className='StudentListTitle'>Student List</h1>

        <Button variant="contained" startIcon={<FilterListIcon />} onClick={handleClick}>
          Filter
        </Button>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => handleFilter('name')}>Filter by Name</MenuItem>
          <MenuItem onClick={() => handleFilter('id')}>Filter by ID</MenuItem>
          <MenuItem onClick={() => handleFilter('class')}>Filter by Class</MenuItem>
        </Menu>
      </div>

      <div className='MainSection-Bottom'>
        <ReactVirtualizedTable isEditing={isEditing} setStudents={setStudents} students={students} />
        {/* ✅ Pass the handleScan function to QRCOde */}
        <QRCOde onScan={handleScan} />
      </div>
    </div>
  );
}
