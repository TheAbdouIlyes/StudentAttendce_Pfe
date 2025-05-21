import React, { useEffect, useState } from "react";
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
  Box,
  Chip,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import ReturnButton from "../comps/ReturnButton";
import { useTheme } from "@mui/material/styles";



const columns = [
  { width: 50, label: "ID", dataKey: "id" },
  { width: 120, label: "First Name", dataKey: "first_name" },
  { width: 180, label: "Last Name", dataKey: "last_name" },
  { width: 180, label: "Speciality", dataKey: "speciality" },
  { width: 120, label: "Year", dataKey: "level" },
  { width: 100, label: "Presence", dataKey: "is_present" },
];

export default function PresenceTable({
  showActions,
  students,
  page,
  setPage,
  totalCount,
  rowsPerPage,
  onDelete,
  examId,
}) {
  const navigate = useNavigate();
  const [examEnded, setExamEnded] = useState(false);
  
  
  // ✅ Fetch exam info using fetch API
  useEffect(() => {
    const fetchExamInfo = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/exam_time/${examId}`);
        if (!response.ok) throw new Error("Failed to fetch exam info");
        const data = await response.json();
            console.log(data)
        const examDateTime = new Date(`${data.date}T${data.time}`);
        const now = new Date();
        const fourHoursInMs = 4 * 60 * 60 * 1000;
        setExamEnded(now - examDateTime > fourHoursInMs);
      } catch (error) {
        console.error("Error fetching exam info:", error);
      }
    };

    fetchExamInfo();
  }, [examId]);

  const handlePageChange = (_, newPage) => {
    setPage(newPage + 1);
  };



  const handleDownloadCSV = async () => {
  try {
    let allStudents = [];
    let currentPage = 1;
    let total = 0;

    // Fetch first page to get total count
    const firstResponse = await fetch(`http://127.0.0.1:8000/student/subject/${examId}?page=${currentPage}`);
    if (!firstResponse.ok) throw new Error("Failed to fetch students");
    const firstData = await firstResponse.json();

    total = firstData.count;
    allStudents = allStudents.concat(firstData.results);
    const totalPages = Math.ceil(total / rowsPerPage);

    // Fetch remaining pages
    while (currentPage < totalPages) {
      currentPage++;
      const res = await fetch(`http://127.0.0.1:8000/student/subject/${examId}?page=${currentPage}`);
      if (!res.ok) throw new Error("Failed to fetch page " + currentPage);
      const data = await res.json();
      allStudents = allStudents.concat(data.results);
    }

    //console.log("All students:", allStudents);

    const headers = ["ID", "First Name", "Last Name", "Speciality", "Level", "Presence"];
    const rows = allStudents.map((student) => [
      student.id,
      student.first_name,
      student.last_name,
      student.speciality,
      student.level,
      !examEnded ? "Not yet" : student.is_present ? "Present" : "Absent",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `attendance_${examId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("CSV download error:", error);
  }

  
};


const theme = useTheme();

  return (

    <Box sx={{ width: "100%",borderRadius: 2 }}>

      <div style={{display:'flex',justifyContent:"space-between",width:"100%",marginBottom:"2%"}}>
        <ReturnButton/>
        <h1 className="StudentListTitle">Student List</h1>

        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          {/* <Button variant="outlined" onClick={handleDownloadCSV}>
            Download CSV
          </Button> */}
        </Box>

      </div>
    
    <Paper elevation={0} sx={{ width: "100%", borderRadius: 2 }}>
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
            {students.map((student) => (
              <TableRow key={student.id}>
                {columns.map((column) => (
                  <TableCell key={column.dataKey}>
                    {column.dataKey === "is_present" ? (
                      !examEnded ? (
                       <Chip align="center" sx={{ 
                        width:100,
                        color: theme.palette.text.secondary , 
                        // backgroundColor: item.is_persent ? "#cdf7c8" : "#f5e4e5",
                        fontWeight: "bold"}}
                        label="Not yet ..."/>
  
                        
                      ) : (
                          <Chip
                              label={student.is_present ? "✔ Present" : "✘ Absent"}
                              sx={{
                              width:100,
                              backgroundColor: student.is_present ? `${theme.palette.present.secondary}` : `${theme.palette.absent.secondary}`,
                              color: student.is_present ? `${theme.palette.present.main}` : `${theme.palette.absent.main}`,
                              fontWeight: "bold",
                              // border: item.is_persent ? "1px solid green" : "1px solid red"
                            }}
                            />
                      )
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
        page={page - 1}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[]}
      />
    </Paper>
    </Box>
  );
}
