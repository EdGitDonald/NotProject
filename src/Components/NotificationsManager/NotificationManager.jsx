import React, { useState } from 'react';
import './NotificationManager.css';

function NotificationManager({ notifications, onDelete, onSubmitResponse }) {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false); // State for expand/collapse
  const [response, setResponse] = useState('');
  const [highPriorityCount, setHighPriorityCount] = useState(0);
  const [mediumPriorityCount, setMediumPriorityCount] = useState(0);
  const [lowPriorityCount, setLowPriorityCount] = useState(0); 

  const handleSubmitResponse = (event) => {
    event.preventDefault();
    // Handle response submission logic...
    // Remove the notification from the urgency table
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
    // Clear the selected notification
    setSelectedNotification(null);
  };
  

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setExpanded(false); // Collapse additional notifications when a notification is clicked
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
           key={notification.id} // Use a unique identifier as the key
           className={`notification-card ${selectedNotification === notification ? 'selected' : ''}`}
           onClick={() => handleNotificationClick(notification)}
           >
              <p>Sender: {notification.sender}</p>
              <p>Message: {notification.message}</p>
              <p>Priority: {notification.priority}</p>
              <p>Source: {notification.source}</p>
              <button onClick={() => onDelete(notification)}>Delete</button>
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
        {/* Display selected notification */}
        <div className="content-box">
          <div className="notification-card selected">
            <p>Sender: {selectedNotification.sender}</p>
            <p>Message: {selectedNotification.message}</p>
            <p>Priority: {selectedNotification.priority}</p>
            <p>Source: {selectedNotification.source}</p>
            <button onClick={() => onDelete(selectedNotification)}>Delete</button>
          </div>
        </div>
        {/* Display expand/collapse tab */}
        {notificationsFromSender.length > 1 && (
          <div className="expand-tab" onClick={toggleExpand}>
            <p>{expanded ? 'Collapse' : 'Expand'}</p>
          </div>
        )}
        {/* Display additional notifications if expanded */}
        {expanded && (
          <div className="notification-scrollable">
            {notificationsFromSender.map((notification, index) => (
              <div key={index} className="notification-card">
                <p>Sender: {notification.sender}</p>
                <p>Message: {notification.message}</p>
                <p>Priority: {notification.priority}</p>
                <p>Source: {notification.source}</p>
                <button onClick={() => onDelete(notification)}>Delete</button>
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
                <th>High</th>
                <th>Medium</th>
                <th>Low</th>
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










