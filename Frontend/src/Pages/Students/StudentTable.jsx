import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Box,
  MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { width: 50, label: "ID", dataKey: "id" },
  { width: 120, label: "First Name", dataKey: "first_name" },
  { width: 240, label: "Last Name", dataKey: "last_name" },
  { width: 240, label: "Email", dataKey: "email" },
  { width: 120, label: "Speciality", dataKey: "speciality" },
  { width: 40, label: "Year", dataKey: "level" },
  { width: 80, label: "", dataKey: "actions" },
];

export default function StudentTable({
  students,
  page,
  setPage,
  totalCount,
  rowsPerPage,
  onDelete,
}) {
  const [open, setOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sync the incoming students with local state
  useEffect(() => {
    setStudentData(students);
  }, [students]);

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleEditClick = async (id) => {
    setOpen(true);
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/student/info/${id}`);
      const data = await res.json();
      setCurrentStudent(data);
    } catch (err) {
      setError("Failed to fetch student data.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCurrentStudent({
      ...currentStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/u_student/${currentStudent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentStudent),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      const updated = studentData.map((student) =>
        student.id === currentStudent.id ? currentStudent : student
      );
      setStudentData(updated);
      setOpen(false);
    } catch (err) {
      setError("Failed to update student.");
    }
  };

  return (
    <>
      <Paper sx={{ width: "100%", borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.dataKey} sx={{ fontWeight: "bold", padding: "12px" }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {studentData.map((student) => (
                <TableRow key={student.id}>
                  {columns.map((column) => (
                    <TableCell key={column.dataKey}>
                      {column.dataKey === "actions" ? (
                        <>
                          <IconButton
                            sx={{ height: 30, width: 30 }}
                            onClick={() => handleEditClick(student.id)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            sx={{ height: 30, width: 30 }}
                            onClick={() => {
                              if (window.confirm("Are you sure you want to delete this student?")) {
                                onDelete(student.id);
                              }
                            }}
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </>
                      ) : (
                        student[column.dataKey]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          rowsPerPageOptions={[]}
        />
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : currentStudent ? (
            <>
              <TextField
                fullWidth
                margin="normal"
                label="First Name"
                name="first_name"
                value={currentStudent.first_name}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Last Name"
                name="last_name"
                value={currentStudent.last_name}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                value={currentStudent.email}
                onChange={handleInputChange}
              />

                  <FormControl fullWidth margin="normal">
                  <InputLabel id="year-label">Year</InputLabel>
                  <Select
                    labelId="year-label"
                    id="year-select"
                    name="level"
                    value={currentStudent.level} // Ensure consistency between name and value binding
                    label="Year"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="l1">L1</MenuItem>
                    <MenuItem value="l2">L2</MenuItem>
                    <MenuItem value="l3">L3</MenuItem>
                    <MenuItem value="m1">M1</MenuItem>
                    <MenuItem value="m2">M2</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <InputLabel>Speciality</InputLabel>
                  <Select label="Speciality" name="speciality" value={currentStudent.speciality} onChange={handleInputChange}>
                    <MenuItem value="info">Info</MenuItem>
                    <MenuItem value="physic">Physic</MenuItem>
                    <MenuItem value="gestion">Gestion</MenuItem>
                    <MenuItem value="biology">Biology</MenuItem>
                    <MenuItem value="pharmacy">Pharmacy</MenuItem>
                    <MenuItem value="medicine">Medicine</MenuItem>
                  </Select>
                </FormControl>
                <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setOpen(false)}
                    sx={{ mt: 2,border:0 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={handleUpdate}
                    sx={{ mt: 2 }}
                  >
                    Save
                  </Button>
                </Box>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
