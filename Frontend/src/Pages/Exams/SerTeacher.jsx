import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Pagination,
  Checkbox,
} from "@mui/material";

export default function SerTeacher() {
  const { exam_name } = useParams();
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 5;

  const fetchTeachers = useCallback((pageNumber = 1) => {
    setLoading(true);
    setError(null);

    fetch(`http://127.0.0.1:8000/Teacher_list/?page=${pageNumber}&page_size=${rowsPerPage}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch teachers");
        return response.json();
      })
      .then((data) => {
        if (data.results) {
          setTeachers(data.results);
          setTotalPages(Math.ceil(data.count / rowsPerPage));
        } else {
          throw new Error("Unexpected API response format");
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchTeachers(page);
  }, [fetchTeachers, page]);

  // ✅ Ensures state updates correctly
  const handleSelect = (matricule) => {
    setSelectedTeachers((prev) => {
      const newState = { ...prev, [matricule]: !prev[matricule] };
      console.log("Updated selection:", newState); // Debugging log
      return newState;
    });
  };

  async function handleSubmit() {
    const selectedMatricules = Object.keys(selectedTeachers).filter((matricule) => selectedTeachers[matricule]);

    if (selectedMatricules.length === 0) {
      setError("No teachers selected!");
      return;
    }

    let successCount = 0;
    let failedMatricules = [];

    for (const matricule of selectedMatricules) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/tea/${matricule}/exa/${exam_name}/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          failedMatricules.push(matricule);
        } else {
          successCount++;
        }
      } catch (error) {
        console.error(`Error in assigning teacher ${matricule}:`, error);
        failedMatricules.push(matricule);
      }
    }

    if (failedMatricules.length > 0) {
      setError(`Failed to assign: ${failedMatricules.join(", ")}`);
    }

    if (successCount > 0) {
      console.log("Teachers assigned successfully!");
      navigate(-1);
    }
  }

  return (
    <Paper sx={{ width: "80%", margin: "20px auto", padding: "20px" }}>
      <h2>Available Teachers for {exam_name}</h2>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <TableRow key={teacher.matricul}>
                  <TableCell>
                    <Checkbox
                      checked={!!selectedTeachers[teacher.matricul]}
                      onChange={() => handleSelect(teacher.matricul)}
                    />
                  </TableCell>
                  <TableCell>{teacher.matricul}</TableCell>
                  <TableCell>{teacher.first_name}</TableCell>
                  <TableCell>{teacher.last_name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                </TableRow>
              ))
            ) : (
              !loading && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No teachers available.
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />

      <Button
        variant="contained"
        color="success"
        onClick={handleSubmit} // ✅ Submits selected teachers
        sx={{ marginTop: 2, display: "block", marginLeft: "auto", marginRight: "auto" }}
      >
        Submit & Go Back
      </Button>
    </Paper>
  );
}
