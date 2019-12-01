import axios from 'axios';

const apiService = axios.create({
  baseURL: process.env.API_URL,
});

apiService.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if( token ) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiService;