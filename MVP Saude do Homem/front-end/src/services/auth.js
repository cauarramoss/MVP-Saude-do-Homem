import api from './api';

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  return data; // { access_token }
}

export async function registerUser(payload) {
  const { data } = await api.post('/users', payload);
  return data;
}