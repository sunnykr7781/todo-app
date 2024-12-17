
import React, { useState } from 'react';
import axios from '../axios'; 

const TaskList = ({ tasks, setTasks }) => {
  const [editingTask, setEditingTask] = useState(null);  
  const [updatedTask, setUpdatedTask] = useState('');  


  const toggleComplete = async (id, currentStatus) => {
    try {

      const updatedTask = await axios.put(`/tasks/${id}`, {
        completed: !currentStatus
      });

      const updatedTasks = tasks.map((task) =>
        task._id === id ? updatedTask.data : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task completion:', error);
    }
  };


  const startEditing = (task) => {
    setEditingTask(task);
    setUpdatedTask(task.task); 
  };


  const handleUpdateTask = async (id) => {
    try {
      const updated = await axios.put(`/tasks/${id}`, { task: updatedTask });
      const updatedTasks = tasks.map((task) =>
        task._id === id ? updated.data : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);  
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };


  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      const filteredTasks = tasks.filter((task) => task._id !== id);
      setTasks(filteredTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className='mn'>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={{ marginBottom: '10px' }}>

            {editingTask && editingTask._id === task._id ? (
              <div>
                <input
                  type="text"
                  value={updatedTask}
                  onChange={(e) => setUpdatedTask(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <button onClick={() => handleUpdateTask(task._id)}>Save</button>
              </div>
            ) : (
              <div>
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    marginRight: '10px'
                  }}
                >
                  {task.task}
                </span>


                <button onClick={() => toggleComplete(task._id, task.completed)}>
                  {task.completed ? 'Mark as Not Completed' : 'Mark as Completed'}
                </button>


                <button onClick={() => startEditing(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
