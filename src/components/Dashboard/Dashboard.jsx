import React, { useState } from 'react';
import API from '../../api/axios';
import {
  Box, Grid, Paper, Typography, Button, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions,
  MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import Calendar from './../CalendarView';

export default function Dashboard() {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState('');
  const [newSchoolName, setNewSchoolName] = useState('');
  const [allSchoolsFile, setAllSchoolsFile] = useState(null);

  const handleEditClick = () => {
    setEditOpen(true);
  };

  const handleClose = () => {
    setEditOpen(false);
    setSelectedSchool('');
    setSelectedDate(new Date());
    setEventTitle('');
  };

  const handleSave = () => {
    // Handle save logic here
    console.log({
      school: selectedSchool,
      date: selectedDate,
      title: eventTitle
    });
    handleClose();
  };

  const handleCreateSchool = async () => {
    if (!newSchoolName.trim()) {
      alert('Please enter a school name');
      return;
    }

    try {
      const response = await API.post('/schools/create', { name: newSchoolName });
      console.log('School created:', response.data);
      alert('School created successfully');
      setNewSchoolName('');
    } catch (error) {
      console.error(error);
      alert('Error creating school');
    }
  };

  const handleAllSchoolUpload = async () => {
    if (!allSchoolsFile) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", allSchoolsFile);

    try {
      const response = await API.post('/schools/upload-all', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Excel uploaded successfully");
      console.log(response.data);
      setAllSchoolsFile(null); // reset file
    } catch (error) {
      console.error(error);
      alert("Failed to upload Excel");
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Left Side: Calendar */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Event Calendar
            </Typography>
            <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
              <Calendar small />
            </Box>
          </Paper>
        </Grid>

        {/* Right Side: Controls */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" gutterBottom>
              Admin Controls
            </Typography>

            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
              color="secondary"
            >
              Upload Event Excel Sheet
              <input type="file" hidden accept=".xlsx,.xls,.csv" />
            </Button>

            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={handleEditClick}
            >
              Edit Selected Event
            </Button>

            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete Selected Event
            </Button>

            {/* Upload Excel for All Schools */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<UploadFileIcon />}
              component="label"
            >
              Upload Excel for All Schools
              <input
                type="file"
                hidden
                accept=".xlsx,.xls,.csv"
                onChange={(e) => setAllSchoolsFile(e.target.files[0])}
              />
            </Button>
            <Button
              variant="contained"
              color="success"
              disabled={!allSchoolsFile}
              onClick={handleAllSchoolUpload}
            >
              Submit All Schools Excel
            </Button>

            {/* Create School */}
            <TextField
              label="New School Name"
              variant="outlined"
              fullWidth
              value={newSchoolName}
              onChange={(e) => setNewSchoolName(e.target.value)}
            />
            <Button
              variant="contained"
              color="success"
              startIcon={<SchoolIcon />}
              onClick={handleCreateSchool}
            >
              Create School
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Edit Event Dialog */}
      <Dialog open={editOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="school-label">Select School</InputLabel>
            <Select
              labelId="school-label"
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              label="Select School"
            >
              <MenuItem value="School A">School A</MenuItem>
              <MenuItem value="School B">School B</MenuItem>
              <MenuItem value="School C">School C</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>

          <TextField
            label="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="error">Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
