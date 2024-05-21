import React, { useState } from 'react';
import './Homepage.css'
import NotificationManager from '../../Components/NotificationsManager/NotificationManager';
import Simulator from '../../Components/Simulator/Simulator';
import Tasktracker from '../../Components/Tasktracker/Tasktracker';
import Calendar from '../../Components/Calendar/Calendar';

function Homepage() {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [taskList, setTaskList] = useState([]); // Renamed state

  const addNotification = (notification) => {
    setNotifications([...notifications, notification]);
  };

  const deleteNotification = (notification) => {
    const updatedNotifications = notifications.filter((n) => n !== notification);
    setNotifications(updatedNotifications);
  };

  const handleResponseSubmission = (response) => {
    // Handle the response submission logic
    console.log('Response submitted:', response);
    // Remove the notification from the list
    setNotifications(notifications.filter(notification => notification.response !== response));
    // Clear the selected notification
    setSelectedNotification(null);
  };

  // Function to add a new task to the task list
  const handleTaskCreation = (newTask) => {
    setTaskList([...taskList, newTask]); // Updated state
  };
  
  return (
    <div className='homepage-container'>
      <div className='left-column'>
        <Tasktracker onTaskCreation={handleTaskCreation}/>
      </div>
      <div className='right-column'>
        <NotificationManager notifications={notifications} onDelete={deleteNotification} onSubmitResponse={handleResponseSubmission} />
        <Simulator onSubmit={addNotification} setSelectedNotification={setSelectedNotification} />
        <Calendar tasks={taskList} /> {/* Updated prop */}
      </div>
    </div>
  );
}

export default Homepage;

