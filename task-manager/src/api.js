import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // замените на ваш базовый URL
});

export default api;
