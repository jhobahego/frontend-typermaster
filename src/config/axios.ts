import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { ENV } from './env.config';

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
    //   toastUtilities.error(getValidationError(status))
      alert(`Error: ${status} - ${error.message}`);
    }
    return Promise.reject(error);
  }
)

export default axiosInstance;