import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../assets/calendar.css';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  // Function to format the date as "Month day"
  const formatDate = (date) => {
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Function to format weekdays as Mon, Tue, etc.
  const formatShortWeekday = (locale, date) => {
    return date.toLocaleDateString(locale, { weekday: 'short' }).substring(0, 3);
  };

  return (
    <div className="calendar">
      <h1 className="header">{formatDate(date)}</h1>
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          formatShortWeekday={formatShortWeekday}
        />
      </div>
    </div>   
  );
};

export default CalendarComponent;
