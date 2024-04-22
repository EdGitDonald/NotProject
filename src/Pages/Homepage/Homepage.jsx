import React, { useState } from 'react';
import NotificationManager from '../../Compenents/NotificationsManager/NotificationManager';
import Simulator from '../../Compenents/Simulator/Simulator';



function Homepage() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications([...notifications, notification]);
  };

  const deleteNotification = (notification) => {
    const updatedNotifications = notifications.filter((n) => n !== notification);
    setNotifications(updatedNotifications);
  };


  return (
    <div>
      <NotificationManager notifications={notifications} onDelete={deleteNotification}/>
      <Simulator onSubmit={addNotification} />
    </div>
  );
}

export default Homepage;