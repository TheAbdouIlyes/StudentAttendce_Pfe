import React from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "./ModulesMenu.css"; // Keep your CSS

const modules = ["l1", "l2", "l3", "m1", "m2"];
const categories = ["Info", "Physic", "Gestion", "Biology", "Pharmacy", "Medcine"];

export default function ModulesMenu() {
  const navigate = useNavigate();
  const theme = useTheme(); // Detects dark or light mode
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <div className={`menu-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <h2 className="menu-title">Choose Your Specialty & Level</h2>

      <div className="categories-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <h3 className="category-title">{category}</h3>
            <div className="modules-grid">
              {modules.map((module, idx) => (
                <div key={idx} className="module-card" onClick={() => navigate(`/MenuModules/${category.toLowerCase()}/${module}`)}>
                  <h4>{module}</h4>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
