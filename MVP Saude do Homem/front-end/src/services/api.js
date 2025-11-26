import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('user');
  if (stored) {
    const { token, access_token } = JSON.parse(stored);
    const bearer = access_token || token;
    if (bearer) {
      config.headers.Authorization = `Bearer ${bearer}`;
    }
  }
  return config;
});

export default api;