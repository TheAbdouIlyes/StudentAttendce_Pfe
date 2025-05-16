import React, { useState, useEffect } from "react";
import {
  TextField,
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
  Select,
  MenuItem,
  Box
} from "@mui/material";
import Swal from "sweetalert2";
import ReturnButton from "../../comps/ReturnButton";

export default function AddTeacher({ onClose, onAdd }) {
  const [teacherData, setTeacherData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    secret_number: "",
    matricul: ""
  });

  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/subjects/")
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((err) => console.error("Error fetching subjects:", err));
  }, []);

  const handleChange = (event) => {
    setTeacherData({ ...teacherData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/teacher/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacherData)
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 400 && result?.error?.includes("already exists")) {
          Swal.fire({
            icon: "error",
            title: "A teacher with this email or matricule already exists.",
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: `Failed to add teacher: ${result.error}`,
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 2000,
          });
        }
        return;
      }

      onAdd(teacherData);
      onClose();
      setTeachers([...teachers, result]);
      setTeacherData({ first_name: "", last_name: "", email: "", secret_number: "", matricul: "" });

      Swal.fire({
        icon: "success",
        title: "Teacher added successfully",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong. Please try again.",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const assignSubject = async () => {
    if (!selectedTeacher || !selectedSubject) {
      Swal.fire({
        icon: "warning",
        title: "Please select both a teacher and a subject",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Assign subject?",
      text: `Assign "${selectedSubject}" to teacher "${selectedTeacher}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, assign",
      cancelButtonText: "Cancel",
      toast: true,
      position: "bottom-end",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/tea/${selectedTeacher}/sub/${selectedSubject}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        }
      );

      if (!response.ok) throw new Error("Failed to assign subject");

      Swal.fire({
        icon: "success",
        title: "Subject assigned successfully",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error assigning subject",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div style={{ padding: 10, maxWidth: "600px", margin: "auto" }}>
      <h2>Add a New Teacher</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <TextField label="First Name" name="first_name" value={teacherData.first_name} onChange={handleChange} required />
        <TextField label="Last Name" name="last_name" value={teacherData.last_name} onChange={handleChange} required />
        <TextField label="Email" name="email" value={teacherData.email} onChange={handleChange} required />
        <TextField label="Secret Number" name="secret_number" value={teacherData.secret_number} onChange={handleChange} required />
        <TextField label="Matricule" name="matricul" value={teacherData.matricul} onChange={handleChange} required />
        <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }} gap={2} mt={2}>
          <Button variant="outlined" color="primary" onClick={onClose} sx={{ pr: 1, pl: 1, mt: 2, border: 0 }}>Cancel</Button>
          <Button variant="contained" color="info" sx={{ mt: 2, border: 0 }} type="submit">Add</Button>
        </Box>
      </form>

      {teachers.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>First Name</b></TableCell>
                <TableCell><b>Last Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Matricule</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher, index) => (
                <TableRow key={index}>
                  <TableCell>{teacher.first_name}</TableCell>
                  <TableCell>{teacher.last_name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.matricul}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* <h3>Assign Subject to Teacher</h3>
      <FormControl fullWidth>
        <InputLabel>Teacher Matricule</InputLabel>
        <Select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
          {teachers.map((teacher, index) => (
            <MenuItem key={index} value={teacher.matricul}>{teacher.matricul}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth style={{ marginTop: "10px" }}>
        <InputLabel>Subject</InputLabel>
        <Select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
          {subjects.map((subject, index) => (
            <MenuItem key={index} value={subject.name}>{subject.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button onClick={assignSubject} variant="contained" color="secondary" style={{ marginTop: "10px" }}>
        Assign Subject
      </Button> */}
    </div>
  );
}
