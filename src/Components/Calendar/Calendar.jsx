import React, { useState, useEffect } from 'react';
import './Calendar.css';

function Calendar({ tasks }) {
  const [view, setView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasksByDate, setTasksByDate] = useState({});

  useEffect(() => {
    const updatedTasksByDate = {};
    tasks.forEach((task) => {
      const taskDate = new Date(task.dueDate).toLocaleDateString(); // Use toLocaleDateString for consistent formatting
      if (updatedTasksByDate[taskDate]) {
        updatedTasksByDate[taskDate].push(task);
      } else {
        updatedTasksByDate[taskDate] = [task];
      }
    });
    setTasksByDate(updatedTasksByDate);
  }, [tasks]);
  

  const handleTaskDelete = (task) => {
    const updatedTasksByDate = { ...tasksByDate };
    const taskDate = new Date(task.dueDate).toDateString();
    updatedTasksByDate[taskDate] = updatedTasksByDate[taskDate].filter((t) => t.id !== task.id);
    setTasksByDate(updatedTasksByDate);
  };

  const generateCurrentDay = () => {
    const currentDateStr = currentDate.toDateString();
    const tasksForCurrentDay = tasksByDate[currentDateStr] || [];

    return (
      <div className='current-day'>
        <div>{currentDateStr}</div>
        {tasksByDate[currentDateStr] && tasksByDate[currentDateStr].map((task, index) => (
  <div key={index}>
    {task.taskName}
    <button onClick={() => handleTaskDelete(task)}>Delete</button>
  </div>
))}
      </div>
    );
  };

  const generateCurrentWeek = () => {
    const currentWeek = [];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - currentDate.getDay() + i); // Adjusted to start from Monday
      const dateStr = date.toDateString();
      currentWeek.push({ dateStr, dateNumber: date.getDate() });
    }
  
    return (
      <div className='current-week'>
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-header">{day}</div>
        ))}
        {currentWeek.map(({ dateStr, dateNumber }, index) => (
          <div key={index} className={dateStr ? '' : 'empty'}>
            {dateStr && (  // Wrap content in a conditional check for dateStr
              <>
                <div className="date-number">{dateNumber}</div>
                {tasksByDate[dateStr] && tasksByDate[dateStr].map((task, index) => (
                  <div key={index}>
                    {task.taskName}
                    <button onClick={() => handleTaskDelete(task)}>Delete</button>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  const generateCurrentMonth = () => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    const monthDates = [];
    for (let i = 1; i < firstDayOfMonth; i++) {
      monthDates.push('');
    }
    for (let day = 1; day <= daysInMonth; day++) {
      monthDates.push(new Date(currentYear, currentMonth, day).toDateString());
    }

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
      <div className='current-month'>
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-header">{day}</div>
        ))}
        {monthDates.map((date, index) => (
          <div key={index} className={date ? '' : 'empty'}>
            {date && (
              <>
                <div className="date-number">{new Date(date).getDate()}</div>
                {tasksByDate[date] && tasksByDate[date].map((task, index) => (
                <div key={index}>
                {task.taskName}
                <button onClick={() => handleTaskDelete(task)}>Delete</button>
              </div>
            ))}
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handlePrevious = () => {
    const previousDate = new Date(currentDate);
    if (view === 'week') {
      previousDate.setDate(previousDate.getDate() - 7);
    } else if (view === 'month') {
      previousDate.setMonth(previousDate.getMonth() - 1);
    }
    setCurrentDate(previousDate);
  };

  const handleNext = () => {
    const nextDate = new Date(currentDate);
    if (view === 'week') {
      nextDate.setDate(nextDate.getDate() + 7);
    } else if (view === 'month') {
      nextDate.setMonth(nextDate.getMonth() + 1);
    }
    setCurrentDate(nextDate);
  };

  return (
    <div className='calendar-container'>
      <div className='view-options'>
        <button onClick={() => handleViewChange('day')}>Day</button>
        <button onClick={() => handleViewChange('week')}>Week</button>
        <button onClick={() => handleViewChange('month')}>Month</button>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <div className='month-year'>
        {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
      </div>
      <div className='calendar-grid'>
        {view === 'day' && generateCurrentDay()}
        {view === 'week' && generateCurrentWeek()}
        {view === 'month' && generateCurrentMonth()}
      </div>
    </div>
  );
}

export default Calendar;

