import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function ModulesEditor({ teacherId, onClose, onAdd }) {
  const [subjects, setSubjects] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [newSubjects, setNewSubjects] = useState([]);
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
        MySwal.fire({
          icon: "error",
          title: "Failed to load data",
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    };

    fetchData();
  }, [teacherId]);

  const handleAddSubject = async () => {
    if (!matricul || newSubjects.length === 0) {
      MySwal.fire({
        icon: "warning",
        title: "Please select at least one module",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

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
      } else {
        MySwal.fire({
          icon: "error",
          title: `Failed to add module: ${subjectName}`,
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }

    if (addedSubjects.length > 0) {
      setSubjects([...subjects, ...addedSubjects]);
      setNewSubjects([]);
      onAdd();
      MySwal.fire({
        icon: "success",
        title: "Module(s) added successfully",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
      });
      onClose();
    }
  };

  const handleRemoveSubject = async (subjectName) => {
    const res = await fetch(`http://127.0.0.1:8000/tea/${matricul}/sub/${subjectName}/not`, {
      method: "DELETE",
    });

    if (res.ok) {
      setSubjects((prev) => prev.filter((s) => s.name !== subjectName));
      onAdd();
      MySwal.fire({
        icon: "success",
        title: `Module "${subjectName}" removed`,
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      MySwal.fire({
        icon: "error",
        title: `Failed to remove module: ${subjectName}`,
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
          label="Add Modules"
          onChange={(e) => setNewSubjects(e.target.value)}
          renderValue={(selected) => selected.join(", ")}
        >
          {availableSubjects
            .filter((s) => !subjects.some((sub) => sub.name === s.name))
            .map((subject) => (
              <MenuItem key={subject.name} value={subject.name}>
                <Checkbox checked={newSubjects.includes(subject.name)} />
                <ListItemText primary={subject.name} />
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
