import React, { useState } from 'react';
import './Tasktracker.css';

function Tasktracker({ onTaskCreation }) { // Updated prop name
  const [taskList, setTaskList] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [steps, setSteps] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [assignedBy, setAssignedBy] = useState('');
  const [participants, setParticipants] = useState('');
  const [brief, setBrief] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newStep, setNewStep] = useState('');
  const [sortByDate, setSortByDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!taskName.trim()) {
      alert('Please enter a task name');
      return;
    }
    const newTask = {
      id: Date.now(),
      taskName,
      steps,
      dueDate,
      assignedBy,
      participants,
      brief,
      originalIndex: taskList.length
    };
    setTaskList([...taskList, newTask]);
    resetForm();
    // Call the onTaskCreation function prop with the new task data
    onTaskCreation(newTask); // Updated prop function call
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
    const updatedSortedTasks = taskList.filter(task => task.id !== taskId);
    setTaskList(updatedSortedTasks);
  };

  const getProgress = (task) => {
    const totalSteps = task.steps.length;
    const completedSteps = task.steps.filter(step => step.completed).length;
    return (totalSteps === 0 ? 0 : (completedSteps / totalSteps) * 100);
  };

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
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Enter task name'
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
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
            <li key={task.id}>
              <p>{task.taskName} - {task.dueDate}</p>
              <p>Assigned By : {task.assignedBy}</p>
              <p>Brief : {task.brief}</p>
              <div>
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
              <div className='progress-bar'>
                <div className='progress-bar-fill' style={{ width: `${getProgress(task)}%` }}></div>
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











