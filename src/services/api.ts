import axios from 'axios';
import store, { validateToken, logout } from '../store';

const api = axios.create({
  baseURL: process.env.API_URL,
});

api.interceptors.request.use(config => {
  const token = validateToken();
  if( token ) {
    config.headers.Authorization = `Bearer ${token.raw}`;
  } else if ( config.url !== 'auth/login' ) {
    console.log( config.url )
    store.dispatch(logout.request());
  }
  return config;
});

export default api;