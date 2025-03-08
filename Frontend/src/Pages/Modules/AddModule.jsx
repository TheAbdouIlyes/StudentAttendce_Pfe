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
  FormLabel
} from "@mui/material";
import ReturnButton from "../../comps/ReturnButton";

export default function AddModule() {
  const [moduleData, setModuleData] = useState({
    name: "",
    year: "",
    speciality: "",
    teacher: "",
    semester: "S1" // Default semester
  });

  const [modules, setModules] = useState([]); // Store modules

  // Handle input changes
  const handleChange = (event) => {
    setModuleData({ ...moduleData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!moduleData.name || !moduleData.year || !moduleData.speciality || !moduleData.teacher || !moduleData.semester) {
      alert("All fields are required!");
      return;
    }
    setModules([...modules, moduleData]); // Add module to table
    setModuleData({ name: "", year: "", speciality: "", teacher: "", semester: "S1" }); // Reset form
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
  
      <h2><ReturnButton/> Add a New Module</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <TextField label="Module Name" name="name" value={moduleData.name} onChange={handleChange} required />

        <FormControl>
          <InputLabel>Year</InputLabel>
          <Select name="year" value={moduleData.year} label="Year" onChange={handleChange} required>
            <MenuItem value="L1">L1</MenuItem>
            <MenuItem value="L2">L2</MenuItem>
            <MenuItem value="L3">L3</MenuItem>
            <MenuItem value="M1">M1</MenuItem>
            <MenuItem value="M2">M2</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Speciality" name="speciality" value={moduleData.speciality} onChange={handleChange} required />
        <TextField label="Teacher Responsible" name="teacher" value={moduleData.teacher} onChange={handleChange} required />

        {/* Semester Selection (Radio Buttons) */}
        <FormControl component="fieldset">
          <FormLabel component="legend">Semester</FormLabel>
          <RadioGroup row name="semester" value={moduleData.semester} onChange={handleChange}>
            <FormControlLabel value="S1" control={<Radio />} label="S1" />
            <FormControlLabel value="S2" control={<Radio />} label="S2" />
          </RadioGroup>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">Add Module</Button>
      </form>

      {/* Table to display modules */}
      {modules.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Year</b></TableCell>
                <TableCell><b>Speciality</b></TableCell>
                <TableCell><b>Teacher</b></TableCell>
                <TableCell><b>Semester</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modules.map((module, index) => (
                <TableRow key={index}>
                  <TableCell>{module.name}</TableCell>
                  <TableCell>{module.year}</TableCell>
                  <TableCell>{module.speciality}</TableCell>
                  <TableCell>{module.teacher}</TableCell>
                  <TableCell>{module.semester}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
