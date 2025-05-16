import React, { useState, useEffect } from "react";
import "./listStudents.css";
import PresenceTable from "./PresenceTable";
import { useParams } from "react-router-dom";
import ReturnButton from "../comps/ReturnButton";

export default function Presence() {
  const { id } = useParams(); // Exam ID from URL
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const rowsPerPage = 5;

  const fetchStudents = (pageNumber) => {
    fetch(`http://127.0.0.1:8000/student/exams/${id}?page=${pageNumber}`)
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
    fetchStudents(page);
  }, [page, id]); // ✅ Refetch when page or exam_id changes

  return (
    <div className="Student-Container">
      {/* <div style={{display:'flex',width:"100%",marginBottom:"2%"}}>
        <ReturnButton/>
        <h1 className="StudentListTitle">Student List</h1>


      </div> */}

      <div className="MainSection-Bottom">
        <PresenceTable 
          students={students} 
          page={page} 
          setPage={setPage} 
          totalCount={totalCount} 
          rowsPerPage={rowsPerPage} 
          examId={id}
        />
      </div>
    </div>
  );
}
