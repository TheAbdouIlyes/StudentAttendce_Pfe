import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel
} from "@mui/material";
import ReturnButton from "../../comps/ReturnButton";

export default function EditStudent({ students, setStudents }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const studentId = parseInt(id, 10);

  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    year: "",
    speciality: "",
    rollNumber: "",
    matricule: ""
  });

  useEffect(() => {
    const studentToEdit = students.find((s) => s.id === studentId);
    if (studentToEdit) {
      setStudentData(studentToEdit);
    }
  }, [studentId, students]);

  const handleChange = (event) => {
    setStudentData({ ...studentData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!studentData.firstName || !studentData.lastName || !studentData.year || !studentData.speciality || !studentData.rollNumber || !studentData.matricule) {
      alert("All fields are required!");
      return;
    }
    setStudents(students.map((s) => (s.id === studentId ? studentData : s)));
    navigate(-1);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2><ReturnButton /> Edit Student</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <TextField label="First Name" name="firstName" value={studentData.firstName} onChange={handleChange} required />
        <TextField label="Last Name" name="lastName" value={studentData.lastName} onChange={handleChange} required />

        <FormControl>
          <InputLabel>Year</InputLabel>
          <Select name="year" value={studentData.year} label="Year" onChange={handleChange} required>
            <MenuItem value="L1">L1</MenuItem>
            <MenuItem value="L2">L2</MenuItem>
            <MenuItem value="L3">L3</MenuItem>
            <MenuItem value="M1">M1</MenuItem>
            <MenuItem value="M2">M2</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Speciality" name="speciality" value={studentData.speciality} onChange={handleChange} required />
        <TextField label="Roll Number" name="rollNumber" value={studentData.rollNumber} onChange={handleChange} required />
        <TextField label="Matricule" name="matricule" value={studentData.matricule} onChange={handleChange} required />

        <Button type="submit" variant="contained" color="primary">Update Student</Button>
      </form>
    </div>
  );
}
