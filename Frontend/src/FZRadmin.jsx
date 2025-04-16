import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import ExitIcon from '@rsuite/icons/legacy/SignOut';
import SchoolIcon from '@rsuite/icons/legacy/Book';
import AssignmentIcon from '@rsuite/icons/legacy/Edit';
import CubeIcon from '@rsuite/icons/legacy/Cube';
import logo from './Logo.png';
import './App.css';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Dashboard from './Pages/Dashboard';
import StudentMenu from './Pages/Students/StudentMenu';
import ListStudents from './Pages/Students/ListStudents';
import AddStudent from './Pages/Students/AddStudent';
import EditStudent from './Pages/Students/EditStudent';
import ListTeachers from './Pages/Teacher/ListTeachers';
import AddTeacher from './Pages/Teacher/AddTheTeacher';
import EditTeacher from './Pages/Teacher/EditTeacher';
import ListExams from './Pages/Exams/ListExams';
import ListExamsForm from './StudentPages/ListExamsForm';
import ModulesMenu from './Pages/Modules/ModulesMenu';
import AddModule from './Pages/Modules/AddModule';
import ListModules from './Pages/Modules/ListModules';
import ExamsMenu from './Pages/Exams/ExamsMenu';
import QRCOde from "./Pages/QR-CodeTest/QRCOde";
import Presence from "./pages/Presence";
import SerTeacher from './Pages/Exams/SerTeacher';
import LogOut from "./TheLogOut";

export default function AdminLayouts({ demoTheme }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState('dashboard');
  const [mode, setMode] = useState('light'); // Initial mode is light

  // Toggle between dark and light mode
  const handleModeToggle = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    // Update the theme whenever mode changes
    const root = window.document.documentElement;
    root.classList.remove(mode === 'light' ? 'dark' : 'light');
    root.classList.add(mode);
  }, [mode]);

  const handleNavSelect = (eventKey) => {
    setActiveKey(eventKey);
    navigate(`/${eventKey}`);
  };

  return (
    <ThemeProvider theme={demoTheme}>
      <CssBaseline />
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ width: expanded ? 240 : 56 }}>
          <Toggle
            style={{ margin: 10 }}
            onChange={setExpanded}
            checked={expanded}
            checkedChildren="Expand"
            unCheckedChildren="Collapse"
          />
          <Sidenav expanded={expanded} activeKey={activeKey} onSelect={handleNavSelect} appearance="subtle">
            <Sidenav.Header>
              <div style={{ display: 'flex', alignItems: 'center', padding: 16 }}>
                <img src={logo} alt="Logo" style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }} />
                {expanded && <span style={{ fontWeight: 'bold' }}>Admin</span>}
              </div>
            </Sidenav.Header>
            <Sidenav.Body>
              <Nav>
                <Nav.Item eventKey="dashboard" icon={<DashboardIcon />}>Dashboard</Nav.Item>
                <Nav.Item eventKey="MenuStudent" icon={<SchoolIcon />}>Students</Nav.Item>
                <Nav.Item eventKey="ListTeachers" icon={<GroupIcon />}>Teachers</Nav.Item>
                <Nav.Item eventKey="MenuExams" icon={<AssignmentIcon />}>Exams</Nav.Item>
                <Nav.Item eventKey="MenuModules" icon={<CubeIcon />}>Modules</Nav.Item>
                <Nav.Item eventKey="Settings" icon={<GearCircleIcon />}>Settings</Nav.Item>
                <Nav.Item eventKey="LogOut" icon={<ExitIcon />}>Logout</Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </div>

        <div style={{ flex: 1, overflow: 'auto' }}>
          <PageContainer className='MainPage-Conatiner'>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="MenuStudent" element={<StudentMenu />} />
              <Route path="MenuStudent/:speciality/:year" element={<ListStudents />} />
              <Route path="MenuStudent/:speciality/:year/AddStudent" element={<AddStudent />} />
              <Route path="MenuStudent/:speciality/:year/edit-student/:id" element={<EditStudent />} />

              <Route path="ListTeachers/addTeacher" element={<AddTeacher />} />
              <Route path="ListTeachers" element={<ListTeachers />} />
              <Route path="ListTeachers/editTeacher/:id" element={<EditTeacher />} />

              <Route path="ListExams" element={<ListExams />} />
              <Route path="ExamsForm" element={<ListExamsForm />} />

              <Route path="MenuModules" element={<ModulesMenu />} />
              <Route path="MenuModules/:speciality/:year/AddModules" element={<AddModule />} />
              <Route path="MenuModules/:speciality/:year" element={<ListModules />} />

              <Route path="MenuExams" element={<ExamsMenu />} />
              <Route path="MenuExams/:speciality/:year/:semester" element={<ListExams />} />
              <Route path="MenuExams/:speciality/:year/:semester/:module/qr-scanner" element={<QRCOde />} />
              <Route path="MenuExams/:speciality/:year/:semester/:id/presence" element={<Presence />} />
              <Route path="MenuExams/:speciality/:year/:semester/:exam_name/SerTeacher" element={<SerTeacher />} />

              <Route path="LogOut" element={<LogOut />} />

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
        </div>

        {/* Toggle button for dark/light mode */}
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <Toggle
            style={{ margin: 10 }}
            onChange={handleModeToggle}
            checked={mode === 'dark'}
            checkedChildren="Dark Mode"
            unCheckedChildren="Light Mode"
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
