import React, { useState } from 'react';
import { Button, TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

export default function EventUpdate({ schoolList }) {
  const [schoolId, setSchoolId] = useState('');
  const [eventId, setEventId] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const handleUpdate = async () => {
    if (!schoolId || !eventId || !newTitle) {
      alert('All fields are required');
      return;
    }

    try {
      const response = await axios.put(`/api/calendar/${eventId}`, {
        title: newTitle,
        school: schoolId,
      });

      alert(response.data.message);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to update event');
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 500, margin: 'auto' }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Select School</InputLabel>
        <Select value={schoolId} onChange={(e) => setSchoolId(e.target.value)}>
          {schoolList.map((school) => (
            <MenuItem key={school._id} value={school._id}>
              {school.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="New Event Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" fullWidth onClick={handleUpdate}>
        Update Event
      </Button>
    </Box>
  );
}
