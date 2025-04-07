import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { ENV } from './env.config';
import { toastUtilities, getApiErrorMessage } from '../utils/toast'; // Import toast utilities

// Determinar la URL base según el entorno
const baseURL = ENV.API_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  }
});

// axiosInstance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
//   return setTokenInHeaders(request)
// })

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    const status = error.response?.status
    if (status) {
      const message = getApiErrorMessage(status, error.message);
      toastUtilities.error(message);
    } else {
      // Handle network errors or errors without a status code
      toastUtilities.error('Network Error or Server Unavailable');
    }
    return Promise.reject(error);
  }
)

export default axiosInstance;