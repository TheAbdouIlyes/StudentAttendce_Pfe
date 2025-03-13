import React from "react";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentMenu.css"; // Keep your CSS
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

const StudentsTable = [
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
            <h2>Students Menu</h2>
        </div>
        

    
        <div className={`container ${theme.palette.mode === "dark" ? "dark-mode" : "light-mode"}`}>

            
        {["info", "physic", "gestion", "biology", "pharmacy", "medcine"].map((category, index) => (
            <div key={index} className="spec">
            <h2>{category}</h2>
            <div className="contener">
                {StudentsTable.map((student) => (
                <div key={student.id} className="spec" onClick={() => navigate(`/MenuStudent/${category}/${student.title}`)}>
                  
                    <h2>{student.title}</h2>
                </div>
                ))}
            </div>
            </div>
        ))}
        </div>
    </div>
  );
}