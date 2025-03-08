import React from 'react';
import "./ModulesTest.css";
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModelTable from '../Comps/ModuleTable';
import { useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import ReturnButton from '../../comps/ReturnButton';


const modules1 = ["System d'exploitation 2", "Algo", "Mathématiques"];
const modules2 = ["Physique", "Programmation", "Base de données", "Base de données", "Base de données", "Base de données", "Base de données", "Base de données", "Base de données", "Base de données", "Base de données"];

export default function Modulestest() {

  const navigate = useNavigate();


    const columns2 = [
        { width: 50, label: "ID", dataKey: "id" },
        { width: 100, label: "Modules S2", dataKey: "name" },
        { width: 50, label: "Coef", dataKey: "coef" },
      
      ];

      const columns1 = [
        { width: 50, label: "ID", dataKey: "id" },
        { width: 100, label: "Modules S1", dataKey: "name" },
        { width: 50, label: "Coef", dataKey: "coef" },
      
      ];
      
      const initialRows = [
        {id: 1, name: "tdg",coef:5 },
        { id: 2, name: "asd2",coef:5 },
        { id: 3, name: "logic",coef:5 },
        { id: 4, name: "maths" ,coef:5},
        { id: 5, name: "biology",coef:5 },
        { id: 6, name: "chemistry",coef:5 },
        { id: 7, name: "physics",coef:5 },
        { id: 8, name: "history",coef:5 },
        { id: 9, name: "english" ,coef:5},
        { id: 10, name: "french" ,coef:5},
        { id: 11, name: "spanish" ,coef:5},
        
      
      ];
      

  
    const [isEditing, setIsEditing] = useState(false);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
  
    //Add ---------\
    const handleAddStudent = () => {
      // Implement your add student logic here
      console.log("Add Model button clicked");
    };
  
  
    const handleEditStudent = () => {
      console.log("Edit Model button clicked");
      setIsEditing(prev=>!prev);
    };
  
    const handleDeleteStudent = () => {
      console.log("Delete Model button clicked");
    };
  
  
  

  return (
    <div className='AllModules-Container'>
      <div className='ModulesAll-TOP'>
        <div>

          <ReturnButton/>

          
        </div>
        {/* <h2>{SpecialityAndYear}</h2> */}

        {/* <FormControl>
          <InputLabel>Year</InputLabel>
          <Select name="year"  label="Year"  required sx={{width:100}}>
            <MenuItem value="L1">L1</MenuItem>
            <MenuItem value="L2">L2</MenuItem>
            <MenuItem value="L3">L3</MenuItem>
            <MenuItem value="M1">M1</MenuItem>
            <MenuItem value="M2">M2</MenuItem>
            <MenuItem value="All">All</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Speciality</InputLabel>
          <Select name="Speciality"  label="Speciality" required sx={{width:180}}>
            <MenuItem value="L1">Info</MenuItem>
            <MenuItem value="L2">Bio</MenuItem>
            <MenuItem value="All">All</MenuItem>
          </Select>
        </FormControl> */}

        <div className='Buttons-side'>
          <Button variant="contained" startIcon={<AddIcon />}   onClick={() => navigate("AddModules")} >
            Add
          </Button>

          <Button variant="contained" startIcon={<EditIcon />} onClick={handleEditStudent}>
            Edit
          </Button>

          <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleDeleteStudent}>
            Delete
          </Button>
        </div>
      </div>

      <div className='ModulesAll-Main'>
          <div className='ModulesCard-Div'>
             <ModelTable isEditing={isEditing} setIsEditing={setIsEditing} columns={columns1} initialRows={initialRows}  />


          </div>
          
          <div className='ModulesCard-Div'>
             {/* <ModelTable isEditing={isEditing} setIsEditing={setIsEditing} /> */}
             <ModelTable isEditing={isEditing} setIsEditing={setIsEditing} columns={columns2} initialRows={initialRows}  />


          </div>
       
      </div>
    </div>
  );
}