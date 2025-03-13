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
  const { speciality, year } = useParams();
  
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    year: year || "",
    speciality: speciality || "",
    rollNumber: "",
    matricule: ""
  });

  const [students, setStudents] = useState([]); // Store students

  // Handle input changes
  const handleChange = (event) => {
    setStudentData({ ...studentData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!studentData.firstName || !studentData.lastName || !studentData.year || !studentData.speciality || !studentData.rollNumber || !studentData.matricule) {
      alert("All fields are required!");
      return;
    }
    setStudents([...students, studentData]); // Add student to table
    setStudentData({ firstName: "", lastName: "", year: year || "", speciality: speciality || "", rollNumber: "", matricule: "" }); // Reset form
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2><ReturnButton/> Add a New Student</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <TextField label="First Name" name="firstName" value={studentData.firstName} onChange={handleChange} required />
        <TextField label="Last Name" name="lastName" value={studentData.lastName} onChange={handleChange} required />

        <FormControl>
          <InputLabel>Year</InputLabel>
          <Select name="year" value={studentData.year} label="Year" onChange={handleChange} required disabled>
            <MenuItem value="L1">L1</MenuItem>
            <MenuItem value="L2">L2</MenuItem>
            <MenuItem value="L3">L3</MenuItem>
            <MenuItem value="M1">M1</MenuItem>
            <MenuItem value="M2">M2</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Speciality" name="speciality" value={studentData.speciality} onChange={handleChange} required disabled />
        <TextField label="Roll Number" name="rollNumber" value={studentData.rollNumber} onChange={handleChange} required />
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
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>{student.speciality}</TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
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