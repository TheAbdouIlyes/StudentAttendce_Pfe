import React, { useState } from "react";
import "./ExamScheduleTable.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField
} from "@mui/material";

const modules = ["Math", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Computer Science", "Economics", "Law", "Philosophy", "Psychology"];
const places = ["Amphi A", "Amphi B", "Amphi C"];

const ExamScheduleTable = () => {
  const [year, setYear] = useState("L1");

  const [newDate, setNewDate] = useState("");

  const headers = [
    "Date",
    "8:00-9:30",
    "9:30-10:00",
    "10:00-11:30",
    "11:30-12:00",
    "12:00-13:30",
    "13:30-14:00",
    "14:00-15:30",
    "15:30-16:00",
  ];

  const [examData, setExamData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectingPlace, setSelectingPlace] = useState(false);

  const handleClick = (event, rowIndex, slotIndex) => {
    setAnchorEl(event.currentTarget);
    setSelectedCell({ rowIndex, slotIndex });
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedCell(null);
    setSelectingPlace(false);
  };

  const handleSelectModule = (module) => {
    setSelectingPlace(module);
  };

  const handleSelectPlace = (place) => {
    if (!selectedCell || !selectingPlace) return;
    const { rowIndex, slotIndex } = selectedCell;
    const updatedData = [...examData];
    updatedData[rowIndex].slots[slotIndex] = { module: selectingPlace, place };
    setExamData(updatedData);
    handleClose();
  };

  const handleRemoveModule = (rowIndex, slotIndex) => {
    const updatedData = [...examData];
    updatedData[rowIndex].slots[slotIndex] = { module: "", place: "" };
    setExamData(updatedData);
  };

  const handleResetTable = () => {
    if (window.confirm("Are you sure you want to clear the schedule?")) {
      setExamData([]);
    }
  };

  const handleAddDate = () => {
    if (!newDate) return;
    setExamData([...examData, { date: newDate, slots: Array(8).fill({ module: "", place: "" }) }]);
    setNewDate("");
  };

  return (
    <>
      <div className="TopExamsTable">
       

        <TextField 
          label="Add Date" 
          type="date" 
          InputLabelProps={{ shrink: true }} 
          value={newDate} 
          onChange={(e) => setNewDate(e.target.value)}
          sx={{height:5,padding:2}}
        />

        <div className="Exams-Buttons"> 
          <Button variant="contained" color="primary" onClick={()=>console.log("ultimate Test :",examData)}>test</Button>
          <Button variant="contained" color="primary" onClick={handleAddDate}>Add Date</Button>
          <Button variant="contained" color="secondary" onClick={handleResetTable}>Reset Schedule</Button>
        </div>
        
      </div>

      <TableContainer component={Paper} className="Examan-MainTable">
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} align="center">{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {examData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell align="center">{row.date}</TableCell>
                {row.slots.map((slot, slotIndex) => (
                  <TableCell
                    key={slotIndex}
                    align="center"
                    onClick={(event) => handleClick(event, rowIndex, slotIndex)}
                  >
                    {slot.module ? `${slot.module} (${slot.place})` : "-"}
                    {slot.module && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveModule(rowIndex, slotIndex);
                        }}
                        style={{ marginLeft: "5px", color: "red", cursor: "pointer" }}
                      >
                        ✖
                      </span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          {!selectingPlace ? (
            modules.map((module, index) => (
              <MenuItem key={index} onClick={() => handleSelectModule(module)}>
                {module}
              </MenuItem>
            ))
          ) : (
            places.map((place, index) => (
              <MenuItem key={index} onClick={() => handleSelectPlace(place)}>
                {place}
              </MenuItem>
            ))
          )}
        </Menu>
      </TableContainer>
    </>
  );
};

export default ExamScheduleTable;
