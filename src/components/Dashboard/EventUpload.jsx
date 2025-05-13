import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button, Box } from '@mui/material';
import axios from 'axios';

export default function EventUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleUpload = async () => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const wb = XLSX.read(e.target.result, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws);

      try {
        await axios.post('/api/calendar/upload', { events: data });
        alert('Events uploaded successfully!');
      } catch (error) {
        console.error(error);
        alert('Error uploading events');
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <Box>
      <input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload Events</Button>
    </Box>
  );
}
