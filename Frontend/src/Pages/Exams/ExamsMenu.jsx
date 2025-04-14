import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { 
  Box, Typography, Grid, Card, CardContent, Paper, RadioGroup, FormControl, 
  FormControlLabel, Radio, Button 
} from "@mui/material";

import TeacherSvg from "../../../public/PlanningSvg.svg"



const levels = ["L1", "L2", "L3", "M1", "M2"];
const specialities = ["info", "physic", "gestion", "biology", "pharmacy", "medicine"];

export default function ExamsMenu() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [semester, setSemester] = useState("S1");

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      {/* Header Section */}
      <Paper elevation={0} sx={{ border: `1.5px solid ${theme.palette.mode === "dark" ? "#171f27" : "#e0e0e0"}`,p: 3, mb: 4,
      borderRadius: 2,
      textAlign: "center",
      borderRadius: 2,
      display:"flex",
      justifyContent:"space-evenly"
       }} >


        <img src={TeacherSvg} alt="Teacher" className="SvgPics" />

        <Box sx={{height:"100%",maxWidth:"45%" ,display:"flex",alignItems:"center",flexDirection:"column"}}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Exams
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
                      Choose Your Specialty & Level to control and manage Exams
           </Typography>
        </Box>


        {/* <FormControl component="fieldset" sx={{ mt: 2 }}>
          <Typography variant="h6">Select Semester</Typography>
          <RadioGroup row value={semester} onChange={(e) => setSemester(e.target.value)}>
            {["S1", "S2"].map((sem) => (
              <FormControlLabel key={sem} value={sem} control={<Radio color="primary" />} label={sem} />
            ))}
          </RadioGroup>
        </FormControl> */}
      </Paper>

      {/* Grid Layout */}
      <Grid container spacing={3}>
        {specialities.map((speciality, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}  >
            <Card elevation={0} sx={{  border: `1.5px solid ${theme.palette.mode === "dark" ? "#171f27" : "#e0e0e0"}`,borderRadius: 3, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }} >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {speciality.toUpperCase()}
                </Typography>
                <Grid container spacing={1} sx={{ mt: 2 }}>
                  {levels.map((level) => (
                    <Grid item xs={6} key={level}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ fontWeight: "bold", borderRadius: 2 }}
                        onClick={() => navigate(`/MenuExams/${speciality}/${level}/${semester}`)}
                      >
                        {level}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
