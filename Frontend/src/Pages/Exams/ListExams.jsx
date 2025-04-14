import React from 'react'
import "./ListExams.css"
import ExamScheduleTable from './1-ExamScheduleTable'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useEffect ,useState} from'react';
import ReturnButton from '../../comps/ReturnButton';
import { Box,Button,FormControl,Typography,RadioGroup,FormControlLabel,Radio } from '@mui/material';


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

  const [s, setS] = useState(semester);

  const HandleSChange=(e)=>{
    setS(e);
    navigate(`/MenuExams/${speciality}/${year}/${e}`)
    
  }


  return (
    <div className='Exams-Container'>

      <div className='TopExams'>
        <ReturnButton/>

        <Typography variant="h6" >{speciality} {year} {semester} Exams Table</Typography>
       

        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <Typography variant="h9">Select Semester</Typography>
          <RadioGroup row value={s} onChange={(e) => HandleSChange(e.target.value)}>
            {["S1", "S2"].map((sem) => (
              <FormControlLabel key={sem} value={sem} control={<Radio color="primary" />} label={sem} />
            ))}
          </RadioGroup>
        </FormControl>


      </div>

      
      <div className='ExamsTable-Conatainer'>
        <ExamScheduleTable />

      </div>

      {/* <div className="LocationHelp">
        <h3>Current State: {speciality} {year} {semester}</h3>
      </div> */}
    </div>
  )
}
