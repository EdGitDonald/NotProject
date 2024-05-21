import React, { useState } from 'react';
import './Tasktracker.css';

function Tasktracker({ onTaskCreation }) { // Updated prop name
    const [taskList, setTaskList] = useState([]); // State for the list of tasks
  const [taskName, setTaskName] = useState(''); // State for the task name input
  const [steps, setSteps] = useState([]); // State for the steps of a task
  const [dueDate, setDueDate] = useState(''); // State for the due date input
  const [assignedBy, setAssignedBy] = useState(''); // State for the assigned by input
  const [participants, setParticipants] = useState(''); // State for the participants input
  const [brief, setBrief] = useState(''); // State for the brief input
  const [showForm, setShowForm] = useState(false); // State for toggling the form visibility
  const [newStep, setNewStep] = useState(''); // State for the new step input
  const [sortByDate, setSortByDate] = useState(''); // State for sorting tasks by date


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!taskName.trim()) {
      alert('Please enter a task name');
      return;
    }
    // Create a new task object with the form data
    const newTask = {
      id: Date.now(),
      taskName,
      steps,
      dueDate,
      assignedBy,
      participants,
      brief,
      originalIndex: taskList.length // Store the original index of the task

    };
   // Add the new task to the task list
   setTaskList([...taskList, newTask]);
   // Reset the form fields
   resetForm();
   // Call the onTaskCreation function prop with the new task data
   onTaskCreation(newTask);
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
      setNewStep('');
    }
  };

  const handleToggleStep = (taskIndex, stepIndex) => {
    const updatedTasks = [...taskList];
    updatedTasks[taskIndex].steps[stepIndex].completed = !updatedTasks[taskIndex].steps[stepIndex].completed;
    setTaskList(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    // Filter out the task with the specified ID
    const updatedTaskList = taskList.filter(task => task.id !== taskId);
    // Update the task list
    setTaskList(updatedTaskList); 
  };


  const getProgress = (task) => {
    const totalSteps = task.steps.length;
    const completedSteps = task.steps.filter(step => step.completed).length;
    return (totalSteps === 0 ? 0 : (completedSteps / totalSteps) * 100);
  };

    // Sort tasks based on the sortByDate state
    const sortedTasks = sortByDate === 'mostRecent' ? [...taskList].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)) :
    sortByDate === 'oldest' ? [...taskList].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) :
    taskList;


  return (
    <div className='tasktracker-container'>
      <h2>Tasktracker</h2>
      <div className='utility-tab'>
      <div className='dropdown-tab'>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Hide Form' : 'Show Form'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className='task-form'>
          <input
            type='text'
            placeholder='Enter task name'
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
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
          <div className='steps-section'>
            <h3>Steps</h3>
            {steps.map((step, index) => (
              <div key={index} className='step'>
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
          <button type='submit'>Add Task</button>
        </form>
      )}
    </div>
      <div className='task-list'>
        <h3>Tasks</h3>
        <div className='filter-section'>
          <h4>Filter</h4>
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
<ul>
  {sortedTasks.map((task, taskIndex) => (
    <li key={task.id} className="task-widget"> {/* Assigned task-widget class */}
      <p className="task-name">{task.taskName}</p> 
     <p>{task.dueDate}</p> {/* Assigned task-name class */}
      <div className="task-details"> {/* Assigned task-details class */}
        <p>By : {task.assignedBy}</p>
        <p>Brief: {task.brief}</p>
      </div>
      <div className="task-steps"> {/* Assigned task-steps class */}
      <div className="progress-bar"> {/* Assigned progress-bar class */}
        <div className="progress-bar-fill" style={{ width: `${getProgress(task)}%` }}></div> {/* Assigned progress-bar-fill class */}
      </div>
      
        <h4>Steps</h4>
        {taskList[task.originalIndex].steps && taskList[task.originalIndex].steps.map((step, stepIndex) => (
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
      <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
    </li>
  ))}
</ul>
      </div>
    </div>
  );
}

export default Tasktracker;











