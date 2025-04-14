import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";


const TeacherSurveillanceTable = ({ exams }) => {
    const navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ maxWidth: "80%", margin: "auto", mt: 3, p: 2 }}>
      {exams.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>Date</strong></TableCell>
              <TableCell align="center"><strong>Time</strong></TableCell>
              <TableCell align="center"><strong>Module</strong></TableCell>
              <TableCell align="center"><strong>Place</strong></TableCell>
              <TableCell align="center"><strong>Qr-Code</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((exam, index) => (
              <TableRow key={index}>
                <TableCell align="center">{exam.date}</TableCell>
                <TableCell align="center">{exam.time}</TableCell>
                <TableCell align="center">{exam.subject_name}</TableCell>
                <TableCell align="center">{exam.amphi}</TableCell>
                <TableCell align="center">
                        <Button
                          color="primary"
                          onClick={() =>
                            navigate(`${row.subject_name}/qr-scanner`, {
                              state: { module: row.subject_name },
                            })
                          }
                        >
                          Scan QR
                        </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 2, color: "gray" }}>
          No scheduled exams.
        </Typography>
      )}
    </TableContainer>
  );
};

export default TeacherSurveillanceTable;
