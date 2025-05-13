import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography } from '@mui/material';
import "./../../src/app.css";
import API from '../api/axios'; // Ensure you have axios set up properly

export default function CalendarView({ selectedDate, onDateChange, schoolId }) {
  const [events, setEvents] = useState({}); // To store events mapped by the day

  // Fetch events whenever the schoolId changes
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let endpoint = `/calendar`;
        if (schoolId) {
          endpoint = `/calendar/${schoolId}`; // If schoolId exists, fetch specific school's events
        }

        // Fetching the event data from the API
        const response = await API.get(endpoint);
        const eventData = response.data.events; // Assuming the response is an object with a `events` field

        // Mapping the events to the format { date: title } where date is the day of the month
        const mappedEvents = {};
        eventData.forEach(event => {
          const date = new Date(event.start);
          const day = date.getDate(); // Get the day of the month
          mappedEvents[day] = event.title; // Assign the event's title to the respective day
        });

        setEvents(mappedEvents); // Update the state with the events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [schoolId]); // Re-fetch whenever schoolId changes

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
            return events[day] ? 'highlight' : null; // Apply 'highlight' class if there's an event
          }}
          tileContent={({ date, view }) => {
            const day = date.getDate();
            const title = events[day];
            return view === 'month' && title ? (
              <div className="event-title">{title}</div> // Display event title on the calendar tile
            ) : null;
          }}
        />
      </Box>
    </Box>
  );
}
