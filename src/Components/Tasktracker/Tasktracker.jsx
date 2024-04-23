import React, { useState } from 'react';
import './Tasktracker.css';

function Tasktracker() {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [steps, setSteps] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [assignedBy, setAssignedBy] = useState('');
    const [participants, setParticipants] = useState('');
    const [brief, setBrief] = useState('');
    const [showForm, setShowForm] = useState(false); // State to manage visibility of the form

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate taskName (e.g., check if it's not empty)
    if (!taskName.trim()) {
      alert('Please enter a task name');
      return;
    }
     // Add the new task to the tasks list
     const newTask = {
        id: Date.now(), // Assign a unique ID to each task (using timestamp)
        taskName,
        steps,
        dueDate,
        assignedBy,
        participants,
        brief
      };
      setTasks([...tasks, newTask]);
      // Reset form fields
      resetForm();
    };

  const resetForm = () => {
    setTaskName('');
    setSteps('');
    setDueDate('');
    setAssignedBy('');
    setParticipants('');
    setBrief('');
  };

  return (
    <div className='tasktracker-container'>
      <h2>Tasktracker</h2>
      <div className='utility-tab'>
        {/* Dropdown tab */}
        <div className='dropdown-tab'>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Hide Form' : 'Show Form'}
          </button>
        </div>
        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Enter task name'
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
            <textarea
              placeholder='Enter steps'
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            />
            <input
              type='date'
              placeholder='Due date'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <input
              type='text'
              placeholder='Assigned by'
              value={assignedBy}
              onChange={(e) => setAssignedBy(e.target.value)}
            />
            <input
              type='text'
              placeholder='Participants'
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            />
            <textarea
              placeholder='Brief description'
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
            />
            <button type='submit'>Add Task</button>
          </form>
        )}
      </div>
      {/* Task list */}
      <div className='task-list'>
        <h3>Tasks</h3>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.taskName} - {task.dueDate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tasktracker;



