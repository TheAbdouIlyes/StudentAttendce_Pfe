import React, { useState } from "react";
import "./ListStudents.css";
import StudentTable from "./StudentTable";
import { Button, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function ListStudents() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [students, setStudents] = useState([
    { id: 1, firstName: "Alice", lastName: "Johnson", email: "alice@example.com", speciality: "Informatics", yearOfStudy: "L1" },
    { id: 2, firstName: "Bob", lastName: "Smith", email: "bob@example.com", speciality: "Biology", yearOfStudy: "L2" },
    { id: 3, firstName: "Charlie", lastName: "Brown", email: "charlie@example.com", speciality: "Medicine", yearOfStudy: "L3" },
    { id: 4, firstName: "David", lastName: "Williams", email: "david@example.com", speciality: "Informatics", yearOfStudy: "M1" },
    { id: 5, firstName: "Emma", lastName: "Davis", email: "emma@example.com", speciality: "Biology", yearOfStudy: "M2" },
    { id: 5, firstName: "Emma", lastName: "Davis", email: "emma@example.com", speciality: "Biology", yearOfStudy: "M2" },
    { id: 5, firstName: "Emma", lastName: "Davis", email: "emma@example.com", speciality: "Biology", yearOfStudy: "M2" },
    { id: 5, firstName: "Emma", lastName: "Davis", email: "emma@example.com", speciality: "Biology", yearOfStudy: "M2" },
  ]);

  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [filterValue, setFilterValue] = useState(null);

  const handleFilter = (type, value) => {
    setFilterType(type);
    setFilterValue(value);
    handleClose();
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleEditStudent = () => {
    if (selectedStudentId !== null) {
      navigate(`/edit-student/${selectedStudentId}`);
    }
  };

  const handleDeleteStudent = () => {
    if (selectedStudentId !== null) {
      setStudents((prevStudents) => prevStudents.filter(student => student.id !== selectedStudentId));
      setSelectedStudentId(null);
    }
  };

  return (
    <div className="Student-Container">
      <div className="MainSection-Top">
        <h1 className="StudentListTitle">Student List</h1>
        <div className="Buttons-side">
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("AddStudent")}>
            Add
          </Button>
          <Button 
            variant="contained" 
            startIcon={<EditIcon />} 
            onClick={handleEditStudent} 
            disabled={selectedStudentId === null}
          >
            Edit
          </Button>
          <Button 
            variant="contained" 
            startIcon={<DeleteIcon />} 
            onClick={handleDeleteStudent} 
            disabled={selectedStudentId === null}
          >
            Delete
          </Button>
        </div>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => handleFilter("speciality", "Informatics")}>Informatics</MenuItem>
          <MenuItem onClick={() => handleFilter("speciality", "Biology")}>Biology</MenuItem>
          <MenuItem onClick={() => handleFilter("speciality", "Medicine")}>Medicine</MenuItem>
          <MenuItem onClick={() => handleFilter("yearOfStudy", "L1")}>Year: L1</MenuItem>
          <MenuItem onClick={() => handleFilter("yearOfStudy", "L2")}>Year: L2</MenuItem>
          <MenuItem onClick={() => handleFilter("yearOfStudy", "M1")}>Year: M1</MenuItem>
          <MenuItem onClick={() => handleFilter(null, null)}>Reset Filter</MenuItem>
        </Menu>
      </div>

      <div className="MainSection-Bottom">
        <StudentTable 
          students={students} 
          isEditing={isEditing} 
          filterType={filterType} 
          filterValue={filterValue} 
          onRowClick={setSelectedStudentId}
          selectedStudentId={selectedStudentId}
        />
      </div>
    </div>
  );
}
