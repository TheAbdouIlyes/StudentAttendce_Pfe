import React, { useState, useEffect } from "react";
import "./ListTeachers.css";
import TableTeacher from "./TableTeacher";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

export default function ListTeachers() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/Teacher_list/") // Ensure the endpoint is correct
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch teachers");
        }
        return response.json();
      })
      .then((data) => {
        // Handle API response format
        if (Array.isArray(data)) {
          setRows(data); // If it's a list
        } else if (data.results) {
          setRows(data.results); // If wrapped in an object
        } else {
          console.error("Unexpected API response format:", data);
        }
      })
      .catch((error) => console.error("Error fetching teachers:", error));
  }, []);

  console.log("Fetched Teachers:", rows);

  return (
    <div className="Teachers-Container">
      <div className="ListTeacher-Top">
        <div className="TeacherListTitle">Teacher List</div>
        <div className="Buttons-side">
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("addTeacher")}>
            Add
          </Button>
          <Button
            variant="contained"
            startIcon={showActions ? <VisibilityOffIcon /> : <VisibilityIcon />}
            onClick={() => setShowActions((prev) => !prev)}
          >
            {showActions ? "Hide Actions" : "Show Actions"}
          </Button>
        </div>
      </div>
      <div className="ListTeacher-Main">
        <TableTeacher showActions={showActions} setRows={setRows} rows={rows} />
      </div>
    </div>
  );
}
