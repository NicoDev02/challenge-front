import axios from 'axios';
export type ErrorAxios = {
  message: string;
};

const apiClient = axios.create({
  baseURL: 'http://192.168.0.89:3000/api', // Your API base URL
});

export default apiClient;
