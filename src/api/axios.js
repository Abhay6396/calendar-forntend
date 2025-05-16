import axios from 'axios';

const API = axios.create({
  baseURL: 'https://calendar-backend-srdy.onrender.com/api', // Update if hosted elsewhere
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
