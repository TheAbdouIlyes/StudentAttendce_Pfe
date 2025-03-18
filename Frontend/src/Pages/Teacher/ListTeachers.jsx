import React, { useState } from 'react';
import "./ListTeachers.css";
import TableTeacher from './TableTeacher';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";

const initialRows = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  firstName: `Teacher ${String.fromCharCode(65 + (i % 5))}`,
  lastName: `Last ${i + 1}`,
  email: `teacher${i + 1}@example.com`,
  modules: ["Math", "Science", "History"][i % 3]
}));

export default function ListTeachers() {
  const navigate = useNavigate();
  const [rows, setRows] = useState(initialRows);
  const [showActions, setShowActions] = useState(false);

  return (
    <div className='Teachers-Container'>
      <div className='ListTeacher-Top'>
        <div className='TeacherListTitle'>Teacher List</div>
        <div className='Buttons-side'>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("addTeacher")}>
            Add
          </Button>
          <Button
            variant="contained"
            startIcon={showActions ? <VisibilityOffIcon /> : <VisibilityIcon />}
            onClick={() => setShowActions(prev => !prev)}
          >
            {showActions ? "Hide Actions" : "Show Actions"}
          </Button>
        </div>
      </div>
      <div className='ListTeacher-Main'>
        <TableTeacher showActions={showActions} setRows={setRows} rows={rows} />
      </div>
    </div>
  );
}
