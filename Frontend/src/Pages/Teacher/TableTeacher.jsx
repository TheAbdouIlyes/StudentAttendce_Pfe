import React from "react";
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
  Modal,
  Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModulesEditor from "./ModulesEditor"
import EditTeacher from "./EditTeacher";

const columns = [
  { width: 80, label: "First Name", dataKey: "first_name" },
  { width: 100, label: "Last Name", dataKey: "last_name" },
  { width: 220, label: "Email", dataKey: "email" },
  { width: 200, label: "Modules", dataKey: "modules" },
  { width: 100, label: "", dataKey: "actions" }
];

export default function TableTeacher({ setRows,onAdd, rows, page, setPage, totalCount, rowsPerPage, handleDelete }) {
  const navigate = useNavigate();

   const [modalOpen, setModalOpen] = useState(false);
   const [modalOpen2, setModalOpen2] = useState(false);
   const [selectedTeacherId, setSelectedTeacherId] = useState(null);


  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };
  

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.dataKey}
                  sx={{ fontWeight: "bold", padding: "12px" }}
                  align="left"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.dataKey} align="left">
                    {column.dataKey === "actions" ? (
                      <>
                        <IconButton
                          sx={{ ml: 2, height: 30, width: 30 }}
                          // onClick={() => navigate(`editTeacher/${row.id}`)}
                          onClick={() => {
                            setSelectedTeacherId(row.id);
                            setModalOpen2(true);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          sx={{ height: 30, width: 30 }}
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this teacher?")) {
                              handleDelete(row.id);
                            }
                          }}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </>
                    ) : column.dataKey === "modules" ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span>{row[column.dataKey]}</span>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => {
                            setSelectedTeacherId(row.id);
                            setModalOpen(true);
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>

                      </div>
                    ) : (
                      row[column.dataKey]
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

       {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            // maxHeight: "80vh",
            // overflowY: "scroll",
          }}
        >
          {selectedTeacherId ? (
            <ModulesEditor teacherId={selectedTeacherId} onClose={() => setModalOpen(false)} onAdd={onAdd} />
          ) : (
            <p>Loading...</p>
          )}
        </Box>
      </Modal>


       {/* Modal */}
       <Modal open={modalOpen2} onClose={() => setModalOpen2(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
           
            borderRadius: 2,
            // maxHeight: "80vh",
            // overflowY: "auto",
           
          }}
        >
          {selectedTeacherId ? (
            <EditTeacher teacherId={selectedTeacherId} onClose={() => setModalOpen2(false)} onAdd={onAdd} />
          ) : (
            <p>Loading...</p>
          )}
        </Box>
      </Modal>



    </Paper>
  );
}
