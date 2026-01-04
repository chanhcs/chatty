import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.MODE === 'development'
    ? 'http://localhost:5001/api'
    : '/api',
  timeout: 8000,
  withCredentials: true,
});

export default api