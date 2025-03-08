import React from 'react'
import "./ListExams.css"
import ExamScheduleTable from './Comps/1-ExamScheduleTable'
export default function ListExams() {
  return (
    <div className='Exams-Container'>
      <div>
        <ExamScheduleTable/>
      </div>
    </div>
  )
}
