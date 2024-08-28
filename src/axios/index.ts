import axios from 'axios';
import {API_URL} from '@env';
export type ErrorAxios = {
  message: string;
};

const apiClient = axios.create({
  baseURL: API_URL || 'http://192.168.0.89:3000/api',
});

export default apiClient;
