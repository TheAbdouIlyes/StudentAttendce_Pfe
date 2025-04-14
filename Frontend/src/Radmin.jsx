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
import ZButtons from './ZButtons';




import ZZ from "./ZZ"


export default function AdminLayouts({demoTheme,Skeleton }) {
  const navigate = useNavigate();


  const NAVIGATION = [
    { kind: 'header', title: 'Statistic' },
    { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
    { kind: 'divider' },
    { kind: 'header', title: 'Management' },
    { 
      segment: 'MenuStudent', title: 'Students', icon: <SchoolIcon />,
    },
    { segment: 'ListTeachers', title: 'Teachers', icon: <PeopleIcon />
    },
    { segment: 'MenuExams', title: 'Exams', icon: <AssignmentIcon /> 
    },
    { segment: 'MenuModules', title: 'Modules', icon: <ClassIcon />, 
    },
    { kind: 'divider' },

    { kind: 'header', title: 'Configuration' },
    {
      segment: 'Settings',
      title: 'Settings',
      icon: <SettingsIcon />,
    },

    { kind: 'divider' },
    { kind: 'header', title: 'Exit' },
    { 
      segment: 'LogOut', 
      title: 'Logout', 
      icon: <ExitToAppIcon />, 
    },
  ];

  

  return (
    <AppProvider 
      navigation={NAVIGATION} 
      router={{ navigate }} 
      theme={demoTheme}  
      branding={{ logo: <img src={logo} style={{ width: "30px", height: "30px", borderRadius: "50%" }} /> ,title: "Admin" }}
      // branding={{ logo: "" ,title: "Pfe" }}
      // sx={{color:"primary"}}
    >
    
      <DashboardLayout 
      // slots={{
      //     toolbarActions: ZZ 
      //   }} 
        >

        <PageContainer className='MainPage-Conatiner'>
          <Routes >
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="MenuStudent" element={<StudentMenu />} />
            <Route path="MenuStudent/:speciality/:year" element={<ListStudents />} />
            <Route path="MenuStudent/:speciality/:year/AddStudent" element={<AddStudent />} />
            <Route path="MenuStudent/:speciality/:year/edit-student/:id" element={<EditStudent />} />
            <Route path="ListTeachers/addTeacher" element={<AddTeacher/>} />
            <Route path="ListTeachers" element={<ListTeachers />} />
            <Route path="ListTeachers/editTeacher/:id" element={<EditTeacher />} />

            <Route path="ListExams" element={<ListExams />} />
            <Route path="ExamsForm" element={<ListExamsForm />} />

            <Route path="MenuModules" element={<ModulesMenu />} />
            <Route path="MenuModules/:speciality/:year/AddModules" element={<AddModule />} />


            <Route path="MenuModules/:speciality/:year" element={<ListModules />} />
            
            <Route path="MenuExams" element={<ExamsMenu />} />
            <Route path="MenuExams/:speciality/:year/:semester" element={<ListExams />} />

            {/* <Route path="MenuExams/:speciality/:year/:semester/qr-scanner" element={<QRCOde />} /> */}
            <Route path="MenuExams/:speciality/:year/:semester/:module/qr-scanner" element={<QRCOde />} />
            <Route path="MenuExams/:speciality/:year/:semester/:id/presence" element={<Presence/>} />
            <Route path="MenuExams/:speciality/:year/:semester/:exam_name/SerTeacher" element={<SerTeacher/>} /> 




            <Route
              path="*"
              element={
                <Grid container spacing={2}>
                  {[14, 100, 100, 150].map((height, index) => (
                    <Grid key={index} xs={index === 0 || index === 3 ? 12 : 6}>
                      <Skeleton height={height} />
                    </Grid>
                  ))}
                </Grid>
              }
            />
          </Routes>
        </PageContainer>
        
      </DashboardLayout>
    </AppProvider>
  );
}