import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ExamScheduleTable.css";
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
} from "@mui/material";

const ExamScheduleTable = () => {
  const navigate = useNavigate();
  const { speciality, year, semester } = useParams();
  const [examData, setExamData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState([]);
  const [showQrColumn, setShowQrColumn] = useState(false);
  const [addTeachers, setAddTeachers] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/exam_list/${year}/${speciality}/${semester}`)
      .then((response) => response.json())
      .then((data) => {
        setExamData(data.results);
        setEditedData(data.results);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [year, speciality, semester]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    editedData.forEach((exam) => {
      fetch(`http://127.0.0.1:8000/exam/update/${exam.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: exam.subject,
          date: exam.date,
          amphi: exam.amphi,
          time: exam.time,
        }),
      })
        .then((response) => response.json())
        .catch((error) => console.error("Error updating data:", error));
    });

    setExamData(editedData);
    setEditing(false);
  };

  const handleChange = (index, field, value) => {
    const updatedExams = [...editedData];
    updatedExams[index][field] = value;
    setEditedData(updatedExams);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <Button
          variant="contained"
          color={editing ? "primary" : "secondary"}
          onClick={editing ? handleSave : handleEdit}
          style={{ marginRight: "10px" }}
        >
          {editing ? "Save" : "Edit"}
        </Button>

        <Button
          variant="contained"
          color="info"
          onClick={() => setShowQrColumn(!showQrColumn)}
        >
          {showQrColumn ? "Hide QR Scanner" : "Show QR Scanner"}
        </Button>

        <Button
          variant="contained"
          color="info"
          onClick={() => setAddTeachers(!addTeachers)}
        >
          {addTeachers ? "Cancel" : "Add Teachers"}
        </Button>
      </div>

      <TableContainer component={Paper} className="Examan-MainTable">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Exam</TableCell>
              <TableCell align="center">Place</TableCell>
              <TableCell align="center">Time</TableCell>
              {showQrColumn && <TableCell align="center">QR Scan</TableCell>}
              {addTeachers && <TableCell align="center">Add Teacher</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {examData.map((row, index) => (
              <TableRow key={index}>
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

                <TableCell align="center">{row.subject_name}</TableCell>

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

                <TableCell align="center">
                  {editing ? (
                    <TextField
                      type="time"
                      value={editedData[index].time}
                      onChange={(e) => handleChange(index, "time", e.target.value)}
                    />
                  ) : (
                    formatTime(row.time)
                  )}
                </TableCell>

                {showQrColumn && (
                  <TableCell align="center">
                    <Button
                      color="primary"
                      onClick={() =>
                        navigate(`${row.subject_name}/qr-scanner`, { state: { module: row.subject_name } })
                      }
                    >
                      Scan QR
                    </Button>
                  </TableCell>
                )}

                {addTeachers && (
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        navigate(`${row.subject_name}/SerTeacher/`)
                      }
                    >
                      +
                    </Button>
                  </TableCell>
                )}

                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => navigate(`${row.id}/presence`)}
                  >
                    View Exam
                  </Button>
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
