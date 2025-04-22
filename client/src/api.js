import axios from 'axios';

// Should be something like this
const API_URL = 'https://todo-list-api-88jm.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post('/users/login', userData);
  return response.data;
};

export const getTodoLists = async () => {
  const response = await api.get('/todos');
  return response.data;
};

export const createTodoList = async (todoData) => {
  const response = await api.post('/todos', todoData);
  return response.data;
};

export const getTodoListById = async (id) => {
  const response = await api.get(`/todos/${id}`);
  return response.data;
};

export const updateTodoList = async (id, todoData) => {
  const response = await api.put(`/todos/${id}`, todoData);
  return response.data;
};

export const deleteTodoList = async (id) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};

export const addTodoItem = async (listId, itemData) => {
  const response = await api.post(`/todos/${listId}/items`, itemData);
  return response.data;
};

export const updateTodoItem = async (listId, itemId, itemData) => {
  const response = await api.put(`/todos/${listId}/items/${itemId}`, itemData);
  return response.data;
};

export const deleteTodoItem = async (listId, itemId) => {
  const response = await api.delete(`/todos/${listId}/items/${itemId}`);
  return response.data;
};

export default api;
