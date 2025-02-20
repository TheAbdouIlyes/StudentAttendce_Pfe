import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function LogInForm() {
  return (
    <div>
        <form action="" className='FormLogIn'>
            <h3 className='LogIn-Info'>Matricule</h3>
            <Box sx={{ width: 300 , marginBottom:4 , maxWidth: '100%' }}>
                <TextField fullWidth id="fullWidth" />
            </Box>

            <h3 className='LogIn-Info'>Number</h3>
            <Box sx={{ width: 300 , marginBottom:4 , maxWidth: '100%' }}>
                <TextField fullWidth id="fullWidth" />
            </Box>
            
        </form>
    </div>
  )
}
