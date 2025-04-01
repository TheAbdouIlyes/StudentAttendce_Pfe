import React, { useState, useEffect } from "react";
import "./PlanningExams.css";
import Navbar from "./Navbar";
import TestExams from "./Comps/TestExams";

export default function PlanningExams() {
  const [exams, setExams] = useState([]);
  const headers = ["Date", "8:00-9:30", "9:30-10:00", "10:00-11:30", "11:30-12:00", "12:00-13:30", "13:30-14:00", "14:00-15:30", "15:30-16:00"];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    
    fetch("http://127.0.0.1:8000/student/exam", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setExams(data);
      })
      .catch((error) => console.error("Error fetching exams:", error));
  }, []);
  
  
  return (
    <div>
      <Navbar />
      <div className="schedule-container">
        <div className="schedule-card">
          <div className="schedule-header">
            <h1>📅 Exam Schedule</h1>
          </div>

          <div className="schedule-content">
            <TestExams examData={exams} headers={headers} />
          </div>
        </div>
      </div>
    </div>
  );
}
