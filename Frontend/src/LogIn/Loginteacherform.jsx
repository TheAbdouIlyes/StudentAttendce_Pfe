import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';

export default function LogInteacherform() {
  const [credentials, setCredentials] = useState({ matricul: '', secret_number: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch("http://127.0.0.1:8000/teacher_l/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          matricul: credentials.matricul,
          secret_number: credentials.secret_number
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
          text: 'Redirecting to your dashboard...',
          timer: 2000,
          showConfirmButton: false
        });

        setTimeout(() => {
          navigate("Dashboard");
        }, 2000);
      } else {
        // ❌ Invalid credentials alert
        Swal.fire({
          icon: 'error',
          title: 'Invalid credentials',
          text: 'Please check your matricul and secret number.'
        });
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      // ❌ Network error alert
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
            id="secret_number"
            name="secret_number"
            type="password"
            value={credentials.secret_number}
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
