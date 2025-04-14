import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Left/Navbar';
import TopSide from './Top/TopSide';
import Dashboard from '../Pages/Dashboard';
import ProtectedRoute from "../context/ProtectedRoute";

// Pages
import ListStudents from './Pages/ListStudents';
import ListTeachers from './Pages/ListTeachers';
import ListExams from './Pages/ListExams';
import ListModules from '../Pages/Modules/ListModules';

import "./App.css";
import UserID from "../LogIn/UserID";
import LogInAdmin from "../LogIn/LogInAdmin";
import LogInStudent from "../LogIn/LogInStudent";
import LogInTeacher from "../LogIn/LogInTeacher";

function Layout() {
  return (
    <div className="ThePage">
      <div className="TopSection">
        <TopSide />
      </div>
    
      <div className="BottomSection">
        <div className='NavSection'>
          <Navbar />
        </div>
        <div className="MainSection">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="liststudents" element={<ListStudents />} />
            <Route path="listteachers" element={<ListTeachers />} />
            <Route path="listexams" element={<ListExams />} />
            <Route path="listmodules" element={<ListModules />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<UserID />} />
        <Route path="/admin" element={<LogInAdmin />} />
        <Route path="/student" element={<LogInStudent />} />
        <Route path="/teacher" element={<LogInTeacher />} />

        {/* Protected Routes - Wrap Entire Layout */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
