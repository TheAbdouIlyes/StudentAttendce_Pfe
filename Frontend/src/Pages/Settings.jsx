import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  Typography,
  Stack,
  CircularProgress
} from '@mui/material';

function Settings() {
  const [form, setForm] = useState({
    old_password: '',
    new_password: '',
    new_password2: ''
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [nonFieldError, setNonFieldError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setErrors({});
    setNonFieldError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/change-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Password changed successfully!');
        setForm({ old_password: '', new_password: '', new_password2: '' });
      } else {
        setMessage('');
        if (typeof data === 'string') {
          setNonFieldError(data);
        } else if (Array.isArray(data)) {
          setNonFieldError(data.join(' '));
        } else {
          setErrors(data);
          if (data.non_field_errors || data.detail) {
            setNonFieldError(data.non_field_errors?.join(' ') || data.detail);
          }
        }
      }
    } catch (err) {
      setMessage('❌ Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h5" gutterBottom>
        Change Password
      </Typography>

      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      {nonFieldError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {nonFieldError}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Old Password"
            type="password"
            name="old_password"
            value={form.old_password}
            onChange={handleChange}
            error={Boolean(errors.old_password)}
            helperText={errors.old_password?.[0]}
            required
            fullWidth
          />

          <TextField
            label="New Password"
            type="password"
            name="new_password"
            value={form.new_password}
            onChange={handleChange}
            error={Boolean(errors.new_password)}
            helperText={errors.new_password?.[0]}
            required
            fullWidth
          />

          <TextField
            label="Confirm New Password"
            type="password"
            name="new_password2"
            value={form.new_password2}
            onChange={handleChange}
            error={Boolean(errors.new_password2)}
            helperText={errors.new_password2?.[0]}
            required
            fullWidth
          />

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Change Password'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default Settings;
