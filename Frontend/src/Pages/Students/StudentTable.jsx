import React, { useState, useEffect, forwardRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { TableVirtuoso } from "react-virtuoso";

// Define columns for the student table with adjusted percentage widths
const columns = [
  { width: 100, label: "ID", dataKey: "id" },
  { width: 200, label: "First Name", dataKey: "firstName" },
  { width: 200, label: "Last Name", dataKey: "lastName" },
  { width: 400, label: "Email", dataKey: "email" },
  { width: 100, label: "Year of Study", dataKey: "yearOfStudy" }
];

// Define custom components for TableVirtuoso
const VirtuosoTableComponents = {
  Scroller: forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed", width: "100%" }}
    />
  ),
  TableHead: forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: forwardRef((props, ref) => <TableBody {...props} ref={ref} />)
};

// Function to render the table header
const FixedHeaderContent = () => (
  <TableRow>
    {columns.map((column) => (
      <TableCell
        key={column.dataKey}
        variant="head"
        align="left"
        style={{ width: column.width }}
        sx={{ backgroundColor: "background.paper", fontWeight: "bold" }}
      >
        {column.label}
      </TableCell>
    ))}
  </TableRow>
);

// Define the main StudentTable component
export default function StudentTable({ students, filterType, filterValue, onRowClick, selectedStudentId }) {
  const [filteredRows, setFilteredRows] = useState(students);

  // Effect to update filtered rows based on the selected filter
  useEffect(() => {
    setFilteredRows(
      filterType && filterValue
        ? students.filter((row) => row[filterType] === filterValue)
        : students
    );
  }, [filterType, filterValue, students]);

  // Function to render each row's content
  const RowContent = (index, row) => (
    <TableRow
      key={row.id}
      onClick={() => onRowClick(row.id)}
      selected={selectedStudentId === row.id}
      sx={{ cursor: "pointer", backgroundColor: selectedStudentId === row.id ? "#f0f0f0" : "inherit" }}
    >
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align="left"
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </TableRow>
  );

  // Render the table component
  return (
    <Paper style={{ height: "100%", width: "100%", borderRadius: 0 }}>
      <TableVirtuoso
        data={filteredRows} // Pass filtered student data
        components={VirtuosoTableComponents} // Use custom components
        fixedHeaderContent={FixedHeaderContent} // Render fixed header
        itemContent={RowContent} // Render each row
        style={{ width: "100%" }} // Ensure TableVirtuoso takes full width
      />
    </Paper>
  );
}