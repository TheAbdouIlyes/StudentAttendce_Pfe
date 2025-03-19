import React, { useState, useEffect } from "react";
import { TextField, Button, Paper } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ReturnButton from "../../comps/ReturnButton";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    email: "",
    speciality: "",
    level: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch student data when component mounts
  useEffect(() => {
    const fetchStudent = async () => {
      if (!id) {
        setError("Invalid student ID");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/student/info/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }

        const data = await response.json();
        console.log("Fetched student data:", data);
        setStudent({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          speciality: data.speciality || "",
          level: data.level || "",
        });
      } catch (err) {
        console.error("Error fetching student:", err);
        setError("Failed to load student data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSave = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/u_student/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        throw new Error("Failed to update student");
      }

      navigate(-1); // Redirect after saving
    } catch (err) {
      console.error("Error updating student:", err);
      setError("Failed to update student");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Paper sx={{ padding: 3, maxWidth: 500, margin: "auto", marginTop: 5 }}>
      <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <ReturnButton />
        <h2>Edit Student {id}</h2>
      </div>

      <TextField fullWidth label="First Name" name="first_name" value={student.first_name} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Last Name" name="last_name" value={student.last_name} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Email" name="email" value={student.email} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Speciality" name="speciality" value={student.speciality} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="level" name="level" value={student.level} onChange={handleChange} margin="normal" />

      <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>
        Save
      </Button>
    </Paper>
  );
}
