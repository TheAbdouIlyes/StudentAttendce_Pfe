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
  CircularProgress,
  Alert,
  Pagination,
  Checkbox,
  Button,
  Box,
  Typography
} from "@mui/material";
import ReturnButton from "../../comps/ReturnButton";

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
      .then(async (data) => {
        if (data.results) {
          const fetchedTeachers = data.results;

          // Set initial teachers
          setTeachers(fetchedTeachers);

          // Initialize selectedTeachers with false for all teachers
          const newSelected = {};

          // Check if the teacher is already assigned to the exam
          for (let teacher of fetchedTeachers) {
            try {
              // Check if the teacher is already assigned to the exam
              const response = await fetch(
                `http://127.0.0.1:8000/teacher/${teacher.matricul}/exam/${exam_name}`
              );
              if (response.ok) {
                const assignmentData = await response.json();
                newSelected[teacher.matricul] = assignmentData.is_present==true; // Assuming 'isAssigned' field in response
              } else {
                newSelected[teacher.matricul] = assignmentData.is_present==false; // Teacher is not assigned
              }
            } catch (error) {
              setError(`Error checking assignment for teacher ${teacher.matricul}: ${error}`);
              newSelected[teacher.matricul] = false; // Error occurred, treat it as not assigned
            }
          }

          setSelectedTeachers(newSelected);
          setTotalPages(Math.ceil(data.count / rowsPerPage));
        } else {
          throw new Error("Unexpected API response format");
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [exam_name]);

  useEffect(() => {
    fetchTeachers(page);
  }, [fetchTeachers, page]);

  const handleSelect = async (matricule) => {
    const isChecked = !selectedTeachers[matricule]; // Toggle current state

    // Update state with the new selection
    setSelectedTeachers((prev) => ({
      ...prev,
      [matricule]: isChecked,
    }));

    // If checked, send POST request
    if (isChecked) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/tea/${matricule}/exa/${exam_name}/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          setError(`Failed to assign teacher ${matricule}`);
        }
      } catch (error) {
        setError(`Error on POST request for ${matricule}: ${error}`);
      }
    } 
    // If unchecked, send DELETE request
    else {
      try {
        const response = await fetch(`http://127.0.0.1:8000/tea/${matricule}/exa/${exam_name}/not`, {
          method: "DELETE",
        });

        if (!response.ok) {
          setError(`Failed to unassign teacher ${matricule}`);
        }
      } catch (error) {
        setError(`Error on DELETE request for ${matricule}: ${error}`);
      }
    }
  };

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <Paper sx={{ width: "100%", padding: "20px" }}>

      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <ReturnButton/>
        <Typography variant="h5"><b>Available Teachers for {exam_name}</b></Typography>
        
      </Box>
      

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <TableContainer>
        {/* <Button
          variant="contained"
          color="success"
          onClick={handleGoBack}
          sx={{ marginTop: 2, display: "block", marginLeft: "auto", marginRight: "auto" }}
        >
          Go Back
        </Button> */}
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
                      checked={selectedTeachers[teacher.matricul] || false}  // Ensure state is reflected here
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
    </Paper>
  );
}
