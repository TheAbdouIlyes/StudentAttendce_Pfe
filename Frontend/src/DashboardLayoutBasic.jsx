import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';

// Import your pages
import Dashboard from './Pages/Dashboard';
import ListStudents from './Pages/ListStudents';
import ListTeachers from './Pages/ListTeachers';
import ListExams from './Pages/ListExams';
import ListModules from './Pages/ListModules';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Styled Skeleton
const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

function DashboardLayoutBasic() {
  const navigate = useNavigate(); // Use react-router navigation

  return (
    <AppProvider navigation={NAVIGATION} router={{ navigate }} theme={demoTheme}>
      <DashboardLayout>
        <PageContainer>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="ListStudents" element={<ListStudents />} />
            <Route path="ListTeachers" element={<ListTeachers />} />
            <Route path="ListExams" element={<ListExams />} />
            <Route path="ListModules" element={<ListModules />} />
            <Route
              path="*"
              element={
                <Grid container spacing={1}>
                  <Grid size={12}>
                    <Skeleton height={14} />
                  </Grid>
                  <Grid size={4}>
                    <Skeleton height={100} />
                  </Grid>
                  <Grid size={8}>
                    <Skeleton height={100} />
                  </Grid>
                  <Grid size={12}>
                    <Skeleton height={150} />
                  </Grid>
                </Grid>
              }
            />
          </Routes>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

// Wrap with Router
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<DashboardLayoutBasic />} />
      </Routes>
    </Router>
  );
}
