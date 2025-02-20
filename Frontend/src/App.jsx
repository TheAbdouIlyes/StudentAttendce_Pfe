import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Left/Navbar';
import TopSide from './Top/TopSide';
import Dashboard from './Pages/Dashboard';


//pages
import ListStudents from './Pages/ListStudents';
import ListTeachers from './Pages/ListTeachers';
import ListExams from './Pages/ListExams';
import ListModules from './Pages/ListModules';

import "./App.css"
import UserID from "./LogIn/UserID";
import LogInAdmin from "./LogIn/LogInAdmin";
import LogInStudent from "./LogIn/LogInStudent";
import LogInTeacher from "./LogIn/LogInTeacher";

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
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="ListStudents" element={<ListStudents />} />
            <Route path="ListTeachers" element={<ListTeachers />} />
            <Route path="ListExams" element={<ListExams />} />
            <Route path="ListModules" element={<ListModules />} />

            {/* <Route path="Settings" element={<Settings />} /> */}
            {/* <Route path="*" element={<Error />} /> */}
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
        {/* Login Page */}
        <Route path="/" element={<div className="ThePage"> <UserID/> </div>} />

        <Route path="/Admin" element={<div className="ThePage"> <LogInAdmin/> </div>} />
        <Route path="/Student" element={<div className="ThePage"> <LogInStudent/> </div>} />
        <Route path="/Teacher" element={<div className="ThePage"> <LogInTeacher/> </div>} />
        
        {/* Main Layout with Nested Routes */}
        <Route path="/*" element={<Layout />} />

      </Routes>
    </Router>
  );
}

export default App;
