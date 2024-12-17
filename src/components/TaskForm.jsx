import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);  
      setTask('');    
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={task} 
        onChange={handleChange} 
        placeholder="Add a new task" 
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
