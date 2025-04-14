import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ModulesEditor({ teacherId, onClose, onAdd }) {
  const [subjects, setSubjects] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [newSubjects, setNewSubjects] = useState([]); // updated from string to array
  const [matricul, setMatricul] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherResponse = await fetch(`http://127.0.0.1:8000/teacher/info/${teacherId}`);
        const teacherData = await teacherResponse.json();
        setMatricul(teacherData.matricul || "");

        const subjectsResponse = await fetch(`http://127.0.0.1:8000/teacher_subject/${teacherId}`);
        setSubjects(await subjectsResponse.json());

        const availableResponse = await fetch("http://127.0.0.1:8000/subjects/");
        setAvailableSubjects(await availableResponse.json());
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [teacherId]);

  const handleAddSubject = async () => {
    if (!matricul || newSubjects.length === 0) return;

    const addedSubjects = [];

    for (const subjectName of newSubjects) {
      const res = await fetch(`http://127.0.0.1:8000/tea/${matricul}/sub/${subjectName}/`, {
        method: "POST",
      });

      if (res.ok) {
        const subjectToAdd = availableSubjects.find((s) => s.name === subjectName);
        if (subjectToAdd) {
          addedSubjects.push(subjectToAdd);
        }
      }
    }

    if (addedSubjects.length > 0) {
      setSubjects([...subjects, ...addedSubjects]);
      setNewSubjects([]);
      onAdd();
      onClose();
    }
  };

  const handleRemoveSubject = async (subjectName) => {
    const res = await fetch(`http://127.0.0.1:8000/tea/${matricul}/sub/${subjectName}/not`, {
      method: "DELETE",
    });

    if (res.ok) {
      setSubjects(subjects.filter((s) => s.name !== subjectName));
    }

    onAdd();
  };

  return (
    <Box>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <h2>Manage Modules</h2>
      </Box>
      <List>
        {subjects.map((subject) => (
          <ListItem
            key={subject.name}
            secondaryAction={
              <IconButton onClick={() => handleRemoveSubject(subject.name)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            {subject.name}
          </ListItem>
        ))}
      </List>

      <FormControl fullWidth margin="normal">
        <InputLabel>Add Modules</InputLabel>
        <Select
          multiple
          value={newSubjects}
          onChange={(e) => setNewSubjects(e.target.value)}
          label="Add Modules"
          renderValue={(selected) => selected.join(", ")}
        >
          {availableSubjects
            .filter((s) => !subjects.some((sub) => sub.name === s.name))
            .map((subject) => (
              <MenuItem key={subject.name} value={subject.name}>
                {subject.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <Button onClick={handleAddSubject} variant="contained" fullWidth sx={{ mt: 2 }}>
        Add Module(s)
      </Button>
      <Button onClick={onClose} variant="outlined" fullWidth sx={{ mt: 1 }}>
        Return
      </Button>
    </Box>
  );
}
