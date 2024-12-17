// src/App.js
import React, { useState, useEffect } from 'react';
import axios from './axios'; 
import TaskList from './components/TaskList'; 
import TaskForm from './components/TaskForm'; 


const App = () => {
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);


  const addTask = async (newTask) => {
    try {
      const response = await axios.post('/tasks', { task: newTask });
      const addedTask = response.data;
      setTasks([...tasks, addedTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <h5>todo app</h5>
      <h1 className='main'>Add Task</h1>
     <div className='flex'>
     <TaskForm addTask={addTask} /> 
     <TaskList tasks={tasks} setTasks={setTasks} /> 
     </div>
      
    </div>
  );
};

export default App;
