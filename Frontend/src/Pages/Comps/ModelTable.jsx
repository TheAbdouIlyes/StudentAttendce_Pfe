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
  { width: 100, label: "Modules S 1 or 2", dataKey: "name" },
  { width: 50, label: "Coef", dataKey: "coef" },

];

const initialRows = [
  {id: 1, name: "tdg",coef:5 },
  { id: 2, name: "asd2",coef:5 },
  { id: 3, name: "logic",coef:5 },
  { id: 4, name: "maths" ,coef:5},
  { id: 5, name: "biology",coef:5 },
  { id: 6, name: "chemistry",coef:5 },
  { id: 7, name: "physics",coef:5 },
  { id: 8, name: "history",coef:5 },
  { id: 9, name: "english" ,coef:5},
  { id: 10, name: "french" ,coef:5},
  { id: 11, name: "spanish" ,coef:5},
  

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

export default function ModelTable({ isEditing }) {
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
                    sx={{ margin: "8px" }}
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
