import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { isTokenExpiration, getAccessToken, setAccessToken, setRefreshToken } from "@/utils";
import AuthService from "./AuthService";

export const getBaseUrl = () => {
  if (import.meta.env.MODE === 'development') {
    return import.meta.env.VITE_SERVER_URL;
  }

  return import.meta.env.VITE_SERVER_URL;
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
    let newHeaders = { ...request.headers }
    if (token) {
      newHeaders = {
        ...request.headers,
        Authorization: "Bearer " + token,
      };
      // create new access token when token is expired
      if (isTokenExpiration(token)) {
        const response = await AuthService.refreshToken()
        const accessToken = response?.data.data.access_token
        const refreshToken = response?.data.data.refresh_token
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        newHeaders = {
          ...request.headers,
          Authorization: "Bearer " + accessToken,
        };
      }
    }
    request = { ...request, headers: newHeaders as AxiosRequestHeaders };
    console.log(request)
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
