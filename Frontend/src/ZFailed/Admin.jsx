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
import logo from "./Logo.png";
import "./App.css";

import Dashboard from '../Pages/Dashboard';
import ListStudents from '../Pages/Students/ListStudents';
import ListTeachers from '../Pages/Teacher/ListTeachers';
import EditStudent from '../Pages/Students/EditStudent';
import AddTeacher from "../Pages/Teacher/AddTheTeacher";
import EditTeacher from '../Pages/Teacher/EditTeacher';
import ListExams from '../Pages/Exams/ListExams';
import AddModule from '../Pages/Modules/AddModule';
import ModulesTest from '../Pages/Modules/ModulesTest2';
import ListExamsForm from '../StudentPages/ListExamsForm';
import ModulesMenu from '../Pages/Modules/ModulesMenu';
import ExamsMenu from '../Pages/Exams/ExamsMenu';
import StudentMenu from '../Pages/Students/StudentMenu';
import AddStudent from '../Pages/Students/AddStudent';
import QRCOde from "../Pages/QR-CodeTest/QRCOde";

const NAVIGATION = [
  { kind: 'header', title: 'Stats' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Lists' },
  { segment: 'MenuStudent', title: 'Students', icon: <SchoolIcon /> },
  { segment: 'ListTeachers', title: 'Teachers', icon: <PeopleIcon /> },
  { segment: 'MenuExams', title: 'Exams', icon: <AssignmentIcon /> },
  { segment: 'MenuModules', title: 'Modules', icon: <ClassIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Exit' },
  { 
    segment: './', 
    title: 'Logout', 
    icon: <ExitToAppIcon />, 
    onClick: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
      window.dispatchEvent(new Event("storage"));
      window.location.href = "/";
    }
  },
];

const demoTheme = extendTheme({
  colorSchemes: { 
    light: {
      palette: { primary: { main: '#01875f' }, text: { primary: '#000000' } }
    },
    dark: {
      palette: { 
        primary: { main: '#01875f' },
        background: { default: '#000d09', paper: '#000d09' },
        text: { primary: '#ffffff' }
      }
    }
  },
  colorSchemeSelector: 'class',
  components: { MuiDrawer: { styleOverrides: { paper: { width: 200 } } } },
});

export default function Admin() {
  const navigate = useNavigate();
  return (
    <AppProvider 
      navigation={NAVIGATION} 
      router={{ navigate }} 
      theme={demoTheme}  
      branding={{ 
        logo: <img src={logo} style={{ width: "40px", height: "50px", borderRadius: "50%" }} />, 
        title: <div className='TITLE-ALGER1'>
          <h5 className='ALger1'>FACULTY OF SCIENCE UNIVERSITY OF ALGIERS 1</h5>
          <h5 className='ALger1'>كـلـيـة الـعلوم جـامـعـة الـجـزائـر 1</h5>
        </div>
      }}
    >
      <DashboardLayout>
        <PageContainer className='MainPage-Conatiner'>
          <Routes>
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
            <Route path="MenuModules/:speciality/:year" element={<ModulesTest />} />
            <Route path="MenuExams" element={<ExamsMenu />} />
            <Route path="MenuExams/:speciality/:year/:semester" element={<ListExams />} />
            <Route path="MenuExams/:speciality/:year/:semester/:module/qr-scanner" element={<QRCOde />} />
            <Route path="*" element={<Grid container spacing={2}>
              {[14, 100, 100, 150].map((height, index) => (
                <Grid key={index} xs={index === 0 || index === 3 ? 12 : 6}>
                  <div style={{ backgroundColor: '#ddd', borderRadius: '4px', height }} />
                </Grid>
              ))}
            </Grid>} />
          </Routes>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
