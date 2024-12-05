import React, { useState, useEffect } from 'react';
import api from '../api';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks/');
      setTasks(response.data);
    } catch (error) {
      setError('Ошибка при загрузке задач');
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks/', { title, description });
      fetchTasks();
    } catch (error) {
      setError('Ошибка при добавлении задачи');
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}/`);
      fetchTasks();
    } catch (error) {
      setError('Ошибка при удалении задачи');
    }
  };

  return (
    <div>
      <h2>Задачи</h2>
      {error && <p>{error}</p>}
      <form onSubmit={addTask}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <button type="submit">Добавить задачу</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.description}
            <button onClick={() => deleteTask(task.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
