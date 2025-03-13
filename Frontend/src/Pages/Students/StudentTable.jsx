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

const columns = [
  { width: 50, label: "ID", dataKey: "id" },
  { width: 100, label: "First Name", dataKey: "firstName" },
  { width: 150, label: "Last Name", dataKey: "lastName" },
  { width: 220, label: "Email", dataKey: "email" },
  // { width: 220, label: "Matricule", dataKey: "matricule" },
  { width: 80, label: "Year of Study", dataKey: "yearOfStudy" }
];

const VirtuosoTableComponents = {
  Scroller: forwardRef((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
  Table: (props) => <Table {...props} sx={{ borderCollapse: "separate", tableLayout: "fixed" }} />,
  TableHead: forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: forwardRef((props, ref) => <TableBody {...props} ref={ref} />)
};

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

export default function StudentTable({ students, filterType, filterValue, onRowClick, selectedStudentId }) {
  const [filteredRows, setFilteredRows] = useState(students);

  useEffect(() => {
    setFilteredRows(
      filterType && filterValue
        ? students.filter((row) => row[filterType] === filterValue)
        : students
    );
  }, [filterType, filterValue, students]);

  const RowContent = (index, row) => (
    <TableRow
      key={row.id}
      onClick={() => onRowClick(row.id)}
      selected={selectedStudentId === row.id}
      sx={{ cursor: "pointer", backgroundColor: selectedStudentId === row.id ? "#f0f0f0" : "inherit" }}
    >
      {columns.map((column) => (
        <TableCell key={column.dataKey} align="left">
          {row[column.dataKey]}
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <Paper style={{ height: "100%", width: "100%", borderRadius: 0 }}>
      <TableVirtuoso
        data={filteredRows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={FixedHeaderContent}
        itemContent={RowContent}
      />
    </Paper>
  );
}
