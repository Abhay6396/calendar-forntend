import { useState } from 'react';
import API from '../api/axios';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      saveToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#e0f2f1',  // light teal background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 400,
          width: '100%',
          p: 4,
          borderRadius: 3,
          textAlign: 'center',
          bgcolor: 'white',
        }}
      >
        <Box
          component="img"
          src="https://th.bing.com/th/id/OIP.iKHQbd-ZxsIFUaqarlotjQHaEQ?pcl=292827&rs=1&pid=ImgDetMain"
          alt="Omotec Logo"
          sx={{ width: 120, mb: 3, mx: 'auto' }}
        />

        <Typography variant="h5" mb={3} color="#00796b" fontWeight="bold">
          Login to Omotec
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              bgcolor: '#00796b',
              '&:hover': { bgcolor: '#004d40' },
              fontWeight: 'bold',
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
