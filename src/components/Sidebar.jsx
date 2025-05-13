import { Box, Typography, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Sidebar({ selectedDate, onMonthClick }) {
  const selectedMonth = selectedDate.getMonth();

  return (
    <Box
      sx={{
        backgroundColor: '#7e57c2',
        color: 'white',
        width: 150,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '95vh',
        boxShadow: '4px 0 12px rgba(0,0,0,0.2)',
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <ArrowBackIosIcon fontSize="small" />
        <Typography variant="subtitle2">{selectedDate.getFullYear()}</Typography>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between" flexGrow={1}>
        {months.map((month, index) => (
          <Button
            key={month}
            variant="text"
            sx={{
              color: 'white',
              justifyContent: 'flex-start',
              px: 1,
              py: 1,
              textTransform: 'none',
              fontSize: 14,
              backgroundColor: selectedMonth === index ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              transition: 'transform 0.2s, background-color 0.2s',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                transform: 'scale(1.05)',
              },
              '&:active': {
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
              },
            }}
            onClick={() => onMonthClick(index)}
          >
            {month}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
