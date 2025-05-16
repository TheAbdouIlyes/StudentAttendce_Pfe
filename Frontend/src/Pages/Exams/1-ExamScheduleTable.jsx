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
  MenuItem,
  Select,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from "@mui/material";
import Swal from "sweetalert2";

const ExamScheduleTable = () => {
  const navigate = useNavigate();
  const { speciality, year, semester } = useParams();
  const [examData, setExamData] = useState([]);
  const [editedData, setEditedData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const theme = useTheme();

  const timeOptions = [
    "08:00", "09:30", "10:00", "11:30", "12:00", "13:30", "14:00", "15:30"
  ];

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/exam_list/${year}/${speciality}/${semester}`)
      .then((response) => response.json())
      .then((data) => {
        setExamData(data.results);
        setEditedData(data.results);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [year, speciality, semester]);

  const handleDialogOpen = (exam) => {
    setSelectedExam({ ...exam });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedExam(null);
  };

  const handleDialogChange = (field, value) => {
    setSelectedExam(prev => ({ ...prev, [field]: value }));
  };

  const handleDialogSave = () => {
    fetch(`http://127.0.0.1:8000/exam/update/${selectedExam.id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: selectedExam.subject,
        date: selectedExam.date,
        amphi: selectedExam.amphi,
        time: selectedExam.time,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update");
        return response.json();
      })
      .then(() => {
        const updated = examData.map((item) =>
          item.id === selectedExam.id ? selectedExam : item
        );
        setExamData(updated);
        setEditedData(updated);
        handleDialogClose();

        // SweetAlert2 success toast
        Swal.fire({
          icon: "success",
          title: "Exam updated successfully!",
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        console.error("Error updating data:", error);

        // SweetAlert2 error toast
        Swal.fire({
          icon: "error",
          title: "Failed to update exam!",
          text: error.message,
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      });
  };

  return (
    <Box sx={{ m: 0, p: 0 }}>
      <TableContainer elevation={0} component={Paper} className="Examan-MainTable">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bolder" }}>Date</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bolder" }}>Exam</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bolder" }}>Place</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bolder" }}>Time</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bolder" }}>QR State</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bolder" }}>Surveillance</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bolder" }}>Edit</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bolder" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examData.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">{row.subject_name}</TableCell>
                <TableCell align="left">{row.amphi}</TableCell>
                <TableCell align="left">{row.time}</TableCell>

                <TableCell align="center">
                  {(() => {
                    const examDateTime = new Date(`${row.date}T${row.time}`);
                    const now = new Date();
                    const fourHoursInMs = 4 * 60 * 60 * 1000;

                    if (now - examDateTime > fourHoursInMs) {
                      return (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          Swal.fire({
                            icon: 'warning',
                            title: "Exam ended",
                            text: "You can't scan QR code now.",
                            toast: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                          });
                        }}
                      >
                        Ended
                      </Button>

                      );
                    } else {
                      return (
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={() =>
                            navigate(`${row.subject_name}/qr-scanner`, {
                              state: { module: row.subject_name },
                            })
                          }
                        >
                          Scan QR
                        </Button>
                      );
                    }
                  })()}
                </TableCell>

                <TableCell align="center">
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="body2">{row.teacher_count}</Typography>
                    <Button
                      sx={{ width: "30px", height: "30px" }}
                      variant="outlined"
                      color="primary"
                      onClick={() => navigate(`${row.subject_name}/SerTeacher/`)}
                    >
                      +
                    </Button>
                  </Box>
                </TableCell>

                <TableCell align="center">
                  <IconButton onClick={() => handleDialogOpen(row)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>

                <TableCell align="right">
                  <Button
                    color="success"
                    variant="outlined"
                    onClick={() => navigate(`${row.id}/presence`)}
                    startIcon={<ArrowForwardIcon />}
                  >
                    View Exam
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for editing exam */}
      {selectedExam && (
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          PaperProps={{
            elevation: 0,
            sx: {
              boxShadow: "none",
              border: "1px solid #ccc",
              padding: 3,
            },
          }}
        >
          <DialogTitle>Edit <b>"{selectedExam.subject_name}"</b> Exam</DialogTitle>
          <DialogContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: "300px" }}
          >
            <TextField
              sx={{ mt: 1 }}
              label="Date"
              type="date"
              value={selectedExam.date}
              onChange={(e) => handleDialogChange("date", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Place"
              value={selectedExam.amphi}
              onChange={(e) => handleDialogChange("amphi", e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="time-label">Time</InputLabel>
              <Select
                labelId="time-label"
                value={selectedExam.time}
                label="Time"
                onChange={(e) => handleDialogChange("time", e.target.value)}
              >
                {timeOptions.map((time) => (
                  <MenuItem key={time} value={time}>{time}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDialogSave} variant="contained" color="info">Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ExamScheduleTable;
