import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';

export default function LogInStudentForm() {
  const [credentials, setCredentials] = useState({ matricul: '', roll_number: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch("http://127.0.0.1:8000/stud_l/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          matricul: credentials.matricul,
          roll_number: credentials.roll_number
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("role", data.role);

        // ✅ Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
          text: 'Redirecting to your profile...',
          timer: 1000,
          showConfirmButton: false
        });

        setTimeout(() => {
          navigate("/student/Home")
        }, 1000);
      } else {
        // ❌ Show error alert
        Swal.fire({
          icon: 'error',
          title: 'Invalid credentials',
          text: 'Please check your matricul and secret number.'
        });
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      // ❌ Show network error
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Something went wrong. Please check your connection.'
      });
      setError("Something went wrong. Please check your connection.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='FormLogIn'>
        <h3 className='LogIn-Info'>matricul</h3>
        <Box sx={{ width: 300, marginBottom: 4, maxWidth: '100%' }}>
          <TextField
            fullWidth
            id="matricul"
            name="matricul"
            value={credentials.matricul}
            onChange={handleInputChange}
            required
          />
        </Box>

        <h3 className='LogIn-Info'>secret number</h3>
        <Box sx={{ width: 300, marginBottom: 4, maxWidth: '100%' }}>
          <TextField
            fullWidth
            id="roll_number"
            name="roll_number"
            type="password"
            value={credentials.roll_number}
            onChange={handleInputChange}
            required
          />
        </Box>

        {error && <p style={{ color: "red" }}>{error}</p>}

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
