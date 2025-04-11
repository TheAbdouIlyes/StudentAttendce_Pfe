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
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const rowsPerPage = 5;

  const fetchTeachers = async (pageNumber = 1) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Teacher_list/?page=${pageNumber}&page_size=${rowsPerPage}`);
      if (!response.ok) throw new Error("Failed to fetch teachers");
  
      const data = await response.json();
  
      if (data.results) {
        // Fetch modules for each teacher
        const teachersWithModules = await Promise.all(
          data.results.map(async (teacher) => {
            try {
              const subjectsResponse = await fetch(`http://127.0.0.1:8000/teacher_subject/${teacher.id}`);
              const assignedSubjects = await subjectsResponse.json();
              teacher.modules = Array.isArray(assignedSubjects)
                ? assignedSubjects.map((subject) => subject.name).join(", ")
                : "No modules";
            } catch (err) {
              console.error(`Failed to fetch modules for teacher ID ${teacher.id}:`, err);
              teacher.modules = "Error loading";
            }
            return teacher;
          })
        );
  
        setRows(teachersWithModules);
        setTotalCount(data.count || 0);
      } else {
        console.error("Unexpected API response format:", data);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };
  

  useEffect(() => {
    fetchTeachers(page + 1);

    
  }, [page]);


  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/teacher/delete/${id}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete teacher");
        }
        fetchTeachers(page + 1);
      })
      .catch((error) => console.error("Error deleting teacher:", error));
  };

  return (
    <div className="Teachers-Container">
      <div className="ListTeacher-Top">
        <div className="TeacherListTitle">Teacher List</div>
        <div className="Buttons-side">
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("addTeacher")}>
            Add
          </Button>
        </div>
      </div>
      <div className="ListTeacher-Main">
        <TableTeacher 
          setRows={setRows} 
          rows={rows} 
          page={page} 
          setPage={setPage} 
          totalCount={totalCount} 
          rowsPerPage={rowsPerPage} 
          handleDelete={handleDelete}
          
        />
      </div>
    </div>
  );
}
