import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModelTable from "./ModuleTable";
import ReturnButton from "../../comps/ReturnButton";
import "./ModulesTest.css";

export default function Modulestest() {
  const navigate = useNavigate();
  const { speciality, year } = useParams();

  const [modules1, setModules1] = useState([]); // Semester 1
  const [modules2, setModules2] = useState([]); // Semester 2
  const [isEditing, setIsEditing] = useState(false);

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
    { width: 100, label: "Module", dataKey: "name" },
  ];
console.log(modules1,modules2);
  const handleEdit = () => setIsEditing((prev) => !prev);
  const handleDelete = () => console.log("Delete Module button clicked");

  return (
    <div className="AllModules-Container">
      <div className="ModulesAll-TOP">
        <ReturnButton />
        <h3>Speciality: {speciality} | Level: {year}</h3>

        <div className="Buttons-side">
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("AddModules")}>
            Add
          </Button>
          <Button variant="contained" startIcon={<EditIcon />} onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <div className="ModulesAll-Main">
        <div className="ModulesCard-Div">
          <ModelTable isEditing={isEditing} setIsEditing={setIsEditing} columns={columns} initialRows={modules1} />
        </div>
        <div className="ModulesCard-Div">
          <ModelTable isEditing={isEditing} setIsEditing={setIsEditing} columns={columns} initialRows={modules2} />
        </div>
      </div>
    </div>
  );
}
