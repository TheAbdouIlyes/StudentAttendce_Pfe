import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditTeacher({ teacherId, onClose, onAdd }) {
  const navigate = useNavigate();
  const id = teacherId;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [originalFormData, setOriginalFormData] = useState(null); // for comparison
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherResponse = await fetch(`http://127.0.0.1:8000/teacher/info/${id}`);
        if (!teacherResponse.ok) throw new Error("Failed to fetch teacher data");
        const teacherData = await teacherResponse.json();

        const data = {
          first_name: teacherData.first_name || "",
          last_name: teacherData.last_name || "",
          email: teacherData.email || "",
        };

        setFormData(data);
        setOriginalFormData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isUnchanged = () => {
    return (
      originalFormData &&
      formData.first_name === originalFormData.first_name &&
      formData.last_name === originalFormData.last_name &&
      formData.email === originalFormData.email
    );
  };

  const handleSave = async () => {
    if (isUnchanged()) {
      Swal.fire({
        icon: "info",
        title: "No changes detected",
        text: "Nothing was changed to save.",
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/u_teacher/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update teacher");

      Swal.fire({
        icon: "success",
        title: "Teacher updated",
        text: "The teacher's information has been successfully updated.",
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });

      onAdd(formData);
      onClose();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: err.message || "Something went wrong.",
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Paper elevation={0} sx={{ padding: 3, pb: 5, maxWidth: 500, margin: "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2>Edit Teacher {id}</h2>
      </Box>

      <TextField
        fullWidth
        label="First Name"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Last Name"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
      />

      <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
        <Button variant="outlined" color="primary" onClick={onClose} sx={{ pr: 1, pl: 1, mt: 2, border: 0 }}>
          Cancel
        </Button>
        <Button variant="contained" color="info" sx={{ mt: 2, border: 0 }} onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Paper>
  );
}
