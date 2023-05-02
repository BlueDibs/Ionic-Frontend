import axios from 'axios'
import { config } from '../config'

export const axiosInstance = axios.create({
    baseURL: config.API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

// TO DO
// axiosInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem('user');
// })


