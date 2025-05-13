import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography } from '@mui/material';
import "./../../src/app.css"

const events = {
  3: 'Science Fair',
  9: 'Robotics Day',
  12: 'Art Expo',
  17: 'Parent Meet',
  22: 'Sports Day',
  26: 'Annual Day',
};

export default function CalendarView({ selectedDate, onDateChange }) {
  return (
    <Box flex={1} bgcolor="#fff" p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold" color="grey.700">
          {selectedDate
            ? selectedDate.toLocaleString('default', { month: 'long' }).toUpperCase()
            : 'SELECT A DATE'}
        </Typography>
      </Box>

      <Box mt={2} className="custom-calendar">
        <Calendar
          onChange={onDateChange}
          value={selectedDate}
          tileClassName={({ date }) => {
            const day = date.getDate();
            return events[day] ? 'highlight' : null;
          }}
          tileContent={({ date, view }) => {
            const day = date.getDate();
            const title = events[day];
            return view === 'month' && title ? (
              <div className="event-title">{title}</div>
            ) : null;
          }}
        />
      </Box>
    </Box>
  );
}
