import React, { useState } from "react";
import "./ExamScheduleTable.css"
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
} from "@mui/material";

const modules = ["Math", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Computer Science", "Economics", "Law", "Philosophy", "Psychology"];
const places = ["Amphi A", "Amphi B", "Amphi C"];




const ExamScheduleTable = () => {
  
  const [year, setYear] = useState("L1");
  const [semester, setSemester] = useState("S1");


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

  const initialData = [
    { date: "2022/12/30", slots: Array(8).fill({ module: "", place: "" }) },
    { date: "2022/12/31", slots: Array(8).fill({ module: "", place: "" }) },
    { date: "2023/01/01", slots: Array(8).fill({ module: "", place: "" }) },
    { date: "2023/01/02", slots: Array(8).fill({ module: "", place: "" }) },
    { date: "2023/01/03", slots: Array(8).fill({ module: "", place: "" }) },
    { date: "2023/01/05", slots: Array(8).fill({ module: "", place: "" }) },
    { date: "2023/01/10", slots: Array(8).fill({ module: "", place: "" }) },
  ];

  const [examData, setExamData] = useState(initialData);
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
    const moduleAlreadyScheduled = examData.some(row => 
      row.slots.some(slot => slot.module === module)
    );

    if (moduleAlreadyScheduled) {
      alert("This module is already scheduled on another day!");
      return;
    }

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
      setExamData(initialData);
    }
  };


  const getSelectedExams = () => {
    const selectedExams = examData.flatMap((row) =>
      row.slots
        .filter((slot) => slot.module) // Only include non-empty slots
        .map((slot) => ({
          date: row.date,
          module: slot.module,
          place: slot.place,
        }))
    );
    console.log(selectedExams);
    return selectedExams;
  };
  

  return (
    <>
      <div className="TopExams">


      <FormControl component="fieldset" 
      // sx={{ margin: "10px" }}
      >
        <FormLabel component="legend">Select Year</FormLabel>
        <RadioGroup row value={year} onChange={(e) => setYear(e.target.value)}>
          {["L1", "L2", "L3", "M1", "M2"].map((level) => (
            <FormControlLabel key={level} value={level} control={<Radio />} label={level} />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" 
      // sx={{ margin: "10px" }}
      >
        <FormLabel component="legend">Select Semester</FormLabel>
        <RadioGroup row value={semester} onChange={(e) => setSemester(e.target.value)}>
          {["S1", "S2"].map((sem) => (
            <FormControlLabel key={sem} value={sem} control={<Radio />} label={sem} />
          ))}
        </RadioGroup>
      </FormControl>

      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleResetTable} 
        // sx={{ margin: "5px" }}
      >
        Reset Schedule
      </Button>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => getSelectedExams()} 
        // sx={{ margin: "5px" }}
      >
        Get Selected Exams
      </Button>

      </div>

      
      
      <TableContainer component={Paper} sx={{ maxWidth: "100%", margin: "auto", overflowX: "auto", boxShadow: "none" }}>

        <Table sx={{ width: "100%", tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} align="center" sx={{ fontWeight: "bold", fontSize: "0.9rem", padding: "8px" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {examData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "0.9rem", padding: "8px" }}>{row.date}</TableCell>
                {row.slots.map((slot, slotIndex) => (
                  <TableCell
                    key={slotIndex}
                    align="center"
                    sx={{ fontSize: "0.9rem", padding: "12px", cursor: "pointer", backgroundColor: slot.module ? "#e3f2fd" : "inherit", minHeight: "60px" }}
                    onClick={(event) => handleClick(event, rowIndex, slotIndex)}
                  >
                    {slot.module ? `${slot.module} (${slot.place})` : <>- <br /> -</>}
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
            modules.map((module, index) => {
              const isSelected = examData.some(row => row.slots.some(slot => slot.module === module));
              return (
                <MenuItem key={index} onClick={() => handleSelectModule(module)} sx={{ backgroundColor: isSelected ? "#f8d7da" : "inherit" }}>
                  {module}
                </MenuItem>
              );
            })
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
