import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const columns = [
  { width: 50, label: "ID", dataKey: "id" },
  { width: 100, label: "First Name", dataKey: "firstName" },
  { width: 150, label: "Last Name", dataKey: "lastName" },
  { width: 220, label: "Email", dataKey: "email" },
  { width: 200, label: "Modules", dataKey: "modules" },
];

const initialRows = [
  { id: 1, firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", modules: "Informatics" },
  { id: 2, firstName: "Bob", lastName: "Smith", email: "bob.smith@example.com", modules: "Biology"},
  { id: 3, firstName: "Charlie", lastName: "Brown", email: "charlie.brown@example.com", modules: "Medicine" },
  { id: 4, firstName: "David", lastName: "Williams", email: "david.williams@example.com", modules: "Informatics" },
  { id: 5, firstName: "Emma", lastName: "Davis", email: "emma.davis@example.com", modules: "Biology" },
  { id: 6, firstName: "Emma", lastName: "Davis", email: "emma.davis@example.com", modules: "Biology" },
  { id: 7, firstName: "Emma", lastName: "Davis", email: "emma.davis@example.com", modules: "Biology" },
  { id: 8, firstName: "Emma", lastName: "Davis", email: "emma.davis@example.com", modules: "Biology" },
  { id: 9, firstName: "Emma", lastName: "Davis", email: "emma.davis@example.com", modules: "Biology" },
  { id: 10, firstName: "Emma", lastName: "Davis", email: "emma.davis@example.com", modules: "Biology" },
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

export default function TableTeacher({ isEditing }) {
  const [rows, setRows] = React.useState(initialRows);
  const [editingCell, setEditingCell] = React.useState(null);
  const [editValue, setEditValue] = React.useState("");

  const handleEditClick = (rowIndex, columnKey, value) => {
    setEditingCell({ rowIndex, columnKey });
    setEditValue(value);
  };

  const handleEditChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleEditSave = () => {
    if (!editingCell) return;

    const updatedRows = [...rows];
    updatedRows[editingCell.rowIndex][editingCell.columnKey] = editValue;

    setRows(updatedRows);
    setEditingCell(null);
  };

  function rowContent(index, row) {
    return (
    
      <React.Fragment>
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
                  <IconButton
                    sx={{ margin: "8px" , mt: 0, mb: 0, pt: 0, pb: 0 ,height: 30 }
                  }
                    onClick={() => handleEditClick(index, column.dataKey, row[column.dataKey])}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                )}
              </>
            )}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  return (
    <Paper style={{ height: "100%", width: "100%", borderRadius: 0 }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
