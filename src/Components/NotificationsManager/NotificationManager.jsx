import React, { useState } from 'react';
import { ImCross } from "react-icons/im";
import './NotificationManager.css';

function NotificationManager({ notifications, onDelete, onSubmitResponse }) {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [response, setResponse] = useState('');
  const [highPriorityCount, setHighPriorityCount] = useState(0);
  const [mediumPriorityCount, setMediumPriorityCount] = useState(0);
  const [lowPriorityCount, setLowPriorityCount] = useState(0);

  const handleSubmitResponse = (event) => {
    event.preventDefault();
    // Handle response submission logic...
    switch (selectedNotification.priority) {
      case 'High':
        setHighPriorityCount(highPriorityCount - 1);
        break;
      case 'Medium':
        setMediumPriorityCount(mediumPriorityCount - 1);
        break;
      case 'Low':
        setLowPriorityCount(lowPriorityCount - 1);
        break;
      default:
        break;
    }
    setSelectedNotification(null);
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setExpanded(false);
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
    return (
      <div className="notification-scrollable">
        {filteredNotifications
          .filter((notification) => notification.priority === priority)
          .map((notification) => (
            <div
              key={notification.id}
              className={`notification-card ${selectedNotification === notification ? 'selected' : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="notification-banner">
                <img src="path/to/logo.png" alt="Logo" className="logo" />
                <p>{notification.sender}</p>
                <button onClick={() => onDelete(notification)}><ImCross />
</button>
              </div>
              <div className="notification-content">
                <p>{notification.message}</p>
                <p>Source: {notification.source}</p>
                <p>Priority: {notification.priority}</p>
              </div>
            </div>
          ))}
      </div>
    );
  };

  const renderMoreFromSender = () => {
    if (!selectedNotification) return null;
    const sender = selectedNotification.sender;
    const notificationsFromSender = filteredNotifications.filter((notification) => notification.sender === sender);

    const toggleExpand = () => {
      setExpanded(!expanded);
    };

    return (
      <div>
        <div className="content-box">
          <div className="notification-card selected">
            <img src="path/to/logo.png" alt="Logo" className="logo" /> {/* Placeholder for logo */}
            <div>
              <p>Source: {selectedNotification.source}</p>
              <p>Sender: {selectedNotification.sender}</p>
              <p>Message: {selectedNotification.message}</p>
              <p>Priority: {selectedNotification.priority}</p>
            </div>
            <button onClick={() => onDelete(selectedNotification)}><ImCross />
</button>
          </div>
        </div>
        {notificationsFromSender.length > 1 && (
          <div className="expand-tab" onClick={toggleExpand}>
            <p>{expanded ? 'Collapse' : 'Expand'}</p>
          </div>
        )}
        {expanded && (
          <div className="notification-scrollable">
            {notificationsFromSender.map((notification, index) => (
              <div key={index} className="notification-card">
                <img src="path/to/logo.png" alt="Logo" className="logo" /> {/* Placeholder for logo */}
                <div>
                  <p>Source: {notification.source}</p>
                  <p>Sender: {notification.sender}</p>
                  <p>Message: {notification.message}</p>
                  <p>Priority: {notification.priority}</p>
                </div>
                <button onClick={() => onDelete(notification)}><ImCross />
</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='notificationmanager-container'>
      <div className='notification-container'>
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
            <p className='box red boxstyle1'></p>
            <p className='box boxstyle2'>{countNotifications('High')}</p>
          </div>
          <div className='outline'>
            <p className='box yellow boxstyle1'></p>
            <p className='box boxstyle2'>{countNotifications('Medium')}</p>
          </div>
          <div className='outline'>
            <p className='box green boxstyle1'></p>
            <p className='box boxstyle2'>{countNotifications('Low')}</p>
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
            {renderMoreFromSender()}
          </div>
          <div className='response-box'>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Write your response..."
            />
            <button onClick={handleSubmitResponse}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationManager;











