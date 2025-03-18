import React, { useState } from "react";
import { TextField, Button, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReturnButton from "../../comps/ReturnButton";

export default function EditTeacher() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    modules: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    navigate("/teachers");
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: 500, margin: "auto", marginTop: 5 }}>
        <ReturnButton/>
      <h2>Edit Teacher {id}</h2>
      <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Modules" name="modules" value={formData.modules} onChange={handleChange} margin="normal" />
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>
        Save
      </Button>
    </Paper>
  );
}
