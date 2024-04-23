import React, { useState } from 'react';
import NotificationManager from '../../Components/NotificationsManager/NotificationManager';
import Simulator from '../../Components/Simulator/Simulator';



function Homepage() {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);

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


  return (
    <div>
      <NotificationManager notifications={notifications} onDelete={deleteNotification} onSubmitResponse={handleResponseSubmission}/>
      <Simulator onSubmit={addNotification} setSelectedNotification={setSelectedNotification} />
    </div>
  );
}

export default Homepage;