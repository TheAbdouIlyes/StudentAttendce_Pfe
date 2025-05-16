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
import ReturnButton from "../../comps/ReturnButton";

export default function AddModule({onClose,onAdd}) {
  const [moduleData, setModuleData] = useState({
    name: "",
    level: "",
    speciality: "",
    semester: "s1", // Default semester
  });

  const [modules, setModules] = useState([]); // Store modules
  

  // Handle input changes
  const handleChange = (event) => {
    setModuleData({ ...moduleData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (!moduleData.name || !moduleData.level|| !moduleData.speciality || !moduleData.semester) {
      alert("All fields are required!");
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
        console.error("API Error Response:", responseData);
        throw new Error(responseData?.detail || "Failed to add subject.");
      }

      // Update state
      setModules([...modules, moduleData]);
      setModuleData({ name: "", level: "", speciality: "", semester: "s1" }); // Reset form
      
      onAdd(moduleData)
      onClose(); // close modal


    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  return (
    <Box sx={{ pb:3, maxWidth: "600px", margin: "auto" }}>
      <h2>
        Add a New Module
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <TextField label="Module Name" name="name" value={moduleData.name} onChange={handleChange} required />

        <FormControl>
          <InputLabel>Year</InputLabel>
          <Select label="Year" name="level" value={moduleData.level} onChange={handleChange} required>
            <MenuItem value="l1">L1</MenuItem>
            <MenuItem value="l2">L2</MenuItem>
            <MenuItem value="l3">L3</MenuItem>
            <MenuItem value="m1">M1</MenuItem>
            <MenuItem value="m2">M2</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Speciality</InputLabel>
          <Select label="Speciality" name="speciality" value={moduleData.speciality} onChange={handleChange} required>
            <MenuItem value="info">Info</MenuItem>
            <MenuItem value="physic">Physic</MenuItem>
            <MenuItem value="gestion">Gestion</MenuItem>
            <MenuItem value="biology">Biology</MenuItem>
            <MenuItem value="pharmacy">Pharmacy</MenuItem>
            <MenuItem value="medcine">Medcine</MenuItem>
          </Select>
        </FormControl>

        {/* Semester Selection (Radio Buttons) */}
        <FormControl component="fieldset">
          <FormLabel component="legend">Semester</FormLabel>
          <RadioGroup row name="semester" value={moduleData.semester} onChange={handleChange}>
            <FormControlLabel value="s1" control={<Radio />} label="S1" />
            <FormControlLabel value="s2" control={<Radio />} label="S2" />
          </RadioGroup>
        </FormControl>


        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" color="primary" onClick={onClose}  sx={{ pr:1,pl:1,mt: 2,border:0 }}>Cancel</Button>

          <Button variant="contained"color="info" sx={{ mt: 2,border:0 }}  type="submit">
            Add Module
          </Button>
        </Box>
      </form>

      {/* Table to display modules */}
      {modules.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>level</b></TableCell>
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
