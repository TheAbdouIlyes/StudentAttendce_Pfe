import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { IconButton, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const columns = [
  { width: 50, label: "ID", dataKey: "id" },
  { width: 140, label: "Matricule", dataKey: "matricule" },
  { width: 140, label: "First Name", dataKey: "firstName" },
  { width: 230, label: "Last Name", dataKey: "lastName" },
  { width: 180, label: "Examan", dataKey: "examan" },
  { width: 120, label: "Presence", dataKey: "presence" },
];

const initialRows = [
  { id: 1, matricule: 202212345, firstName: "Alice", lastName: "Johnson", examan: "Maths", presence: "Present" },
  { id: 2, matricule: 202267890, firstName: "Bob", lastName: "Smith", examan: "Science", presence: "Absent" },
  { id: 3, matricule: 202212345, firstName: "Charlie", lastName: "Brown", examan: "English", presence: "Present" },
  { id: 4, matricule: 202212345, firstName: "David", lastName: "Williams", examan: "Maths", presence: "Present" },
  { id: 5, matricule: 202267890, firstName: "Emma", lastName: "Davis", examan: "Science", presence: "Absent" },
  { id: 6, matricule: 202212345, firstName: "Grace", lastName: "Lee", examan: "History", presence: "Absent" },
  // Add more rows as needed
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
  Table: (props) => <Table {...props} sx={{ borderCollapse: "separate", tableLayout: "fixed" }} />,
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell key={column.dataKey} variant="head" align="left" style={{ width: column.width }} sx={{ backgroundColor: "background.paper", fontWeight: "bold" }}>
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default function ReactVirtualizedTable({ isEditing, students, setStudents }) {
  const [editingCell, setEditingCell] = React.useState(null);
  const [editValue, setEditValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(0);
  const rowsPerPage = 5; // Number of rows per page

  const handleEditClick = (rowIndex, columnKey, value) => {
    setEditingCell({ rowIndex, columnKey });
    setEditValue(value);
  };

  const handleEditChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleEditSave = () => {
    if (!editingCell) return;

    const updatedRows = [...students]; // Use students, not rows
    updatedRows[editingCell.rowIndex][editingCell.columnKey] = editValue;

    setStudents(updatedRows); // Update parent state
    setEditingCell(null);
  };

  // Pagination Logic
  const startIndex = currentPage * rowsPerPage;
  const currentPageRows = students.slice(startIndex, startIndex + rowsPerPage);

  const handleNextPage = () => {
    if (startIndex + rowsPerPage < students.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  function rowContent(index, row) {
    return (
      <>
        {columns.map((column) => (
          <TableCell key={column.dataKey} align="left">
            {editingCell && editingCell.rowIndex === index && editingCell.columnKey === column.dataKey ? (
              <TextField
                value={editValue}
                onChange={handleEditChange}
                onBlur={handleEditSave}
                onKeyDown={(e) => e.key === "Enter" && handleEditSave()}
                autoFocus
                size="small"
                variant="standard"
              />
            ) : (
              <>
                {row[column.dataKey]}
                {isEditing && column.dataKey !== "id" && (
                  <IconButton sx={{ margin: "8px", mt: 0, mb: 0, pt: 0, pb: 0, height: 30 }} onClick={() => handleEditClick(index, column.dataKey, row[column.dataKey])}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                )}
              </>
            )}
          </TableCell>
        ))}
      </>
    );
  }

  return (
    <Paper style={{ height: "100%", width: "100%", borderRadius: 0 }}>
      <TableVirtuoso data={currentPageRows} components={VirtuosoTableComponents} fixedHeaderContent={fixedHeaderContent} itemContent={rowContent} />

      {/* Pagination Controls */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <Button onClick={handlePrevPage} disabled={currentPage === 0}>
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={startIndex + rowsPerPage >= students.length}
        >
          Next
        </Button>
      </div>
    </Paper>
  );
}
