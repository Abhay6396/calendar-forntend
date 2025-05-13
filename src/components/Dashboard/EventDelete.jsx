import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import axios from 'axios';

export default function EventDelete() {
  const [eventId, setEventId] = useState('');

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/calendar/${eventId}`);
      alert('Event deleted successfully!');
    } catch (error) {
      console.error(error);
      alert('Error deleting event');
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
      <Button onClick={handleDelete}>Delete Event</Button>
    </Box>
  );
}
