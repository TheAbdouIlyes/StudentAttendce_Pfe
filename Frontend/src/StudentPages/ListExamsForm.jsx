import React from "react";
import ExamScheduleTable from "../Pages/Comps/TestExams";

const headers = [
  "Date",
  "8:00-9:30",
  "9:30-10:00",
  "10:00-11:30",
  "11:30-12:00",
  "12:00-13:30",
  "13:30-14:00",
  "14:00-15:30",
  "15:30-16:00",
];

const examData = [
  { module: "Math", date: "2022/12/30", time: "8:00-9:30", place: "Amphi A" },
  { module: "Physics", date: "2022/12/30", time: "10:00-11:30", place: "Amphi B" },
  { module: "Biology", date: "2022/12/31", time: "12:00-13:30", place: "Amphi C" },
  { module: "English", date: "2022/12/31", time: "14:00-15:30", place: "Amphi A" },
  { module: "English123", date: "2028/12/31", time: "8:00-9:30", place: "Amphi A" },
  { module: "jjsjds", date: "2028/12/31", time: "10:00-11:30", place: "Amphi B" },
];

export default function ListExamsForm() {
  return (
    <div className="Exams-Container">
      <ExamScheduleTable examData={examData} headers={headers} />
    </div>
  );
}
