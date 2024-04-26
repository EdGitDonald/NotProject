import React, { useState, useEffect } from 'react';
import './Calendar.css';

function Calendar({ tasks }) {
  const [view, setView] = useState('month'); // Default view is set to 'month'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasksByDate, setTasksByDate] = useState({});

  // Update tasksByDate whenever tasks prop changes
  useEffect(() => {
    const updatedTasksByDate = {};
    tasks.forEach((task) => {
      const taskDate = new Date(task.dueDate).toDateString();
      if (updatedTasksByDate[taskDate]) {
        updatedTasksByDate[taskDate].push(task);
      } else {
        updatedTasksByDate[taskDate] = [task];
      }
    });
    setTasksByDate(updatedTasksByDate);
  }, [tasks]);

  // Function to handle task deletion
  const handleTaskDelete = (task) => {
    const updatedTasksByDate = { ...tasksByDate };
    const taskDate = new Date(task.dueDate).toDateString();
    const updatedTasks = updatedTasksByDate[taskDate].filter((t) => t.id !== task.id);
    updatedTasksByDate[taskDate] = updatedTasks;
    setTasksByDate(updatedTasksByDate);
  };

  // Function to generate dates for the current day
  const generateCurrentDay = () => {
    const currentDateStr = currentDate.toDateString();
    const tasksForCurrentDay = tasksByDate[currentDateStr] || [];

    return (
      <div className='current-day'>
        <div>{currentDateStr}</div>
        {tasksForCurrentDay.map((task, index) => (
          <div key={index}>
            {task.taskName}
            <button onClick={() => handleTaskDelete(task)}>Delete</button>
          </div>
        ))}
      </div>
    );
  };

  // Function to generate dates for the current week
  const generateCurrentWeek = () => {
    const currentWeek = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - currentDate.getDay() + i);
      const dateStr = date.toDateString();
      currentWeek.push(dateStr);
    }

    return (
      <div className='current-week'>
        {currentWeek.map((day, index) => (
          <div key={index}>
            <div>{day}</div>
            {tasksByDate[day] && tasksByDate[day].map((task, index) => (
              <div key={index}>
                {task.taskName}
                <button onClick={() => handleTaskDelete(task)}>Delete</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Function to generate dates for the current month
  const generateCurrentMonth = () => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
    
    const monthDates = [];

    // Fill in the days before the first day of the month with empty slots
    for (let i = 0; i < firstDayOfMonth; i++) {
      monthDates.push('');
    }

    // Fill in the numbered dates for the month
    for (let day = 1; day <= daysInMonth; day++) {
      monthDates.push(new Date(currentYear, currentMonth, day).toDateString());
    }

    return (
      <div className='current-month'>
        {monthDates.map((date, index) => (
          <div key={index}>
            {date}
            {/* Render tasks for this date */}
            {tasksByDate[date] && tasksByDate[date].map((task, index) => (
              <div key={index}>
                {task.taskName}
                <button onClick={() => handleTaskDelete(task)}>Delete</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Function to handle view change
  const handleViewChange = (newView) => {
    setView(newView);
  };

  // Function to handle navigating to the previous week/month
  const handlePrevious = () => {
    const previousDate = new Date(currentDate);
    if (view === 'week') {
      previousDate.setDate(previousDate.getDate() - 7);
    } else if (view === 'month') {
      previousDate.setMonth(previousDate.getMonth() - 1);
    }
    setCurrentDate(previousDate);
  };

  // Function to handle navigating to the next week/month
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
      <h2>Calendar</h2>
      <div className='view-options'>
        <button onClick={() => handleViewChange('day')}>Day</button>
        <button onClick={() => handleViewChange('week')}>Week</button>
        <button onClick={() => handleViewChange('month')}>Month</button>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
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











