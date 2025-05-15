import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography } from '@mui/material';
import "./../../src/app.css";
import API from '../api/axios';

const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function CalendarView({ selectedDate, onDateChange, schoolId }) {
  const [events, setEvents] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let endpoint = `/calendar`;
        if (schoolId) {
          endpoint = `/calendar/${schoolId}`;
        }

        const response = await API.get(endpoint);

        console.log('API response:', response);

        // Adjust this depending on your actual backend response structure
        // If response.data is array of events directly, use response.data
        // If it's inside an object like { events: [...] }, then use response.data.events
        const eventData = Array.isArray(response.data) ? response.data : response.data?.events || [];

        const mappedEvents = {};
        eventData.forEach(event => {
          // Adjust if your event date field is named differently
          const date = new Date(event.date);
          const key = formatDateKey(date);

          if (mappedEvents[key]) {
            mappedEvents[key] += `, ${event.title}`;
          } else {
            mappedEvents[key] = event.title;
          }
        });

        setEvents(mappedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [schoolId]);

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
            const key = formatDateKey(date);
            return events[key] ? 'highlight' : null;
          }}
          tileContent={({ date, view }) => {
            const key = formatDateKey(date);
            const title = events[key];
            return view === 'month' && title ? (
              <div className="event-title">{title}</div>
            ) : null;
          }}
        />
      </Box>
    </Box>
  );
}
