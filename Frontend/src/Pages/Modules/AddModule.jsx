import React, { useState } from "react";
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
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Box,
} from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useParams } from "react-router-dom";

export default function AddModule({ onClose, onAdd }) {
  const { speciality, year } = useParams();
  const [moduleData, setModuleData] = useState({
    name: "",
    level: year || "",
    speciality: speciality || "",
    semester: "s1",
  });

  const [modules, setModules] = useState([]);

  const handleChange = (event) => {
    setModuleData({ ...moduleData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!moduleData.name || !moduleData.level || !moduleData.speciality || !moduleData.semester) {
      Swal.fire({
        icon: "error",
        title: "All fields are required!",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/subject/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(moduleData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("API Error:", responseData);
        throw new Error(responseData?.detail || "Failed to add module.");
      }

      setModules([...modules, moduleData]);
      setModuleData({ name: "", level: "", speciality: "", semester: "s1" });

      onAdd(moduleData);
      onClose();

      Swal.fire({
        icon: "success",
        title: "Module added successfully!",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: error.message || "Something went wrong",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <Box sx={{ pb: 3, maxWidth: "600px", margin: "auto" }}>
      <h2>Add a New Module</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <TextField label="Module Name" name="name" value={moduleData.name} onChange={handleChange} required />

        <FormControl>
          <InputLabel>Year</InputLabel>
          <Select name="level" label="Year" value={moduleData.level} onChange={handleChange} required>
            <MenuItem value="l1">L1</MenuItem>
            <MenuItem value="l2">L2</MenuItem>
            <MenuItem value="l3">L3</MenuItem>
            <MenuItem value="m1">M1</MenuItem>
            <MenuItem value="m2">M2</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Speciality</InputLabel>
          <Select name="speciality" label="Speciality" value={moduleData.speciality} onChange={handleChange} required>
            <MenuItem value="info">Info</MenuItem>
            <MenuItem value="physic">Physic</MenuItem>
            <MenuItem value="gestion">Gestion</MenuItem>
            <MenuItem value="biology">Biology</MenuItem>
            <MenuItem value="pharmacy">Pharmacy</MenuItem>
            <MenuItem value="medcine">Medcine</MenuItem>
          </Select>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">Semester</FormLabel>
          <RadioGroup row name="semester" value={moduleData.semester} onChange={handleChange}>
            <FormControlLabel value="s1" control={<Radio />} label="S1" />
            <FormControlLabel value="s2" control={<Radio />} label="S2" />
          </RadioGroup>
        </FormControl>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" color="primary" onClick={onClose} sx={{ pr: 1, pl: 1, mt: 2, border: 0 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" sx={{ mt: 2, border: 0 }} type="submit">
            Add Module
          </Button>
        </Box>
      </form>

      {modules.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Level</b></TableCell>
                <TableCell><b>Speciality</b></TableCell>
                <TableCell><b>Semester</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modules.map((module, index) => (
                <TableRow key={index}>
                  <TableCell>{module.name}</TableCell>
                  <TableCell>{module.level}</TableCell>
                  <TableCell>{module.speciality}</TableCell>
                  <TableCell>{module.semester}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
