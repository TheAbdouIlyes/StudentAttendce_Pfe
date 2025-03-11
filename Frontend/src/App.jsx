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
import logo from "./toothless.jpg";
import "./App.css";
import UserID from"./LogIn/UserID"


// Import your pages
import Dashboard from './Pages/Dashboard';
import ListStudents from './Pages/ListStudents';
import ListTeachers from './Pages/ListTeachers';
import ListExams from './Pages/ListExams';
import ListModules from './Pages/Modules/ListModules';

import AddModule from './Pages/Modules/AddModule';

import ModulesTest from './Pages/Modules/ModulesTest2';
import ListExamsForm from './Pages/ListExamsForm';

import Examan1 from './Pages/Examan1';


const NAVIGATION = [
  { kind: 'header', title: 'Stats' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Lists' },
  { 
    segment: 'ListStudents', title: 'Students', icon: <SchoolIcon />,
  },
  { segment: 'ListTeachers', title: 'Teachers', icon: <PeopleIcon />
  },
  { segment: 'ListExams', title: 'Exams', icon: <AssignmentIcon /> 
  },
  { segment: 'Examan1', title: 'Exams12', icon: <AssignmentIcon /> 
  },
  { segment: 'ExamsForm', title: 'ExamsForm', icon: <AssignmentIcon /> 
  },
  // { segment: 'ListModules', title: 'Modules', icon: <ClassIcon /> ,
    // children: [
    //   { segment: '', title: 'L1', icon: <DescriptionIcon /> },
    //   { segment: '', title: 'L2', icon: <DescriptionIcon /> },
    //   { segment: '', title: 'L3', icon: <DescriptionIcon /> },
    //   { segment: '', title: 'M1', icon: <DescriptionIcon /> },
    //   { segment: '', title: 'M2', icon: <DescriptionIcon /> },
    // ],

  // },

  { segment: 'ModulesTest', title: 'ModulesTest', icon: <ClassIcon />, 

    // children: [
    //   {segment: 'AddModules', title: 'AddModules', icon: <ClassIcon />},
  
    // ],
  },
  // { segment: 'AddModules', title: 'AddModules', icon: <ClassIcon /> 
  // },

  { kind: 'divider' },
  { kind: 'header', title: 'Settings' },
  { segment: 'Settings', title: 'Settings', icon: <SettingsIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Exit' },

  { 
    segment: 'logout', 
    title: 'Logout', 
    icon: <ExitToAppIcon />, 
    // onClick: () => {
    //   localStorage.removeItem('authToken'); // Clear authentication
    //   window.location.href = '/login'; // Redirect to login page
    // },
  },
];

const demoTheme = extendTheme({
  // colorSchemes: { light: true, dark: true },
  colorSchemes: { 
    light: {
      palette: {
        primary: { main: '#01875f' }, // Light mode primary color (Green)
        // background: { default: '#f5f5f5', 
        //   // paper: '#f5f5f5' 
        // },
        text: { primary: '#000000' }
      }
    },
    dark: {
      palette: {
        primary: { main: '#01875f' }, // Dark Green
        background: { default: '#000d09', paper: '#000d09' }, // Dark Green Background
        text: { primary: '#ffffff' }
      }
    }
  },
  colorSchemeSelector: 'class',
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: { width: 200 },
      },
    },
  },

});

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
}));


function DashboardLayoutBasic() {
  const navigate = useNavigate();

  return (
    <AppProvider 
      navigation={NAVIGATION} 
      router={{ navigate }} 
      theme={demoTheme}  
      branding={{ logo: <img src={logo} alt="App Logo" style={{ width: "50px", height: "50px", borderRadius: "0.75rem" }} />, appName: "Checkly" ,title: 'Admin' }}
      
    >
    
      <DashboardLayout>

        <PageContainer className='MainPage-Conatiner'>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="ListStudents" element={<ListStudents />} />
            <Route path="ListTeachers" element={<ListTeachers />} />
            <Route path="ListExams" element={<ListExams />} />
            <Route path="ExamsForm" element={<ListExamsForm />} />
            <Route path="ListModules" element={<ListModules />} />
            <Route path="ModulesTest/AddModules" element={<AddModule />} />
            <Route path="ModulesTest" element={<ModulesTest />} />
            <Route path="Examan1" element={<Examan1 />} />
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

export default function App() {
  return (
    <Router>
      
      
      <Routes>
       <Route path="/" element={<div className="ThePage"> <UserID/> </div>} />
      
              {/* <Route path="/Admin" element={<div className="ThePage"> <LogInAdmin/> </div>} />
              <Route path="/Student" element={<div className="ThePage"> <LogInStudent/> </div>} />
              <Route path="/Teacher" element={<div className="ThePage"> <LogInTeacher/> </div>} /> */}
        <Route path="/*" element={<DashboardLayoutBasic />} />
        
        
        
      </Routes>
    </Router>
  );
}