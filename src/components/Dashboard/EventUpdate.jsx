import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import axios from 'axios';

export default function EventUpdate() {
  const [eventId, setEventId] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/calendar/${eventId}`, { title: newTitle });
      alert('Event updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Error updating event');
    }
  };

  return (
    <Box>
      <TextField
        label="Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="New Event Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleUpdate}>Update Event</Button>
    </Box>
  );
}
