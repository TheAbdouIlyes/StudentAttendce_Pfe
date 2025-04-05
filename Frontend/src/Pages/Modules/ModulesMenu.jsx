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

const modules = ["L1", "L2", "L3", "M1", "M2"];
const categories = ["info", "physic", "gestion", "biology", "pharmacy", "medcine"];

export default function ModulesMenu() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          border: `1.5px solid ${isDarkMode ? "#171f27" : "#e0e0e0"}`,
          p: 3,
          mb: 4,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary">
          📦 Modules
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Choose Your Specialty & Level
        </Typography>
      </Paper>

      {/* Grid */}
      <Grid container spacing={3}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={0}
              sx={{
                border: `1.5px solid ${isDarkMode ? "#171f27" : "#e0e0e0"}`,
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
