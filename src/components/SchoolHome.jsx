import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper } from "@mui/material";
import Calendar from "./CalendarView"; // Uses same Calendar as Dashboard
import Sidebar from "./Sidebar";
import EventList from "./EventList";

const SchoolHome = () => {
  const { schoolId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleMonthChange = (monthIndex) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(monthIndex);
    setSelectedDate(newDate);
  };

  return (
    <Box>

      <Paper elevation={1}>

        <Box  display="flex" flexDirection="column" height="100vh">
            <Box display="flex" flex={1}>
            <Sidebar selectedDate={selectedDate} onMonthClick={handleMonthChange} />
          <Calendar
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            schoolId={schoolId} // ✅ Reuse calendar with filtered events
          />
          {/* <EventList/> */}
            </Box>
        
        </Box>
      </Paper>
    </Box>
  );
};

export default SchoolHome;
