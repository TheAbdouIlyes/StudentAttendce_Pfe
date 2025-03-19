import React, { useState, useEffect } from "react";
import { TextField, Button, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReturnButton from "../../comps/ReturnButton";


export default function EditTeacher() {


  const navigate = useNavigate();
  const { id } = useParams(); // Extract ID from URL
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    modules: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeacher = async () => {
      if (!id) {
        setError("Invalid teacher ID");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/teacher/info/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch teacher data");
        }
        const data = await response.json();
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          modules: data.modules || "",
        });
      } catch (err) {
        console.error("Error fetching teacher:", err);
        setError("Failed to load teacher data");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id]); // Runs whenever `id` changes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/u_teacher/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      

      if (!response.ok) {
        throw new Error("Failed to update teacher");
      }

      navigate(-1); // Redirect after saving
    } catch (err) {
      console.error("Error updating teacher:", err);
      setError("Failed to update teacher");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Paper sx={{ padding: 3, maxWidth: 500, margin: "auto", marginTop: 5 }}>
      <ReturnButton />
      <h2>Edit Teacher {id}</h2>
      <TextField fullWidth label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Modules" name="modules" value={formData.modules} onChange={handleChange} margin="normal" />
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>
        Save
      </Button>
    </Paper>
  );
}
