import React, { useState } from 'react';
import './App.css';

const AddTask = ({ addTask }) => {
  const [newTaskHeader, setNewTaskHeader] = useState('');
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTaskHeader, newTask);
    setNewTaskHeader('');
    setNewTask('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Task Title</label><br/>
        <input value={newTaskHeader} onChange={(e) => setNewTaskHeader(e.target.value)} /><br/>
        <label>Task Description</label><br/>
        <input value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

const TaskList = ({ tasks, deleteTask, editTask }) => {
  return (
    <div>
      <ul>
        {tasks.map((task, index) => (
          <Task key={index} task={task} deleteTask={() => deleteTask(index)} editTask={(newHeader, newDescription) => editTask(index, newHeader, newDescription)} />
        ))}
      </ul>
    </div>
  );
};

const Task = ({ task, deleteTask, editTask }) => {
  const handleEditClick = () => {
    const newHeader = prompt('Enter a new header:', task.header);
    const newDescription = prompt('Enter a new description:', task.description);

    if (newHeader !== null && newDescription !== null) {
      editTask(newHeader, newDescription);
    }
  };

  return (
    <div>
      <li>
        {task.header && <h3>{task.header}</h3>}
        {task.description}
        <button type="button" onClick={handleEditClick}>Edit</button>
        <button type="button" onClick={deleteTask}>Delete</button>
      </li>
    </div>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isConfirmationEnabled, setIsConfirmationEnabled] = useState(true);

  const addTask = (header, description) => {
    const newTask = { header, description };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (index) => {
    if (!isConfirmationEnabled || window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    }
  };

  const toggleConfirmation = () => {
    setIsConfirmationEnabled(!isConfirmationEnabled);
  };

  const clearTaskList = () => {
    if (!isConfirmationEnabled || window.confirm('Are you sure you want to clear the task list?')) {
      setTasks([]);
    } else {
      return;
    }
  };

  const confirmationButtonClass = isConfirmationEnabled ? 'confirmButtonEnabled' : 'confirmButtonDisabled';

  const editTask = (index, newHeader, newDescription) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, header: newHeader, description: newDescription } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className='mainDiv'>
      <h1>Task List</h1>
      <button className={`confirmButton ${confirmationButtonClass}`} type="button" onClick={toggleConfirmation}>
        Toggle delete confirmation ({isConfirmationEnabled ? 'Enabled' : 'Disabled'})
      </button>
      <br/>
      <button className='clearButton' type="button" onClick={clearTaskList}>Clear task list</button>
      <br />
      <AddTask addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={handleDeleteTask} editTask={editTask} />
    </div>
  );
};

export default App;
