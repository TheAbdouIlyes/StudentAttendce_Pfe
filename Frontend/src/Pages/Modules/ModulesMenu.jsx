import React from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Button,
} from "@mui/material";

import TeacherSvg from "../../../public/TeacherSvg.svg"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const modules = ["L1", "L2", "L3", "M1", "M2"];
const categories = ["info", "physic", "gestion", "biology", "pharmacy", "medcine"];

export default function ModulesMenu() {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: 3,
        // minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          border: `1.5px solid ${theme.palette.border}`,
          p: 3,
          mb: 4,
          textAlign: "center",
          borderRadius: 2,
          display:"flex",
          justifyContent:"space-evenly"
        }}
      >

        <Box sx={{height:"100%",width:"45%" ,display:"flex",alignItems:"center",flexDirection:"column"}}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Modules
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Choose Your Specialty & Level to control and manage modules 
          </Typography>

           <Box sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-evenly",mt:5}}>
            <Button  variant="outlined" sx={{width:"130px"}}
            startIcon={<ArrowBackIcon/>}
            onClick={() => navigate("../MenuExams")}
            
            >Exams</Button>
              <Typography variant="subtitle4">-- change menu to --</Typography>
            <Button variant="outlined" sx={{width:"130px"}}
            endIcon={<ArrowForwardIcon/>}
            onClick={() => navigate("../MenuStudent")}
            >Students </Button>
          </Box>
        </Box>
        

        <img src={TeacherSvg} alt="Teacher" className="SvgPics" />
      </Paper>

      {/* Grid */}
      <Grid container spacing={3}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={0}
              sx={{
                border: `1.5px solid ${theme.palette.border}`,
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {category.toUpperCase()}
                </Typography>
                <Grid container spacing={1} sx={{ mt: 2 }}>
                  {modules.map((module) => (
                    <Grid item xs={6} key={module}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ fontWeight: "bold", borderRadius: 2 }}
                        onClick={() =>
                          navigate(
                            `/MenuModules/${category.toLowerCase()}/${module.toLowerCase()}`
                          )
                        }
                      >
                        {module}
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
