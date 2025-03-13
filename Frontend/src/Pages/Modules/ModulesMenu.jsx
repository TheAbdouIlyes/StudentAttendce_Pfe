import React from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "./ModulesMenu.css"; // Keep your CSS

const modules = [
  { id: 1, title: "L1", path: "/l1" },
  { id: 2, title: "L2", path: "/l2" },
  { id: 3, title: "L3", path: "/l3" },
  { id: 4, title: "M1", path: "/m1" },
  { id: 5, title: "M2", path: "/m2" },
];

export default function ModulesMenu() {
  const navigate = useNavigate();
  const theme = useTheme(); // Detects dark or light mode

  return (
    <div>
        <h3>Modules</h3>

    
        <div className={`container ${theme.palette.mode === "dark" ? "dark-mode" : "light-mode"}`}>

            
        {["info", "physic", "gestion", "biology", "pharmacy", "medcine"].map((category, index) => (
            <div key={index} className="spec">
            <h2>{category}</h2>
            <div className="contener">
                {modules.map((module) => (
                <div key={module.id} className="spec" onClick={() => navigate(`/MenuModules/${category}/${module.title}`)}>
                  
                    <h2>{module.title}</h2>
                </div>
                ))}
            </div>
            </div>
        ))}
        </div>
    </div>
  );
}