import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../context/ProtectedRoute';
import StudentProfile from '../StudentPages/Espaceetudiant';
import AttendanceList from '../StudentPages/AttendanceList';
import ExamsMenu from '../Pages/Exams/ExamsMenu';
import PlanningExams from '../StudentPages/PlanningExams';

export default function Student() {
  return (
    <Routes>
      {/* Protected Routes for Students */}
      <Route element={<ProtectedRoute requiredRole="student" />}>
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/exams" element={<ExamsMenu />} />
        <Route path="/student/Attendance" element={<AttendanceList />} />
        <Route path="/student/planning" element={<PlanningExams />} />
      </Route>
    </Routes>
  );
}
