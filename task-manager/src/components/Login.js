import React, { useState } from 'react';
import api from '../api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/login/', { username, password });
      // Редирект на страницу задач после успешного логина
    } catch (error) {
      setError('Ошибка при входе');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      {error && <p>{error}</p>}
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Вход</button>
    </form>
  );
}

export default Login;
