// EditStudent.jsx
import React, { useState } from "react";
import { TextField, Button, Paper } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ReturnButton from "../../comps/ReturnButton";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({ firstName: "", lastName: "", email: "", speciality: "", yearOfStudy: "" });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated student:", student);
    navigate("/");
  };

  return (
    <Paper style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <div style={{ width:"100%" , display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <ReturnButton/>
        <h2>Edit Student {id}</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <TextField label="First Name" name="firstName" fullWidth value={student.firstName} onChange={handleChange} margin="normal" />
        <TextField label="Last Name" name="lastName" fullWidth value={student.lastName} onChange={handleChange} margin="normal" />
        <TextField label="Email" name="email" fullWidth value={student.email} onChange={handleChange} margin="normal" />
        <TextField label="Speciality" name="speciality" fullWidth value={student.speciality} onChange={handleChange} margin="normal" />
        <TextField label="Year of Study" name="yearOfStudy" fullWidth value={student.yearOfStudy} onChange={handleChange} margin="normal" />
        <Button type="submit" variant="contained" color="primary">Save Changes</Button>
      </form>
    </Paper>
  );
}
