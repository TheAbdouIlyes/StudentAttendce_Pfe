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

// Import your pages
import Dashboard from './Pages/Dashboard';
import ListStudents from './TeacherPages/ListStudents';


const NAVIGATION = [
  { kind: 'header', title: 'Stats' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Students' },
  { 
    segment: 'ListStudents', 
    title: 'L1', 
    icon: <SchoolIcon />, 

  },
  { 
    segment: 'ListStudents', 
    title: 'L2', 
    icon: <SchoolIcon />, 

  },
  { 
    segment: 'ListStudents', 
    title: 'L3', 
    icon: <SchoolIcon />, 

  },
  { 
    segment: 'ListStudents', 
    title: 'M1', 
    icon: <SchoolIcon />, 

  },
  { 
    segment: 'ListStudents', 
    title: 'M2', 
    icon: <SchoolIcon />, 

  },

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


//   components: {
//     MuiContainer: {
//       styleOverrides: {
//         root: {
//           margin: 0,
//           padding: 0,
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           margin: 0,
//           padding: 0,
//         },
//       },
//     },
//   },

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
      branding={{ logo:"", appName: "Checkly" ,title: 'Teacher' }}
      
    >
      <DashboardLayout>
        <PageContainer className='MainPage-Conatiner'>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="ListStudents" element={<ListStudents />} />

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

export default function App2() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<DashboardLayoutBasic />} />
      </Routes>
    </Router>
  );
}