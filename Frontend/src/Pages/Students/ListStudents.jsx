import React, { useState, useEffect } from "react";
import "./ListStudents.css";
import StudentTable from "./StudentTable";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate,useParams } from "react-router-dom";

export default function ListStudents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  // const [showActions, setShowActions] = useState(false);

  
  const [showActions, setShowActions] = useState(() => {
    const stored = localStorage.getItem("showActions");
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem("showActions", JSON.stringify(showActions));
  }, [showActions]);
  
  
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const rowsPerPage = 5;
  const { speciality, year} = useParams();

  
  const fetchStudents = (pageNumber = 1) => {
    fetch(`http://127.0.0.1:8000/student_par_specialitylevel/${speciality}/${year}?page=${pageNumber}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        return response.json();
      })
      .then((data) => {
        if (data.results) {
          setStudents(data.results);
          setTotalCount(data.count || 0);
        } else {
          console.error("Unexpected API response format:", data);
        }
      })
      .catch((error) => console.error("Error fetching students:", error));
  };

  useEffect(() => {
    fetchStudents(page + 1);
  }, [page]);

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/student/delete/${id}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete student");
        }
        fetchStudents(page + 1);
      })
      .catch((error) => console.error("Error deleting student:", error));
  };


  return (
    <div className="Student-Container">
      <div className="MainSection-Top">
        <h1 className="StudentListTitle">Student List</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("AddStudent")}>
            Add
          </Button>
          <Button
            variant="contained"
            startIcon={showActions ? <VisibilityOffIcon /> : <VisibilityIcon />}
            onClick={() => {
              setShowActions((prev) => {
                const newValue = !prev;
                localStorage.setItem("showActions", JSON.stringify(newValue));
                return newValue;
              });
            }}
            
          >
            {showActions ? "Hide Actions" : "Show Actions"}
          </Button>
        </div>
      </div>

      <div className="MainSection-Bottom">
        <StudentTable 
          students={students} 
          navigate={navigate} 
          onDelete={handleDelete} 
          showActions={showActions} 
          page={page} 
          setPage={setPage} 
          totalCount={totalCount} 
          rowsPerPage={rowsPerPage} 
        />
      </div>
    </div>
  );
}
