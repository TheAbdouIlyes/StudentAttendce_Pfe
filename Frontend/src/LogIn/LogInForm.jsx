import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';


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
          username: credentials.username, // Adjust field names if needed
          password: credentials.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.access); // Store token
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("role", "admin"); // Store role for future navigation
        navigate("/Dashboard"); // Redirect after successful login
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please check your connection.");
    }
  };

  return (
    <div className='FormLogIn'>
      <form onSubmit={handleSubmit} className='FormLogIn'>
        <h3 className='LogIn-Info'>username</h3>
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

        <h3 className='LogIn-Info'>password</h3>
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

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button 
        variant='contained' 
        sx={{height:40 ,maxWidth:130}}
        color="info" 
        type="submit" 
       >Submit</Button>
      </form>
    </div>
  );
}
