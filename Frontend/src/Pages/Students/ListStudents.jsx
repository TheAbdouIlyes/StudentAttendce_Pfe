import React, { useState } from "react";
import "./ListStudents.css";
import StudentTable from "./StudentTable";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function ListStudents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([
    { id: 1, firstName: "Alice", lastName: "Johnson", email: "alice@example.com", speciality: "Informatics", yearOfStudy: "L1" },
    { id: 2, firstName: "Bob", lastName: "Smith", email: "bob@example.com", speciality: "Biology", yearOfStudy: "L2" },
  ]);

  const [showActions, setShowActions] = useState(true); // Toggle state for Actions

  const handleDelete = (id) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
  };

  return (
    <div className="Student-Container">
      <div className="MainSection-Top">
        <h1 className="StudentListTitle">Student List</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/AddStudent")}>
            Add
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowActions((prev) => !prev)}
          >
            {showActions ? "Hide Actions" : "Show Actions"}
          </Button>
        </div>
      </div>

      <div className="MainSection-Bottom">
        <StudentTable students={students} navigate={navigate} onDelete={handleDelete} showActions={showActions} />
      </div>
    </div>
  );
}
