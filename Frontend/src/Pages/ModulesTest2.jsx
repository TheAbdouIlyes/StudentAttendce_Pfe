import React from 'react';
import "./ModulesTest.css";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModelTable from './Comps/ModelTable';
import { useState,useEffect } from 'react';


const modules1 = ["System d'exploitation 2", "Algo", "Mathématiques"];
const modules2 = ["Physique", "Programmation", "Base de données", "Base de données", "Base de données", "Base de données", "Base de données", "Base de données", "Base de données", "Base de données", "Base de données"];

export default function Modulestest() {

  
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
          <Button variant="contained" startIcon={<ExitToAppIcon />} onClick={() => console.log("return clicked")}>
            Return
          </Button>

          
        </div>
        <h2>L1-info</h2>
        <div className='Buttons-side'>
          <Button variant="contained" startIcon={<AddIcon />}  onClick={handleAddStudent} >
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

            {/* <TableContainer component={Paper} className="ModulesTable">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className="sticky-header">Modules - S1</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {modules1.map((module, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{module}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer> */}

             <ModelTable isEditing={isEditing} setIsEditing={setIsEditing} />


          </div>
          
          <div className='ModulesCard-Div'>

            {/* <TableContainer component={Paper} className="ModulesTable">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className="sticky-header">Modules - S2</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {modules2.map((module, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{module}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer> */}


             <ModelTable isEditing={isEditing} setIsEditing={setIsEditing} />


          </div>
       
      </div>
    </div>
  );
}
