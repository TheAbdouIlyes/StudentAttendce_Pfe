import React from "react";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExamsMenu.css"; // Keep your CSS
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Menu,
    MenuItem,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField
  } from "@mui/material";

const ExamsTable = [
  { id: 1, title: "L1", path: "/l1" },
  { id: 2, title: "L2", path: "/l2" },
  { id: 3, title: "L3", path: "/l3" },
  { id: 4, title: "M1", path: "/m1" },
  { id: 5, title: "M2", path: "/m2" },
];


 

export default function ModulesMenu() {
  const navigate = useNavigate();
  const theme = useTheme(); // Detects dark or light mode

  const [semester, setSemester] = useState("S1");

  return (
    <div>
        <div className="ExamsMenu-TOP">
            <h2>Exams</h2>

            <FormControl component="fieldset">
                    <FormLabel component="legend">Select Semester</FormLabel>
                    <RadioGroup row value={semester} onChange={(e) => setSemester(e.target.value)}>
                        {["S1", "S2"].map((sem) => (
                        <FormControlLabel key={sem} value={sem} control={<Radio />} label={sem} />
                        ))}
                    </RadioGroup>
            </FormControl>
        </div>
        

    
        <div className={`container ${theme.palette.mode === "dark" ? "dark-mode" : "light-mode"}`}>

            
        {["info", "physic", "gestion", "biology", "pharmacy", "medcine"].map((category, index) => (
            <div key={index} className="spec">
            <h2>{category}</h2>
            <div className="contener">
                {ExamsTable.map((exams) => (
                <div key={exams.id} className="spec" onClick={() => navigate(`/MenuExams/${category}/${exams.title}/${semester}`)}>
                  
                    <h2>{exams.title}</h2>
                </div>
                ))}
            </div>
            </div>
        ))}
        </div>
    </div>
  );
}