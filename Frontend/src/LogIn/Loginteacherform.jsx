import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
        localStorage.setItem("accessToken", data.access); // Store token
        localStorage.setItem("refreshToken", data.refresh);
        navigate("/Dashboard"); // Redirect after successful login
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
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
            type="secret_number"
            value={credentials.secret_number}
            onChange={handleInputChange}
            required
          />
        </Box>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="Login-Submit">Submit</button>
      </form>
    </div>
  );
}
