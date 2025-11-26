import api from './api';

export async function fetchUsers() {
  const { data } = await api.get('/users');
  return data;
}

export async function fetchUser(id) {
  const { data } = await api.get(`/users/${id}`);
  return data;
}

export async function updateUser(id, payload) {
  const { data } = await api.put(`/users/${id}`, payload);
  return data;
}

export async function deleteUser(id) {
  const { data } = await api.delete(`/users/${id}`);
  return data;
}