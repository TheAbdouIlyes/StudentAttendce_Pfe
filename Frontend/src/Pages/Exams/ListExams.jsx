import React from 'react'
import "./ListExams.css"
import ExamScheduleTable from './1-ExamScheduleTable'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useEffect ,useState} from'react';
import ReturnButton from '../../comps/ReturnButton';

export default function ListExams() {

  const navigate = useNavigate();
  const { speciality, year,semester } = useParams();
  const validSpecialities = ["info", "physic", "gestion", "biology", "pharmacy", "medicine"];
  const validYears = ["L1", "L2", "L3", "M1", "M2"];
  const validsemester = ["S1", "S2"];

  useEffect(() => {
    if (!validSpecialities.includes(speciality) || !validYears.includes(year)||!validsemester.includes(semester)) {
      navigate("/"); // Redirect if parameters are invalid
    }
  }, [speciality, year, navigate]);

  


  return (
    <div className='Exams-Container'>

      <div className='TopExams'>
        <ReturnButton/>
        <h1>{speciality} {year} {semester}</h1>


      </div>

      
      <div className='ExamsTable-Conatainer'>
        <ExamScheduleTable/>

      </div>
    </div>
  )
}
