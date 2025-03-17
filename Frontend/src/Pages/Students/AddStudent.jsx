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

export default function AddStudent() {
  const { speciality, level } = useParams();
  
  const [studentData, setStudentData] = useState({
    first_name: "",
    last_name: "",
    level: level || "",
    speciality: speciality || "",
    roll_number: "",
    matricule: ""
  });

  const [students, setStudents] = useState([]); // Store students

  // Handle input changes
  const handleChange = (event) => {
    setStudentData({ ...studentData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!studentData.first_name || !studentData.last_name || !studentData.level|| !studentData.speciality || !studentData.roll_number || !studentData.matricule) {
      alert("All fields are required!");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/stud/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("API Error Response:", responseData);
        throw new Error(responseData?.detail || "Failed to add student.");
      }
    setStudents([...students, studentData]); // Add student to table
    setStudentData({ first_name: "", last_name: "", level: level|| "", speciality: speciality || "", roll_number: "", matricule: "" }); // Reset form
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2><ReturnButton/> Add a New Student</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <TextField label="First Name" name="first_name" value={studentData.first_name} onChange={handleChange} required />
        <TextField label="Last Name" name="last_name" value={studentData.last_name} onChange={handleChange} required />

        <FormControl fullWidth required>
  <InputLabel id="year-label">Year</InputLabel>
  <Select
    labelId="year-label"
    id="year-select"
    name="level"
    value={studentData.level} // Ensure consistency between name and value binding
    label="Year"
    onChange={handleChange}
  >
    <MenuItem value="L1">L1</MenuItem>
    <MenuItem value="L2">L2</MenuItem>
    <MenuItem value="L3">L3</MenuItem>
    <MenuItem value="M1">M1</MenuItem>
    <MenuItem value="M2">M2</MenuItem>
  </Select>
</FormControl>

        <FormControl>
                  <InputLabel>Speciality</InputLabel>
                  <Select name="speciality" value={studentData.speciality} onChange={handleChange} required>
                    <MenuItem value="info">Info</MenuItem>
                    <MenuItem value="physic">Physic</MenuItem>
                    <MenuItem value="gestion">Gestion</MenuItem>
                    <MenuItem value="biology">Biology</MenuItem>
                    <MenuItem value="pharmacy">Pharmacy</MenuItem>
                    <MenuItem value="medicine">Medicine</MenuItem>
                  </Select>
                </FormControl>
        <TextField label="Roll Number" name="roll_number" value={studentData.roll_number} onChange={handleChange} required />
        <TextField label="Matricule" name="matricule" value={studentData.matricule} onChange={handleChange} required />

        <Button type="submit" variant="contained" color="primary">Add Student</Button>
      </form>

      {/* Table to display students */}
      {students.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>First Name</b></TableCell>
                <TableCell><b>Last Name</b></TableCell>
                <TableCell><b>Year</b></TableCell>
                <TableCell><b>Speciality</b></TableCell>
                <TableCell><b>Roll Number</b></TableCell>
                <TableCell><b>Matricule</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.first_name}</TableCell>
                  <TableCell>{student.last_name}</TableCell>
                  <TableCell>{student.level}</TableCell>
                  <TableCell>{student.speciality}</TableCell>
                  <TableCell>{student.roll_number}</TableCell>
                  <TableCell>{student.matricule}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}