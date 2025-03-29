import React from "react";
import { Paper, Typography } from "@mui/material";
import TeacherSurveillanceTable from "./TeacherSurveillanceTable";

export default function Surveillance() {
  const teacherName = "Mr. Mahsour"; // This should come dynamically (e.g., from user authentication)

  return (
    <div>
      <Paper sx={{ p: 3, mb: 4, textAlign: "center", borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          📋 Surveillance Duties for {teacherName}
        </Typography>
      </Paper>
      <TeacherSurveillanceTable teacherName={teacherName} />
    </div>
  );
}
