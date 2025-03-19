import React, { useState, useEffect } from "react";
import "./ListStudents.css";
import StudentTable from "./StudentTable";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function ListStudents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [showActions, setShowActions] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/student_list/") // Adjust the URL if necessary
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        return response.json();
      })
      .then((data) => setStudents(data.results))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  const handleDelete = (id) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
  };


  console.log (students);
  return (
    <div className="Student-Container">
      <div className="MainSection-Top">
        <h1 className="StudentListTitle">Student List</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("AddStudent")}>
            Add
          </Button>
        </div>
      </div>

      <div className="MainSection-Bottom">
        <StudentTable students={students} navigate={navigate} onDelete={handleDelete} showActions={showActions} />
      </div>
    </div>
  );
}
