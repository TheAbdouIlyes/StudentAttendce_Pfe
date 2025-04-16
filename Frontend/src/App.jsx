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
import QRCOde from "./Pages/QR-CodeTest/QRCOde";
import The_API from "./HostingPhone";
import Presence from "./pages/Presence";
import ExamsAttendanceMenu from './TeacherPages/ExamsAttendanceMenu';
import StudentsAttendances from "./TeacherPages/StudentsAttendance";
import Surveillance from './TeacherPages/Surveillance';
import ES from './StudentPages/ES';
import StudentDashboard from './StudentPages/StudentDashboard';
import LogOut from "./TheLogOut"



import Rteacher from "./Rteacher"
import Rstudent from "./Rstudent"
import Radmin from "./Radmin"




const demoTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#0288d1' },
        secondary: { main: '#7f74fa' },
        background: {
          default: '#eff7fe',
          paper: '#ffffff',
          // tableRow: '#dbefff',       // Custom light zebra row
          // tableRowAlt: '#ffffff',    // Alternate row color
          // tableHeader: '#ffffff'     // Light header background
        },
        text: { primary: '#011723',rev:"#ffffff" },
        action:{hover:"#e3f6ff"},
        absent:"#ff0000",
        present:{dark:"#4caf50",light:"#e8f5e9"},
        border:"#e3e5e7"
      },
    },
    dark: {
      palette: {
        primary: { main: '#BBE1FA' },
        secondary: { main: '#10058a' },
        background: {
          default: '#0c1d27',
          paper: '#0c171d',
          // tableRow: '#1f2a35',       // Custom dark zebra row
          // tableRowAlt: '#17212B',    // Alternate dark row color
          // tableHeader: '#0e1621'     // Dark header background
        },
        text: { primary: '#ffffff' ,rev:"#0c171d"},
        action:{hover:"#0c1f38"},
        absent:"#ff0000",
        present:{dark:"#e8f5e9",light:"#4caf50"},
        border:"#303b42"

      },
    },
  },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: { width: 200 },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
        }),
      },
    },
    // MuiTableRow: {
    //   styleOverrides: {
    //     root: ({ theme }) => ({
    //       // '&:nth-of-type(odd)': {
    //       //   backgroundColor: theme.palette.background.tableRow,
    //       // },
    //       // '&:nth-of-type(even)': {
    //       //   backgroundColor: theme.palette.background.tableRowAlt,
    //       // },
    //       // '&:hover': {
    //       //   backgroundColor: theme.palette.action.hover,
    //       // },
    //     }),
    //   },
    // },
    // MuiTableCell: {
    //   styleOverrides: {
    //     root: ({ theme }) => ({
    //       backgroundColor: 'inherit', // inherits from row
    //       color: theme.palette.text.primary,
    //     }),
    //     head: ({ theme }) => ({
    //       backgroundColor: theme.palette.background.tableHeader,
    //       fontWeight: 'bold',
    //       color: theme.palette.text.primary,
    //     }),
    //   },
    // },
  },
});

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
}));











export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<div className="ThePage"> <UserID /> </div>} />
        <Route path="/Admin" element={<div className="ThePage"> <LogInAdmin /> </div>} />
        <Route path="/Student" element={<div className="ThePage"> <LogInStudent /> </div>} />
        <Route path="/Teacher" element={<div className="ThePage"> <LogInTeacher /> </div>} />
        <Route path="/LogOut" element={<div className="ThePage"> <LogOut /> </div>} />

        {/* Protected Routes for Admin */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/*" element={<Radmin demoTheme={demoTheme} Skeleton={Skeleton } />} />
        </Route>

        {/* Protected Routes for Students */}
        <Route element={<ProtectedRoute requiredRole="student" />}>
          <Route path="/student/*" element={<Rstudent demoTheme={demoTheme} Skeleton={Skeleton } />} />
        </Route>

         {/* Protected Routes for Teacher */}
         <Route element={<ProtectedRoute requiredRole="teacher" />}>
          <Route path="/teacher/*" element={<Rteacher demoTheme={demoTheme} Skeleton={Skeleton }/>} />
        </Route>


        {/* Redirect unknown routes to home */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  );
}



