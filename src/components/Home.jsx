import React,{useState} from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import CalendarView from './CalendarView'
import EventList from './EventList'
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';

const Home = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

  const handleMonthChange = (monthIndex) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(monthIndex);
    setSelectedDate(newDate);
  };
  return (
    <>
    <Navbar/>
     <Box display="flex" flexDirection="column" height="100vh">
      <Box display="flex" flex={1}>
        <Sidebar selectedDate={selectedDate} onMonthClick={handleMonthChange} />
        <CalendarView selectedDate={selectedDate} onDateChange={setSelectedDate} />
        {/* <EventList /> */}
      </Box>
    </Box>
    </>
   
  )
}

export default Home