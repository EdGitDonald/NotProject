import React, { useState } from 'react';
import './Tasktracker.css';

function Tasktracker() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [steps, setSteps] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [assignedBy, setAssignedBy] = useState('');
  const [participants, setParticipants] = useState('');
  const [brief, setBrief] = useState('');
  const [showForm, setShowForm] = useState(false); // State to manage visibility of the form
  const [newStep, setNewStep] = useState(''); // State to store new step being added
  const [sortByDate, setSortByDate] = useState(''); // State to determine sorting order

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
      brief,
      originalIndex: tasks.length // Store the original index
    };
    setTasks([...tasks, newTask]);
    // Reset form fields
    resetForm();
  };

  const resetForm = () => {
    setTaskName('');
    setSteps([]);
    setDueDate('');
    setAssignedBy('');
    setParticipants('');
    setBrief('');
    setNewStep('');
  };

  const handleAddStep = () => {
    if (newStep.trim()) {
      setSteps([...steps, { name: newStep, completed: false }]);
      setNewStep(''); // Clear the input field
    }
  };

  const handleToggleStep = (taskIndex, stepIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].steps[stepIndex].completed = !updatedTasks[taskIndex].steps[stepIndex].completed;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedSortedTasks = sortedTasks.filter(task => task.id !== taskId);
    setTasks(updatedSortedTasks); // Update the original tasks as well for consistency
  };

  // Progress bar calculation
  const getProgress = (task) => {
    const totalSteps = task.steps.length;
    const completedSteps = task.steps.filter(step => step.completed).length;
    return (totalSteps === 0 ? 0 : (completedSteps / totalSteps) * 100);
  };

  // Sorting function
  const sortedTasks = sortByDate === 'mostRecent' ? [...tasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)) :
    sortByDate === 'oldest' ? [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) :
    tasks;

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
            {/* Steps checkboxes */}
            <div>
              <h3>Steps</h3>
              {steps.map((step, index) => (
                <div key={index}>
                  <input
                    type='checkbox'
                    checked={step.completed}
                    onChange={() => handleToggleStep(index)}
                  />
                  <label>{step.name}</label>
                </div>
              ))}
              <input
                type='text'
                placeholder='Add step'
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
              />
              <button type='button' onClick={handleAddStep}>
                Add Step
              </button>
            </div>
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
        <div className='filter-section'>
          <h4>Filter</h4>
          {/* Sorting options */}
          <div>
            <label>
              Sort by Date:
              <select value={sortByDate} onChange={(e) => setSortByDate(e.target.value)}>
                <option value=''>-- Select --</option>
                <option value='mostRecent'>Most Recent</option>
                <option value='oldest'>Oldest</option>
              </select>
            </label>
          </div>
        </div>
        {/* Task list */}
        <ul>
          {sortedTasks.map((task, taskIndex) => (
            <li key={task.id}>
              <p>{task.taskName} - {task.dueDate}</p>
              <p>Assigned By : {task.assignedBy}</p>
              <p>Brief : {task.brief}</p>
            <div>
                <h4>Steps</h4>
                {tasks[task.originalIndex].steps && tasks[task.originalIndex].steps.map((step, stepIndex) => (
                <div key={stepIndex}>
                <input
                 type='checkbox'
                 checked={step.completed}
                 onChange={() => handleToggleStep(task.originalIndex, stepIndex)}
                />
                <label>{step.name}</label>
            </div>
))}
              </div>
              {/* Progress bar */}
              <div className='progress-bar'>
                <div className='progress-bar-fill' style={{ width: `${getProgress(task)}%` }}></div>
              </div>
              {/* Delete button */}
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tasktracker;










