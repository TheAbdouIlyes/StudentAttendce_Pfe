import React from 'react'
import "./ListExams.css"
import ExamScheduleTable from './1-ExamScheduleTable'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useEffect ,useState} from'react';
import ReturnButton from '../../comps/ReturnButton';
import { Box,Button } from '@mui/material';


export default function ListExams() {

  const navigate = useNavigate();
  const { speciality, year,semester } = useParams();
  const validSpecialities = ["info", "physic", "gestion", "biology", "pharmacy", "medicine"];
  const validYears = ["L1", "L2", "L3", "M1", "M2"];
  const validsemester = ["S1", "S2"];

  const [addTeachers, setAddTeachers] = useState(false);
  

  useEffect(() => {
    if (!validSpecialities.includes(speciality) || !validYears.includes(year)||!validsemester.includes(semester)) {
      navigate("/"); // Redirect if parameters are invalid
    }
  }, [speciality, year, navigate]);

  


  return (
    <div className='Exams-Container'>

      <div className='TopExams'>
        <ReturnButton/>

         <Box sx={{ display: "flex", justifyContent: "end", marginBottom: "10px" }}>
            <Button
              variant="contained"
              color="info"
              onClick={() => setAddTeachers(!addTeachers)}
              sx={{ maxHeight: 40, ml: "10px" }}
            >
              {addTeachers ? "Cancel" : "Add Teachers"}
            </Button>
        </Box>

      </div>

      
      <div className='ExamsTable-Conatainer'>
        <ExamScheduleTable addTeachers={addTeachers}/>

      </div>

      <div className="LocationHelp">
        <h3>Current State: {speciality} {year} {semester}</h3>
      </div>
    </div>
  )
}
