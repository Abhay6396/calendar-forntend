import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const events = [
  { date: "May 3, 2016", time: "05:00 pm", desc: "Computer conference", color: "#00e5ff" },
  { date: "May 9, 2016", time: "03:45 pm", desc: "A very important dinner with Anna", color: "#ff4081" },
  { date: "May 12, 2016", time: "10:00 am", desc: "Product Design Congress", color: "#ba68c8" },
  { date: "May 17, 2016", time: "09:30 am", desc: "Design Competition Submission", color: "#ffeb3b" },
  { date: "May 22, 2016", time: "11:30 am", desc: "Go fishing with family", color: "#ce93d8" },
  { date: "May 26, 2016", time: "01:30 pm", desc: "Playing basketball with George", color: "#40c4ff" },
];

export default function EventList() {
  return (
    <Box width="300px" p={2} bgcolor="#fafafa" display="flex" flexDirection="column">
      {events.map((event, index) => (
        <Box key={index} display="flex" alignItems="flex-start" mb={2}>
          <Box mt={1} width={10} height={10} bgcolor={event.color} borderRadius="50%" />
          <Box ml={2} flex={1}>
            <Typography variant="caption" color="gray">{`${event.date} ${event.time}`}</Typography>
            <Typography fontSize={13}>{event.desc}</Typography>
          </Box>
          <IconButton size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
      <Box mt="auto" textAlign="center">
        <button style={{
          backgroundColor: '#7e57c2',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>Remove</button>
      </Box>
    </Box>
  );
}
