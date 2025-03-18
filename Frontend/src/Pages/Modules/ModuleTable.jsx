import * as React from "react"; // Import React library
import Table from "@mui/material/Table"; // Import Table component from Material-UI
import TableBody from "@mui/material/TableBody"; // Import TableBody component from Material-UI
import TableCell from "@mui/material/TableCell"; // Import TableCell component from Material-UI
import TableContainer from "@mui/material/TableContainer"; // Import TableContainer component from Material-UI
import TableHead from "@mui/material/TableHead"; // Import TableHead component from Material-UI
import TableRow from "@mui/material/TableRow"; // Import TableRow component from Material-UI
import Paper from "@mui/material/Paper"; // Import Paper component from Material-UI
import { TableVirtuoso } from "react-virtuoso"; // Import TableVirtuoso component for virtualized tables
import { IconButton, TextField } from "@mui/material"; // Import IconButton and TextField components from Material-UI
import EditIcon from "@mui/icons-material/Edit"; // Import EditIcon from Material-UI icons

// Define custom components for TableVirtuoso with virtualized scrolling
const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: "separate", tableLayout: "fixed" }} />
  ),
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow, // Default TableRow component
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

// Define the main ModulelTable component
export default function ModulelTable({ isEditing, columns = [], initialRows = [] }) {
  const [rows, setRows] = React.useState(initialRows); // State to manage table rows
  const [editingCell, setEditingCell] = React.useState(null); // Track the currently edited cell
  const [editValue, setEditValue] = React.useState(""); // Store the value of the cell being edited

  // Function to handle the edit button click
  const handleEditClick = (rowIndex, columnKey, value) => {
    setEditingCell({ rowIndex, columnKey }); // Set the editing cell
    setEditValue(value); // Set the initial value for editing
  };

  // Function to handle input changes during editing
  const handleEditChange = (event) => {
    setEditValue(event.target.value); // Update editValue state
  };

  // Function to save the edited value
  const handleEditSave = () => {
    if (!editingCell) return; // If no cell is being edited, exit function
    const updatedRows = [...rows]; // Clone rows array
    updatedRows[editingCell.rowIndex][editingCell.columnKey] = editValue; // Update specific cell
    setRows(updatedRows); // Update state with new row data
    setEditingCell(null); // Reset editing state
  };

  // Function to render the table header
  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey} // Unique key for each column
            variant="head" // Header cell styling
            align="left" // Align text to the left
            style={{ width: column.width }} // Set column width
            sx={{ backgroundColor: "background.paper", fontWeight: "bold" }} // Custom styles
          >
            {column.label} {/* Display the column label */}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  // Function to render the content of each row
  function rowContent(index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell key={`${index}-${column.dataKey}`} align="left">
            {editingCell &&
            editingCell.rowIndex === index &&
            editingCell.columnKey === column.dataKey ? (
              <TextField
                value={editValue} // Current value of the input field
                onChange={handleEditChange} // Handle input change
                onBlur={handleEditSave} // Save on blur
                onKeyDown={(e) => e.key === "Enter" && handleEditSave()} // Save on Enter key press
                autoFocus // Auto-focus the input field
                size="small" // Small input field
                variant="standard" // Standard input field
              />
            ) : (
              <>
                {row[column.dataKey]} {/* Display cell value */}
                {isEditing && column.dataKey !== "id" && (
                  // Show edit button if editing is enabled and column is not "id"
                  <IconButton
                    sx={{ margin: "8px" }}
                    onClick={() => handleEditClick(index, column.dataKey, row[column.dataKey])}
                  >
                    <EditIcon fontSize="small" /> {/* Edit icon */}
                  </IconButton>
                )}
              </>
            )}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  // Render the table component
  return (
    <Paper style={{ height: "100%", width: "100%", borderRadius: 0 }}>
      <TableVirtuoso
        data={rows} // Pass rows data
        components={VirtuosoTableComponents} // Use custom components
        fixedHeaderContent={fixedHeaderContent} // Render fixed header
        itemContent={rowContent} // Render each row's content
      />
    </Paper>
  );
}
