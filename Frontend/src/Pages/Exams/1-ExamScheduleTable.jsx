import React, { useState, useEffect } from "react";  // Import React and necessary hooks
import { useParams } from "react-router-dom";  // Import useParams to get URL parameters
import "./ExamScheduleTable.css";  // Import CSS file for styling
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";  // Import Material UI components for styling

// Define the ExamScheduleTable component
const ExamScheduleTable = () => {
  // Get the speciality, year, and semester from the URL using useParams
  const { speciality, year, semester } = useParams();

  // State variables
  const [examData, setExamData] = useState([]); // Stores fetched exam data
  const [editing, setEditing] = useState(false); // Toggle between edit and view mode
  const [editedData, setEditedData] = useState([]); // Stores modified exam data

  // Fetch exam data from the backend when the component mounts or URL parameters change
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/exam_list/${year}/${speciality}/${semester}`)
      .then((response) => response.json()) // Convert response to JSON
      .then((data) => {
        setExamData(data); // Store the fetched data
        setEditedData(data); // Initialize edited data with fetched data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [year, speciality, semester]); // Dependencies ensure re-fetching when these values change

  // Function to enable edit mode
  const handleEdit = () => {
    setEditing(true);
  };

  console.log("exams data", examData);

  // Function to save edited data and send updates to the backend
  const handleSave = () => {
    editedData.forEach((exam) => {
      fetch(`http://127.0.0.1:8000/exam/update/${exam.id}/`, {
        method: "PUT", // Use PUT to update data
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: exam.subject, // Keep the same subject
          date: exam.date, // Updated date
          amphi: exam.amphi, // Updated place
          time: exam.time, // Updated time
        }),
      })
        .then((response) => response.json()) // Convert response to JSON
        .catch((error) => console.error("Error updating data:", error));
    });

    setExamData(editedData); // Update exam data with modified values
    setEditing(false); // Exit edit mode
  };

  // Function to handle input changes while editing
  const handleChange = (index, field, value) => {
    const updatedExams = [...editedData]; // Create a copy of the edited data
    updatedExams[index][field] = value; // Update the specific field in the selected exam
    setEditedData(updatedExams); // Update the state with modified data
  };

  // Function to format time as hh:mm
  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":"); // Extract hours and minutes
    return `${hours}:${minutes}`; // Ensure hh:mm format
  };

  return (
    <>
      {/* Button to toggle between Edit and Save modes */}
      <Button
        variant="contained"
        color={editing ? "primary" : "secondary"}
        onClick={editing ? handleSave : handleEdit}
      >
        {editing ? "Save" : "Edit"}
      </Button>

      {/* Table Container with Material UI styles */}
      <TableContainer component={Paper} className="Examan-MainTable">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Exam</TableCell>
              <TableCell align="center">Place</TableCell>
              <TableCell align="center">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examData.map((row, index) => (
              <TableRow key={index}>
                {/* Date Column: Editable when in edit mode */}
                <TableCell align="center">
                  {editing ? (
                    <TextField
                      type="date"
                      value={editedData[index].date}
                      onChange={(e) => handleChange(index, "date", e.target.value)}
                    />
                  ) : (
                    row.date
                  )}
                </TableCell>

                {/* Exam Column: Displays subject name */}
                <TableCell align="center">{row.subject_name}</TableCell>

                {/* Place Column: Editable when in edit mode */}
                <TableCell align="center">
                  {editing ? (
                    <TextField
                      value={editedData[index].amphi}
                      onChange={(e) => handleChange(index, "amphi", e.target.value)}
                    />
                  ) : (
                    row.amphi
                  )}
                </TableCell>

                {/* Time Column: Editable when in edit mode */}
                <TableCell align="center">
                  {editing ? (
                    <TextField
                      type="time"
                      value={editedData[index].time}
                      onChange={(e) => handleChange(index, "time", e.target.value)}
                    />
                  ) : (
                    formatTime(row.time) // Ensure hh:mm format when displaying
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ExamScheduleTable;
