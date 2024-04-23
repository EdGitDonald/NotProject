import React, { useState } from 'react';
import './NotificationManager.css';

function NotificationManager({ notifications, onDelete }) {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const countNotifications = (priority) => {
    return filteredNotifications.filter((notification) => notification.priority === priority).length;
  };

  const renderNotifications = (priority) => {
    return filteredNotifications
      .filter((notification) => notification.priority === priority)
      .map((notification, index) => (
        <div
          key={index}
          className={`notification-card ${selectedNotification === notification ? 'selected' : ''}`}
          onClick={() => handleNotificationClick(notification)}
        >
          <p>Sender: {notification.sender}</p>
          <p>Message: {notification.message}</p>
          <p>Priority: {notification.priority}</p>
          <p>Source: {notification.source}</p>
          <button onClick={() => onDelete(notification)}>Delete</button>
        </div>
      ));
  };

  return (
    <div className='notificationmanager-container'>
      <div className='notification-container'>
        <h2>Notification Manager</h2>
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search by Sender Name or Source'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className='urgency-container'>
          <div className='outline'>
            <p className='box red'></p>
            <p className='box'>{countNotifications('High')}</p>
          </div>
          <div className='outline'>
            <p className='box yellow'></p>
            <p className='box'>{countNotifications('Medium')}</p>
          </div>
          <div className='outline'>
            <p className='box green'></p>
            <p className='box'>{countNotifications('Low')}</p>
          </div>
        </div>
      </div>
      <div className='response-container'>
        <div className='urgency-table'>
          <table>
            <thead>
              <tr>
                <th>High</th>
                <th>Medium</th>
                <th>Low</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{renderNotifications('High')}</td>
                <td>{renderNotifications('Medium')}</td>
                <td>{renderNotifications('Low')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='response-centre'>
          <div className='content-box'>
            <p>Content</p>
            {selectedNotification && (
              <>
                <p>Sender: {selectedNotification.sender}</p>
                <p>Message: {selectedNotification.message}</p>
                <p>Priority: {selectedNotification.priority}</p>
                <p>Source: {selectedNotification.source}</p>
              </>
            )}
          </div>
          <div className='response-box'>
            <p>Response</p>
            <div>
              <textarea />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationManager;







