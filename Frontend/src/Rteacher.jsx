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
import UserID from"./LogIn/UserID"
import LogInStudent from "./LogIn/LogInStudent"


import PersonIcon from '@mui/icons-material/Person';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


////////////////////////////////
import LogInTeacher from "./LogIn/LogInTeacher"

// import StudentProfile from './StudentPages/Espaceetudiant';
import AttendanceList from './StudentPages/AttendanceList';
// Import your pages
import Dashboard from './Pages/Dashboard';
import ListStudents from './Pages/Students/ListStudents';
import ListTeachers from './Pages/Teacher/ListTeachers';
import EditStudent from './Pages/Students/EditStudent';
import AddTeacher from "./Pages/Teacher/AddTheTeacher";
import EditTeacher from './Pages/Teacher/EditTeacher';
import ListExams from './Pages/Exams/ListExams';
//----------------------------------;
import AddModule from './Pages/Modules/AddModule';
import ProtectedRoute from './context/ProtectedRoute';
import ListModules from './Pages/Modules/ListModules';
import ListExamsForm from './StudentPages/ListExamsForm';
// import Examan1 from './Pages/Examan1';
import ModulesMenu from './Pages/Modules/ModulesMenu';
// import UserID from './LogIn/UserID';
import ExamsMenu from './Pages/Exams/ExamsMenu';
import SerTeacher from './Pages/Exams/SerTeacher';
// import ExamanForm from './Pages/Exams/ExamanForm';
import LogInAdmin from './LogIn/LogInAdmin';
import { Button, colors } from '@mui/material';
import StudentMenu from './Pages/Students/StudentMenu';
import AddStudent from './Pages/Students/AddStudent';
import PlanningExams from './StudentPages/PlanningExams';
import QRCOdetea from "./Pages/QR-CodeTest/QRCOdetea";
import The_API from "./HostingPhone";
import Presence from "./pages/Presence";
import ExamsAttendanceMenu from './TeacherPages/ExamsAttendanceMenu';
import StudentsAttendances from "./TeacherPages/StudentsAttendance";
import Surveillance from './TeacherPages/Surveillance';
import ES from './StudentPages/ES';
import StudentDashboard from './StudentPages/StudentDashboard';
import LogOut from "./TheLogOut"

import QRCode from './Pages/QR-CodeTest/QRCOde';





const NAVIGATION_Teacher = [
    { kind: 'header', title: 'Stats' },
    { segment: 'Teacher/Dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
    { kind: 'divider' },
    { kind: 'header', title: 'Lists' },
    { segment: 'Teacher/Surveillance', title: 'Surveillance', icon: <PeopleIcon />},
    { segment: 'Teacher/ExamsAttendance', title: 'ExamsAttendance', icon: <PeopleIcon />
    },
    
    { kind: 'divider' },
    { kind: 'header', title: 'Exit' },
    { 
      segment: 'LogOut', 
      title: 'Logout', 
      icon: <ExitToAppIcon />, 
    },
  ];

  
export default function TeacherLayouts({demoTheme,Skeleton }) {
    const navigate = useNavigate();
  
    return (
      <AppProvider 
        navigation={NAVIGATION_Teacher} 
        router={{ navigate }} 
        theme={demoTheme}  
        branding={{ logo: <img src={logo} style={{ width: "40px", height: "50px", borderRadius: "50%" }} /> ,title: <div className='TITLE-ALGER1'><h5 className='ALger1'>FACULTY OF SCIENCE UNIVERSITY OF ALGIERS 1</h5><br /><h5 className='ALger1'>كـلـيـة الـعلوم جـامـعـة الـجـزائـر 1</h5></div> }}
        // sx={{color:"primary"}}
      >
      
        <DashboardLayout>
  
          <PageContainer className='MainPage-Conatiner'>
            <Routes >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="ExamsAttendance" element={<ExamsAttendanceMenu />} />
  
              <Route path="ExamsAttendance/:speciality/:year/:exam" element={<StudentsAttendances/>} />


              <Route path="Surveillance" element={<Surveillance />} />
              <Route path="Surveillance/:module/qr-scanner" element={<QRCode />} />


            </Routes>
          </PageContainer>
          
        </DashboardLayout>
      </AppProvider>
    );
  }
  
  