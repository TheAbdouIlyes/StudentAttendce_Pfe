import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Navbar() {
    const navigate = useNavigate();
  return (
    <AppBar 
      position="fixed" 
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Student Dashboard
        </Typography>
        <Button color="inherit" onClick={() => navigate("/student/profile")}>Profile</Button>
        <Button color="inherit" onClick={() => navigate("/student/profile")}>Exam Planning</Button>
        <Button color="inherit" onClick={() => navigate("/student/Attendance")}>Attendance</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
