import axios from 'axios';

const BASE_URL = 'http://localhost:2000/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Add a request interceptor to attach the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
