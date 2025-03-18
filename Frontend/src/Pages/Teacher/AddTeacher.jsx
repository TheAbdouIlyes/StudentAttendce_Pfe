import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel
} from "@mui/material";
import ReturnButton from "../../comps/ReturnButton";

export default function AddTeacher() {
//   const { speciality, level } = useParams();
  
  const [teacherData, setteacherData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    secret_number: "",
    matricul: ""
  });

  const [teachers, setteachers] = useState([]); // Store students

  // Handle input changes
  const handleChange = (event) => {
    setteacherData({ ...teacherData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!teacherData.first_name || !teacherData.last_name || !teacherData.email || !teacherData.secret_number || !teacherData.matricul) {
      alert("All fields are required!");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/teacher/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacherData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("API Error Response:", responseData);
        throw new Error(responseData?.detail || "Failed to add teacher.");
      }
    setteachers([...teachers, teacherData]); // Add student to table
    setteacherData({ first_name: "", last_name: "",email: "", secret_number: "", matricul: "" }); // Reset form
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2><ReturnButton/> Add a New Teacher</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <TextField label="First Name" name="first_name" value={teacherData.first_name} onChange={handleChange} required />
        <TextField label="Last Name" name="last_name" value={teacherData.last_name} onChange={handleChange} required />
        <TextField label="email" name="email" value={teacherData.email} onChange={handleChange} required />
      

      
        <TextField label="secret number" name="secret_number" value={teacherData.secret_number} onChange={handleChange} required />
        <TextField label="Matricule" name="matricul" value={teacherData.matricul} onChange={handleChange} required />

        <Button type="submit" variant="contained" color="primary">Add Student</Button>
      </form>

      {/* Table to display students */}
      {teachers.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>First Name</b></TableCell>
                <TableCell><b>Last Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>

                <TableCell><b>secret number</b></TableCell>
                <TableCell><b>Matricule</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher, index) => (
                <TableRow key={index}>
                  <TableCell>{teacher.first_name}</TableCell>
                  <TableCell>{teacher.last_name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.secret_number}</TableCell>
                  <TableCell>{teacher.matricul}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}