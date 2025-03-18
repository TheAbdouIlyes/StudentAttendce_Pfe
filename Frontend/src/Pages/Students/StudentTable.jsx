// StudentTable.jsx
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

export default function StudentTable({ students, navigate, onDelete ,showActions}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Speciality</TableCell>
            <TableCell>Year</TableCell>
            {showActions && <TableCell>Actions</TableCell>} {/* Hide header when showActions is false */}
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.speciality}</TableCell>
              <TableCell>{student.yearOfStudy}</TableCell>
              {showActions && (
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => navigate(`./edit-student/${student.id}`)}>
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "10px" }}
                    onClick={() => onDelete(student.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
