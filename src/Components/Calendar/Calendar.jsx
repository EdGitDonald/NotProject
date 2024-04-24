import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CustomCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <h2>Calendar</h2>
      <Calendar
        onChange={onChange}
        value={date}
      />
    </div>
  );
}

export default CustomCalendar;
