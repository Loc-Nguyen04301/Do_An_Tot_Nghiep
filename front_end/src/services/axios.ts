import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { checkTokenExpiration, getAccessToken, setAccessToken } from "../utils";
import AuthService from "./AuthService";


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
  async (request: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    let newHeaders
    if (token) {
      newHeaders = {
        ...request.headers,
        Authorization: "Bearer " + token,
      };
      if (checkTokenExpiration(token)) {
        console.log("token expired");
        const response = await AuthService.refreshToken()
        const new_token = response.data.data.access_token
        setAccessToken(new_token);
        newHeaders = {
          ...request.headers,
          Authorization: "Bearer " + new_token,
        };
      }
    }

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
