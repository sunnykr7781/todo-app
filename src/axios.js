import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://todo-backend-5zhn.onrender.com/', 
});

export default axiosInstance;
