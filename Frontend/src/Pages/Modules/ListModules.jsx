import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ModelTable from "./ModuleTable";
import ReturnButton from "../../comps/ReturnButton";
import "./ListModules.css";

export default function ListModules() {
  const navigate = useNavigate();
  const { speciality, year } = useParams();

  const [modules1, setModules1] = useState([]);
  const [modules2, setModules2] = useState([]);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch(`http://127.0.0.1:8000/subject/${speciality}/${year}/s1/`),
          fetch(`http://127.0.0.1:8000/subject/${speciality}/${year}/s2/`),
        ]);

        const data1 = response1.ok ? await response1.json() : [];
        const data2 = response2.ok ? await response2.json() : [];

        setModules1(data1.results);
        setModules2(data2.results);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchModules();
  }, [speciality, year]);

  const columns = [
    { width: 50, label: "ID", dataKey: "id" },
    { width: 200, label: "Module", dataKey: "name" },
  ];

  const handleRowDelete = async (id, semester) => {
    try {
      await fetch(`http://127.0.0.1:8000/delete_subject/${id}`, {
        method: "DELETE",
      });

      if (semester === 1) {
        setModules1((prev) => prev.filter((mod) => mod.id !== id));
      } else {
        setModules2((prev) => prev.filter((mod) => mod.id !== id));
      }
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };


  

  return (
    <div className="AllModules-Container">
      <div className="ModulesAll-TOP">
        <ReturnButton />
        <h3>
          Speciality: {speciality} | Level: {year}
        </h3>

        <div className="Buttons-side">
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("AddModules")}>
            Add
          </Button>
          <Button variant="contained" onClick={() => setShowActions((prev) => !prev)}>
            Show Actions
          </Button>
        </div>
      </div>

      <div className="ModulesAll-Main">
        <div className="ModulesCard-Div">
          <ModelTable
            showActions={showActions}
            columns={columns}
            initialRows={modules1}
            onDelete={(id) => handleRowDelete(id, 1)}
          />
        </div>
        <div className="ModulesCard-Div">
          <ModelTable
            showActions={showActions}
            columns={columns}
            initialRows={modules2}
            onDelete={(id) => handleRowDelete(id, 2)}
          />
        </div>
      </div>
    </div>
  );
}
