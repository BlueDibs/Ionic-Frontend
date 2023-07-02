import axios from 'axios';
import { config } from '../config';
import { app } from './firebase';
import { getAuth } from 'firebase/auth';

export const axiosInstance = axios.create({
  baseURL: config.API_URL,
});

// // TO DO
axiosInstance.interceptors.request.use(async (config) => {
  try {
    const token = JSON.parse(localStorage.getItem('user') || '');
    const auth = getAuth(app);
    const idToken = await auth?.currentUser?.getIdToken(false);
    if (token.user) config.headers.Authorization = `Bearer ${idToken}`;
  } catch (err) {}
  return config;
});
