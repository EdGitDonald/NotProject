import React from 'react';
import './NotificationManager.css';

function NotificationManager({ notifications, onDelete }) {
  const renderNotifications = (priority) => {
    return notifications
      .filter((notification) => notification.priority === priority)
      .map((notification, index) => (
        <div key={index} className='notification-card'>
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
        <div className='urgency-container'>
          <div className='outline'>
            <p className='box red'></p>
            <p className='box'>N</p>
          </div>
          <div className='outline'>
            <p className='box yellow'></p>
            <p className='box'>N</p>
          </div>
          <div className='outline'>
            <p className='box green'></p>
            <p className='box'>N</p>
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

