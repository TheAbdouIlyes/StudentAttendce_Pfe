import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';

export default function LogInForm() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch("http://127.0.0.1:8000/t/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("role", "admin");

        // ✅ SweetAlert success message
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
          timer: 1000,
          showConfirmButton: false
        });

        setTimeout(() => {
          navigate("/Dashboard");
        }, 1000); // wait for SweetAlert to finish
      } else {
        // ❌ SweetAlert error message
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid credentials. Please try again.'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        text: 'Something went wrong. Please check your internet connection.'
      });
    }
  };

  return (
    <div className='FormLogIn'>
      <form onSubmit={handleSubmit} className='FormLogIn'>
        <h3 className='LogIn-Info'>Username</h3>
        <Box sx={{ width: 300, marginBottom: 4, maxWidth: '100%' }}>
          <TextField
            fullWidth
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            required
          />
        </Box>

        <h3 className='LogIn-Info'>Password</h3>
        <Box sx={{ width: 300, marginBottom: 4, maxWidth: '100%' }}>
          <TextField
            fullWidth
            id="password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </Box>

        <Button 
          variant='contained' 
          sx={{ height: 40, maxWidth: 130 }}
          color="info" 
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
