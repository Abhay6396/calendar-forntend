import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Box, Typography } from "@mui/material";
import "../App.css";
import API from "../api/axios";

const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function CalendarView({
  selectedDate,
  onDateChange,
  schoolId,
  onEventSelect,
}) {
  const [events, setEvents] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let endpoint = `/calendar`;
        if (schoolId) {
          endpoint = `/calendar/${schoolId}`;
        }

        const response = await API.get(endpoint);
        const eventData = Array.isArray(response.data)
          ? response.data
          : response.data?.events || [];

        const mappedEvents = {};
        eventData.forEach((event) => {
          const date = new Date(event.date);
          const key = formatDateKey(date);
          if (mappedEvents[key]) {
            mappedEvents[key].push(event);
          } else {
            mappedEvents[key] = [event];
          }
        });

        setEvents(mappedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [schoolId]);

  return (
    <Box flex={1} bgcolor="#fff" p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold" color="grey.700">
          {selectedDate
            ? selectedDate
                .toLocaleString("default", { month: "long" })
                .toUpperCase()
            : "SELECT A DATE"}
        </Typography>
      </Box>

      <Box mt={2} className="custom-calendar">
        <Calendar
          onChange={onDateChange}
          value={selectedDate}
          tileClassName={({ date }) => {
            const key = formatDateKey(date);
            return events[key] ? "highlight" : null;
          }}
          tileContent={({ date, view }) => {
            const key = formatDateKey(date);
            const titles = events[key]?.map((e) => e.title).join(", ");
            return view === "month" && titles ? (
              <div className="event-title">{titles}</div>
            ) : null;
          }}
        />
      </Box>

      {selectedDate && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Events on {selectedDate.toDateString()}:
          </Typography>
          {/* List of events on the selected date */}
          {events[formatDateKey(selectedDate)] &&
            events[formatDateKey(selectedDate)].length > 0 && (
              <Box sx={{ mt: 2 }}>
                {events[formatDateKey(selectedDate)].map((event) => (
                  <Box
                    key={event._id}
                    onClick={() => {
                      console.log("Event clicked:", event);
                      onEventSelect && onEventSelect(event);
                    }}
                    sx={{
                      backgroundColor: "#f0f0f0",
                      padding: 1,
                      borderRadius: 1,
                      marginBottom: 1,
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#e0e0e0" },
                    }}
                  >
                    <Typography variant="subtitle2">{event.title}</Typography>
                    <Typography variant="caption">
                      {new Date(event.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
        </Box>
      )}
    </Box>
  );
}
