import React from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "./examlistOrigins.css"; // Keep your CSS

const exams = [
  { id: 1, title: "L1", path: "/exam/l1" },
  { id: 2, title: "L2", path: "/exam/l2" },
  { id: 3, title: "L3", path: "/exam/l3" },
  { id: 4, title: "M1", path: "/exam/m1" },
  { id: 5, title: "M2", path: "/exam/m2" },
];

export default function ExamListOrigins() {
  const navigate = useNavigate();
  const theme = useTheme(); // Detects dark or light mode

  return (
    <div className={`container ${theme.palette.mode === "dark" ? "dark-mode" : "light-mode"}`}>
      {["info", "physic", "gestion", "biology", "pharmacy", "medcine"].map((category, index) => (
        <div key={index} className="spec">
          <h2>{category}</h2>
          <div className="contener">
            {exams.map((exam) => (
              <div key={exam.id} className="spec" onClick={() => navigate(exam.path)}>
                <h2>{exam.title}</h2>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
