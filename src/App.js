import React, { useState } from 'react';
import './App.css';

const AddTask = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const addTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, newTask]);
    setNewTask('');
  };
  return (
    <div>
      <form onSubmit={addTask}>
        <input value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button type="submit">Lisää</button>
      </form>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

const TaskList = ({ tasks, setTasks }) => {
  const deleteTask = (task) => {
    if (window.confirm(`Delete task ${task}?`) === false) {
      return;
    }else{
      const updatedTasks = tasks.filter((t) => t !== task);
      setTasks(updatedTasks);
    }
  };
  return (
    <div>
      <ol>
        {tasks.map((task, index) => (
          <Task key={index} task={task} deleteTask={deleteTask} />
        ))}
      </ol>
    </div>
  );
};

const Task = ({ task, deleteTask }) => {
  return (
    <div>
      <li>
        {task} <button type="button" onClick={() => deleteTask(task)}>Delete</button>
      </li>
    </div>
  );
};

const App = () => {
  // Function that disables confirmation when deleting a task
  let confirm = 0;
  const confirmationDisable = () => {
    if(confirm === 0){
      confirm = 1;
      document.querySelector('.confirmButton').innerHTML = 'Toggle delete confirmation (disabled)';
      document.querySelector('.confirmButton').style.backgroundColor = 'red';
      document.querySelector('.confirmButton').style.borderColor = 'red';
    }else{
      confirm = 0;
      document.querySelector('.confirmButton').innerHTML = 'Toggle delete confirmation (enabled)';
      document.querySelector('.confirmButton').style.backgroundColor = 'green';
      document.querySelector('.confirmButton').style.borderColor = 'green';
    }
  };
  return (
    <div className='mainDiv'>
      <h1>Task List</h1>
      {/* Button that disables confirmation when deleting a task */}
      <button className='confirmButton' type="button" onClick={() => confirmationDisable()}>Toggle delete confirmation (Enabled)</button>
      {/* Button that clears the task list */}
      <button className='clearButton' type="button" onClick={() => window.location.reload()}>Clear task list</button>
      <br />
      <AddTask />
    </div>
  );
};

export default App;
