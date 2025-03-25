import axios from 'axios';
import { getToken } from '../utils/tokenUtils';

const API_URL = 'http://localhost:5042/api';

const authAxios = axios.create({
  baseURL: API_URL
});

authAxios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

const apiClient = axios.create({
  baseURL: API_URL
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getTaskHistory = async (userId, startDate, endDate) => {
  try {
    const params = {
      userId,
      ...(startDate && { startDate }),
      ...(endDate && { endDate })
    };
    const response = await apiClient.get('/Task/history', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching task history:', error);
    throw error;
  }
};