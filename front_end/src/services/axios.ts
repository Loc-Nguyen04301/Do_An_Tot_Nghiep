import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getAccessToken } from "../utils";


export const getBaseUrl = () => {
  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:8000/api/v1';
  }
  return process.env.VITE_SERVER_URL || 'https://example.com';
};


const instance: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
instance.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    const newHeaders = {
      ...request.headers,
      Authorization: "Bearer " + token,
    };
    request = { ...request, headers: newHeaders as AxiosRequestHeaders };
    console.log(request);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Modify the response data before resolving the promise
    // Handle common response processing here
    return response;
  },
  (error: AxiosError) => {
    // Handle errors or responses with non-2xx status codes
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({ message: 'Unknown error' });
    }
  },
);

export default instance;
