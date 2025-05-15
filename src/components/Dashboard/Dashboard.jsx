import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SchoolIcon from "@mui/icons-material/School";
import Calendar from "./../CalendarView";

export default function Dashboard() {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [newSchoolName, setNewSchoolName] = useState("");
  const [allSchoolsFile, setAllSchoolsFile] = useState(null);
  const [schoolList, setSchoolList] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [eventsKey, setEventsKey] = useState(0);

  const fetchSchools = async () => {
    try {
      const res = await API.get("/schools/all");
      setSchoolList(res.data);
    } catch (error) {
      console.error("Error fetching schools:", error);
      alert("Failed to fetch schools");
    }
  };

  const refreshData = () => {
    fetchSchools();
    setEventsKey((k) => k + 1);
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const handleEditClick = () => {
    if (!selectedEventId) {
      if (!window.confirm("Are you sure you want to create new event?")) return;
    }
    setEditOpen(true);
  };

  const handleClose = () => {
    setEditOpen(false);
    setSelectedEventId("");
    setSelectedSchool("");
    setSelectedDate(new Date());
    setEventTitle("");
  };

  const handleSave = async () => {
    if (!selectedSchool) {
      alert("Please select a school.");
      return;
    }
    if (!eventTitle.trim()) {
      alert("Please enter an event title.");
      return;
    }
    if (!selectedDate) {
      alert("Please select a valid date.");
      return;
    }

    try {
      console.log(selectedDate, selectedSchool, selectedEventId);
      const url = selectedEventId
        ? `/calendar/${selectedEventId}`
        : `/calendar/create`;

      const payload = {
        school: selectedSchool,
        title: eventTitle,
        date: selectedDate.toISOString(),
      };
      let res;
      if (!selectedEventId) {
         res = await API.post(url, payload);
      } else {
         res = await API.put(url, payload);
      }
      alert(res.data.message || "Operation successful!");
      handleClose();
      refreshData();
    } catch (error) {
      console.error(
        "Error saving event:",
        error.response?.data || error.message
      );
      alert("Failed to save event.");
    }
  };

  const handleDelete = async () => {
    if (!selectedEventId) {
      alert("Please select an event to delete.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await API.delete(`/calendar/${selectedEventId}`);
      alert("Event deleted successfully!");
      handleClose();
      refreshData();
    } catch (error) {
      console.error(
        "Error deleting event:",
        error.response?.data || error.message
      );
      alert("Failed to delete event.");
    }
  };

  const handleCreateSchool = async () => {
    if (!newSchoolName.trim()) {
      alert("Please enter a school name");
      return;
    }

    try {
      await API.post("/schools/create", { name: newSchoolName });
      alert("School created successfully");
      setNewSchoolName("");
      refreshData();
    } catch (error) {
      console.error(error);
      alert("Error creating school");
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
      await API.post("/schools/upload-all", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Excel uploaded successfully");
      setAllSchoolsFile(null);
      refreshData();
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
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Event Calendar
            </Typography>

            <FormControl fullWidth sx={{ mt: 1, mb: 2 }}>
              <InputLabel id="school-filter-label">Filter by School</InputLabel>
              <Select
                labelId="school-filter-label"
                value={selectedSchool}
                label="Filter by School"
                onChange={(e) => {
                  setSelectedSchool(e.target.value);
                  console.log(selectedSchool);
                  setSelectedEventId("");
                  setEventTitle("");
                  setSelectedDate(new Date());
                }}
              >
                <MenuItem value="">All Schools</MenuItem>
                {schoolList.map((school) => (
                  <MenuItem key={school._id} value={school._id}>
                    {school.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ maxHeight: 400, overflow: "auto" }}>
              <Calendar
                key={eventsKey}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                schoolId={selectedSchool}
                onEventSelect={(event) => {
                  setSelectedEventId(event.id);
                  setEventTitle(event.title);
                  setSelectedDate(new Date(event.date));
                  setSelectedSchool(selectedSchool);
                }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Admin Controls
            </Typography>

            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={handleEditClick}
            >
              Create || Edit Selected Event
            </Button>

            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Delete Selected Event
            </Button>

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

      <Dialog open={editOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <FormControl fullWidth>
            <InputLabel id="school-label">Select School</InputLabel>
            <Select
              labelId="school-label"
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              label="Select School"
            >
              {schoolList.map((school) => (
                <MenuItem key={school._id} value={school._id}>
                  {school.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Event Title"
            variant="outlined"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Event Date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
