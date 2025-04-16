import React, { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { GraduationCap, Download, User, Mail, Hash, BookOpen, Building2, Columns } from 'lucide-react';
import { AppBar, Toolbar, Typography, Paper, Grid, Box, Card, CardContent, Avatar, Button } from '@mui/material';
import { useTheme, useColorScheme } from '@mui/material/styles';

export default function ES() {
  const { mode } = useColorScheme(); // Detect light/dark mode
  const theme = useTheme(); // Access the theme colors

  const [student, setStudent] = useState(null);
  const qrRef = useRef(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/student/profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setStudent(data))
      .catch((error) => console.error("Error fetching student data:", error));
  }, [token]);

  const downloadQRCode = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;
    
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${student?.matricul}_qrcode.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  if (!student) {
    return <Typography variant="h5" align="center" sx={{ mt: 4, color: theme.palette.text.primary }}>Loading...</Typography>;
  }

  // Adjust QR code colors based on dark/light mode
  const qrColor = theme.palette.text.primary;
  const qrBgColor = theme.palette.background.paper;

  return (
    <Box sx={{ display: 'flex',flexDirection:'column', justifyContent: 'center' ,alignItems:'center'}}>
      {/* <Paper
        elevation={0}
        sx={{
          // border: `1.5px solid ${theme.palette.mode === "dark" ? "#171f27" : "#e0e0e0"}`,
          p: 2,
          mb: 2,
          ml: 8,
          textAlign: 'start',
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderRadius: 2,
          width: '100%',
          margin: '0 auto',
        }}
      >
        <Typography variant="h6">
            Welcome, <b>{student.first_name} {student.last_name}</b> To Your Student profile
        </Typography>
      </Paper> */}

      <Box sx={{maxWidth:'800px', display: 'flex', justifyContent: 'center' }}>
        <Paper
          elevation={0}
          sx={{
            border: `1px solid ${theme.palette.mode === "dark" ? "#171f27" : "#e0e0e0"}`,
            width: '100%',
            p: 3,
            pb:0,
            borderRadius: 8,
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="h5" textlign="center" sx={{mb:3, pl:4,pr:4, fontWeight: 'bold',display: 'flex',justifyContent: 'center' }} color="primary">
            Your student QR-code card
          </Typography>

          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7}>
              <Card
              elevation={0}
                sx={{
                  pl: 1,
                  pb: 1,
                  borderRadius: 3,
                  // bgcolor: theme.palette.background.default,
                  // color: theme.palette.text.primary,
                }}
              >
                <CardContent>
                  <Grid container spacing={2} textAlign="start">
                    <Grid item xs={12}>
                      <Typography variant="body1" gutterBottom sx={{ display: 'flex', alignItems: 'center',mb: 1  }}>
                        <User size={18} style={{ marginRight: 8 }} /> <b>Full Name:</b>
                      </Typography>
                      <Typography sx={{borderBottom:"1px solid",ml:4,mr:4}}> {student.first_name} {student.last_name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' ,mb: 1 }}>
                        <Mail size={18} style={{ marginRight: 8 }} /> <b>Email:</b> 
                      </Typography>
                      <Typography sx={{borderBottom:"1px solid",ml:4,mr:4}}>{student.email}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center',mb: 1  }}>
                        <Hash size={18} style={{ marginRight: 8 }} /> <b>Matricule:</b> 
                      </Typography>
                      <Typography sx={{borderBottom:"1px solid",ml:4,mr:4}}>{student.matricul}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center',mb: 1  }}>
                        <BookOpen size={18} style={{ marginRight: 8 }} /> <b>Level:</b>
                      </Typography>
                      <Typography sx={{borderBottom:"1px solid",ml:4,mr:4}}> {student.level}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center',mb: 1  }}>
                        <Building2 size={18} style={{ marginRight: 8 }} /> <b>Speciality:</b> 
                      </Typography>
                      <Typography sx={{borderBottom:"1px solid",ml:4,mr:4}}>{student.speciality}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={5}>
              <Card
              elevation={0}
                sx={{
                  textAlign: 'center',
                  p: 2,
                  pt:4,
                  pb:4,
                  borderRadius: 2,
                  // bgcolor: theme.palette.background.default,
                  color: theme.palette.text.primary,
                  // border:"1px solid"
                }}
              >
                <Box ref={qrRef} onClick={downloadQRCode} sx={{ cursor: 'pointer' }}>
                  <QRCodeCanvas
                    value={student.matricul}
                    size={200}
                    level="H"
                    fgColor={qrColor}
                    bgColor={qrBgColor}
                  />
                </Box>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <Download size={18} /> Click on the QR-code to download it
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
