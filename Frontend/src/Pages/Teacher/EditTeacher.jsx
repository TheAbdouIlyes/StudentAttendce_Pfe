import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, List, ListItem, IconButton, MenuItem,Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReturnButton from "../../comps/ReturnButton";
import DeleteIcon from "@mui/icons-material/Delete";
// import { Box } from "lucide-react";

export default function EditTeacher() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [subjects, setSubjects] = useState([]); // Assigned subjects
  const [availableSubjects, setAvailableSubjects] = useState([]); // All available subjects
  const [newSubject, setNewSubject] = useState(""); // Store subject name
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [matricul, setMatricul] = useState(""); // Single value for matricul

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch teacher info
        const teacherResponse = await fetch(`http://127.0.0.1:8000/teacher/info/${id}`);
        if (!teacherResponse.ok) throw new Error("Failed to fetch teacher data");
        const teacherData = await teacherResponse.json();
        setFormData({
          first_name: teacherData.first_name || "",
          last_name: teacherData.last_name || "",
          email: teacherData.email || "",
        });
        setMatricul(teacherData.matricul || ""); // Ensure matricul is set correctly

        // Fetch assigned subjects
        const subjectsResponse = await fetch(`http://127.0.0.1:8000/teacher_subject/${id}`);
        if (!subjectsResponse.ok) throw new Error("Failed to fetch assigned subjects");
        const assignedSubjects = await subjectsResponse.json();
        setSubjects(Array.isArray(assignedSubjects) ? assignedSubjects : []);

        // Fetch all available subjects
        const availableResponse = await fetch("http://127.0.0.1:8000/subjects/");
        if (!availableResponse.ok) throw new Error("Failed to fetch subjects list");
        const availableData = await availableResponse.json();
        setAvailableSubjects(Array.isArray(availableData) ? availableData : []);
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

  const handleSave = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/u_teacher/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to update teacher");
      navigate(-1);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddSubject = async () => {
    if (!newSubject || !matricul) return;

    // Check if subject exists in availableSubjects
    const subjectToAdd = availableSubjects.find((subj) => subj.name === newSubject);
    if (!subjectToAdd) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/tea/${matricul}/sub/${newSubject}/`, { method: "POST" });
      if (!response.ok) throw new Error("Failed to assign subject");

      setSubjects([...subjects, subjectToAdd]); // Add subject object to state
      setNewSubject("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveSubject = async (subjectName) => {
    if (!matricul) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/tea/${matricul}/sub/${subjectName}/not`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to remove subject");
      setSubjects(subjects.filter((sub) => sub.name !== subjectName));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Paper sx={{ padding: 3, maxWidth: 500, margin: "auto"}}>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <ReturnButton />
        <h2>Edit Teacher {id}</h2>
      </Box>
      
      <TextField fullWidth label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" />
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>
        Save
      </Button>

      <h3>Subjects</h3>
      <List>
        {subjects.map((subject) => (
          <ListItem key={subject.name} secondaryAction={
            <IconButton edge="end" onClick={() => handleRemoveSubject(subject.name)}>
              <DeleteIcon />
            </IconButton>
          }>
            {subject.name}
          </ListItem>
        ))}
      </List>

      <TextField
        select
        fullWidth
        label="New Subject"
        value={newSubject}
        onChange={(e) => setNewSubject(e.target.value)}
        margin="normal"
      >
        {availableSubjects
          .filter((subj) => !subjects.some((assigned) => assigned.name === subj.name)) // Ensure no duplicate assignment
          .map((subject) => (
            <MenuItem key={subject.name} value={subject.name}>
              {subject.name}
            </MenuItem>
          ))}
      </TextField>
      <Button variant="contained" color="secondary" onClick={handleAddSubject} sx={{ marginTop: 2 }}>
        Add Subject
      </Button>
    </Paper>
  );
}
