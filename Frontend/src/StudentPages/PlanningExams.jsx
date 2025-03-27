import React, { useState } from "react";
import "./PlanningExams.css";
import Navbar from "./Navbar";
import TestExams from "./Comps/TestExams";

export default function PlaningExams() {
  // Dummy exam data
  const exams = [
    { module: "Mathematics", date: "2025-04-10", time: "8:00-9:30", place: "A1" },
    { module: "Physics", date: "2025-04-12", time: "10:00-11:30", place: "B2" },
    { module: "Computer Science", date: "2025-04-15", time: "14:00-15:30", place: "C3" },
    { module: "Chemistry", date: "2025-04-11", time: "12:00-13:30", place: "D4" },
    { module: "Biology", date: "2025-04-13", time: "9:30-10:00", place: "E5" },
    { module: "History", date: "2025-04-14", time: "15:30-16:00", place: "F6" },
    { module: "English", date: "2025-04-16", time: "11:30-12:00", place: "G7" },
    { module: "French", date: "2025-04-17", time: "13:30-14:00", place: "H8" },
    { module: "Economics", date: "2025-04-18", time: "8:00-9:30", place: "I9" },

  ];
  

  const headers = ["Date", "8:00-9:30", "9:30-10:00", "10:00-11:30", "11:30-12:00", "12:00-13:30", "13:30-14:00", "14:00-15:30", "15:30-16:00"];

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
