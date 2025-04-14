import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { extendTheme, styled } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from "./Logo.png";
import "./App.css";
import UserID from"../LogIn/UserID"
import LogInStudent from "../LogIn/LogInStudent"
import StudentProfile from '../StudentPages/Espaceetudiant';
import AttendanceList from '../StudentPages/AttendanceList';
// Import your pages
import Dashboard from '../Pages/Dashboard';
import ListStudents from '../Pages/Students/ListStudents';
import ListTeachers from '../Pages/Teacher/ListTeachers';
import EditStudent from '../Pages/Students/EditStudentDialog';
import AddTeacher from "../Pages/Teacher/AddTheTeacher";
import EditTeacher from '../Pages/Teacher/EditTeacher';
import ListExams from '../Pages/Exams/ListExams';

import AddModule from '../Pages/Modules/AddModule';
import ProtectedRoute from '../context/ProtectedRoute';
import ModulesTest from '../Pages/Modules/ModulesTest2';
import ListExamsForm from '../StudentPages/ListExamsForm';

import Examan1 from '../Pages/Examan1';
import ModulesMenu from '../Pages/Modules/ModulesMenu';
// import UserID from './LogIn/UserID';

import ExamsMenu from '../Pages/Exams/ExamsMenu';
// import ExamanForm from './Pages/Exams/ExamanForm';
import LogInAdmin from '../LogIn/LogInAdmin';
import { colors } from '@mui/material';

import StudentMenu from '../Pages/Students/StudentMenu';
import AddStudent from '../Pages/Students/AddStudent';

import PlanningExams from '../StudentPages/PlanningExams';

import QRCOde from "../Pages/QR-CodeTest/QRCOde";

import The_API from "../HostingPhone";


export default function App() {
  return (
   <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<div className="ThePage"> <UserID /> </div>} />
        <Route path="/Admin" element={<div className="ThePage"> <LogInAdmin /> </div>} />
        <Route path="/Student" element={<div className="ThePage"> <LogInStudent /> </div>} />

        {/* Protected Routes for Admin */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/*" element={<Admin />} />
        </Route>

        {/* Protected Routes for Students */}
        <Route element={<ProtectedRoute requiredRole="student" />}>
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/exams" element={<ExamsMenu />} />
          <Route path="/student/Attendance" element={<AttendanceList />} />
          <Route path="/student/planning" element={<PlanningExams/>} />
        </Route>

        {/* Redirect unknown routes to home */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  );
}
