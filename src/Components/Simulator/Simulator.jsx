import React, { useState } from 'react';
import './Simulator.css';

function Simulator({onSubmit}) {
  // State variables to store notification details
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('');
  const [source, setSource] = useState('');

  // Function to generate random content for inputs
  const generateRandomContent = () => {
    const senders = ['John Doe', 'Jane Smith', 'Alice Johnson'];
    const messages = [
      'Task reminder',
      'Meeting notification',
      'Project update',
      'Deadline reminder',
      'Team status update',
      'Client meeting confirmation',
      'New project assignment',
      'Training session reminder',
      'Feedback request',
      'Budget review meeting notice',
      'Product launch update',
      'Employee appreciation announcement',
      'Policy change notification',
      'Holiday office closure notice',
      'Performance evaluation reminder',
      'Internal training announcement',
      'Sales target achievement celebration',
      'Security protocol update',
      'Customer support meeting agenda',
      'Team-building event invitation'
    ];
    const priorities = ['High', 'Medium', 'Low'];
    const sources = ['Slack', 'Microsoft Teams', 'Skype', 'Google Hangouts', 'Zoom', 'WhatsApp', 'Facebook Workplace', 'LinkedIn', 'Telegram', 'Discord', 'HipChat', 'Yammer', 'Mattermost', 'Flock', 'Rocket.Chat'];


    const randomSender = senders[Math.floor(Math.random() * senders.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
    const randomSource = sources[Math.floor(Math.random() * sources.length)];

    setSender(randomSender);
    setMessage(randomMessage);
    setPriority(randomPriority);
    setSource(randomSource);
  };

  // Function to handle form submission and generate notification
  const handleSubmit = (event) => {
    event.preventDefault();
    // Generate random content for inputs
    generateRandomContent();
    // Call the onSubmit callback with the generated notification data
    onSubmit({ sender, message, priority, source });
  };

  return (
    <div className='simulator-container' style={{ position: 'fixed', top: '440px', right: '900px', zIndex: '1000' }}>
      <h2>Notification Generator</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="sender">Sender:</label>
          <input
            type="text"
            id="sender"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="source">Source:</label>
          <input
            type="text"
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <button type="submit">Generate Notification</button>
      </form>
    </div>
  );
}

export default Simulator;






