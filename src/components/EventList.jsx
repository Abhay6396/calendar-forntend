import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios';

const EventList = ({ schoolId, selectedDate }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const month = selectedDate ? selectedDate.getMonth() : new Date().getMonth();
  const year = selectedDate ? selectedDate.getFullYear() : new Date().getFullYear();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        let eventResponses = [];

        // ✅ Fetch all-school events
        const globalEventsRes = await axios.get('/calendar');
        eventResponses.push(...globalEventsRes.data);

        // ✅ If a specific school is selected, fetch its events too
        if (schoolId) {
          const schoolEventsRes = await axios.get(`/calendar/${schoolId}`);
          eventResponses.push(...schoolEventsRes.data);
        }

        // ✅ Filter events by selected month and year
        const filtered = eventResponses.filter((event) => {
          const eventDate = new Date(event.date);
          return (
            eventDate.getMonth() === month && eventDate.getFullYear() === year
          );
        });

        // Sort events by date
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

        setEvents(filtered);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [schoolId, month, year]);

  return (
    <Box
      width="100%"
      maxHeight="500px"
      overflow="auto"
      p={2}
      bgcolor="#fafafa"
      display="flex"
      flexDirection="column"
      borderRadius="8px"
    >
      {loading ? (
        <Box textAlign="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : events.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No events this month.
        </Typography>
      ) : (
        events.map((event, index) => (
          <Box key={event.id || index} display="flex" alignItems="flex-start" mb={2}>
            <Box
              mt={1}
              width={10}
              height={10}
              bgcolor={event.color || "#90caf9"}
              borderRadius="50%"
            />
            <Box ml={2} flex={1}>
              <Typography variant="caption" color="gray">
                {new Date(event.date).toLocaleDateString()}{" "}
                {new Date(event.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
              <Typography fontSize={13}>
                {event.title}
                {event.school === null && (
                  <Typography component="span" fontSize={12} color="textSecondary"> (All Schools)</Typography>
                )}
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={() => {
                // Optional delete handler
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))
      )}
    </Box>
  );
};

export default EventList;
