import './App.css';
// import MyCalendar from './components/MyCalendar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Room from './components/Room';
import { useEffect, useState } from 'react';
import Home from './components/Home';


function App() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
      const fetchRooms = async () => {
        try {
          const response = await fetch('http://localhost:3005/api/rooms');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setRooms(data);
        } catch (error) {
          console.error('Error fetching rooms:', error);
        }
      };
      fetchRooms();
    }, []);
  // const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentTime(new Date().toLocaleTimeString());
  //   }, 1000); // Update every 1 second
  //   return () => clearInterval(timer); // Clean up
  // }, []);
  return (
    <div className="container-fluid App">
         {/* <div className='date'>{new Date().toDateString()}</div>
         <div className='layout'> 
           <div className='cal'><MyCalendar/></div>
          <div className='clock'>
            <div className='clock-face'>
              <div className='hour'>{currentTime.split(":")[0]}:</div>
              <div className='minute'>{currentTime.split(":")[1]}:</div>
              <div className='second'>{currentTime.split(":")[2]}</div>
            </div>
          </div>
          
        </div> */}
      <Router>
        <Navbar rooms={rooms} />
        <Routes>
          {rooms.map((room) => (
            <Route 
              key={room._id}
              path={`/${room.roomName.toLowerCase()}`}
              element={<Room roomName={room.roomName} roomId={room._id}/>} 
            />
          ))}
          <Route path="/" element={<Home rooms={rooms} />} />
          <Route path="*" element={<>Not found</>
          } />
        </Routes>
      </Router>
    </div>

  );
}
export default App;