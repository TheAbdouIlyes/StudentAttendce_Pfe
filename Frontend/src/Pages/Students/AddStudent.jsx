// AddStudentForm.jsx
import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Box,
  Paper
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";

export default function AddStudent({ onClose, onAdd }) {
  const [studentData, setStudentData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    level: "",
    speciality: "",
    roll_number: "",
    matricul: "",
  });

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(studentData).some(val => !val)) {
      Swal.fire({
        icon: "warning",
        title: "All fields are required!",
        text: "Please fill out every field before submitting.",
        position: 'bottom-end', // bottom right,
        toast: true,    
        showConfirmButton: false,     // removes the OK button
        timer: 2000,                  // disappears after 2 seconds
        timerProgressBar: true        // optional: shows a visual timer
      });
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
        throw new Error(responseData?.detail || "Failed to add student.");
      }

      // ✅ Success alert
      Swal.fire({
        icon: "success",
        title: "Student added successfully!",
        position: 'bottom-end', // bottom right,
        toast: true,    
        showConfirmButton: false,     // removes the OK button
        timer: 2000,                  // disappears after 2 seconds
        timerProgressBar: true        // optional: shows a visual timer
      });

      onAdd(studentData); // callback to update parent
      onClose(); // close modal

    } catch (err) {
      console.error("Error:", err);

      // ❌ Error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Something went wrong while adding the student.",
        position: 'bottom-end', // bottom right,
        toast: true,    
        showConfirmButton: false,     // removes the OK button
        timer: 2000,                  // disappears after 2 seconds
        timerProgressBar: true        // optional: shows a visual timer
      });
    }
  };

  return (
    <Paper sx={{ pb: 3 }} elevation={0}>
      <h2>Add New Student</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <TextField
          label="First Name"
          name="first_name"
          value={studentData.first_name}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={studentData.last_name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={studentData.email}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel>Year</InputLabel>
          <Select
            name="level"
            label="Year"
            value={studentData.level}
            onChange={handleChange}
          >
            <MenuItem value="l1">L1</MenuItem>
            <MenuItem value="l2">L2</MenuItem>
            <MenuItem value="l3">L3</MenuItem>
            <MenuItem value="m1">M1</MenuItem>
            <MenuItem value="m2">M2</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Speciality</InputLabel>
          <Select
            name="speciality"
            label="Speciality"
            value={studentData.speciality}
            onChange={handleChange}
          >
            <MenuItem value="info">Info</MenuItem>
            <MenuItem value="physic">Physic</MenuItem>
            <MenuItem value="gestion">Gestion</MenuItem>
            <MenuItem value="biology">Biology</MenuItem>
            <MenuItem value="pharmacy">Pharmacy</MenuItem>
            <MenuItem value="medcine">Medcine</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Roll Number"
          name="roll_number"
          value={studentData.roll_number}
          onChange={handleChange}
        />
        <TextField
          label="Matricule"
          name="matricul"
          value={studentData.matricul}
          onChange={handleChange}
        />

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={onClose}
            sx={{ pr: 1, pl: 1, mt: 2, border: 0 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, border: 0 }}
            type="submit"
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
