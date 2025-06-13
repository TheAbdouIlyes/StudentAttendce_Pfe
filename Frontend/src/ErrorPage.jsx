// src/ErrorPage.jsx
import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NotFoundImg from './assets/NotFound.svg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="end"
      justifyContent="start"
      height="100%"
      bgcolor="background.default"
      color="text.primary"
      sx={
        {
  
            backgroundImage: `url(${NotFoundImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',


        }
      }
      p={3}
    >
      <Typography variant="h2" gutterBottom>
        <b>404 - Page Not Found</b>
      </Typography>
      <Typography variant="body1" gutterBottom mb={1}>
        The page you're looking for doesn't exist.
      </Typography>
     <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)} // -1 means "go back to the previous page"
        >
        Back
        </Button>
    </Box>
  );
}
