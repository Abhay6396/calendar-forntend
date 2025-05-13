import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#7e57c2' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left side: Dashboard button */}
        <Box>
          <Button
            color="inherit"
            variant="text"
            onClick={() => navigate('/dashboard')}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Dashboard
          </Button>
        </Box>

        {/* Center title */}
        <Typography variant="h6" fontWeight="bold">
          OMOTEC EVENT CALENDAR
        </Typography>

        {/* Right side: Placeholder or logo */}
        <Box>
          {/* <img src="/path-to-logo" alt="OMOTEC Logo" width="120" /> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
