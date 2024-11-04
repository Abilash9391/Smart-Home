import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/CCalendar.css';

function MyCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      {/* <h1>React Calendar</h1> */}
      <Calendar onChange={onChange} value={date} />
      {/* <p>Selected date: {date.toDateString()}</p> */}
    </div>
  );
}

export default MyCalendar;
