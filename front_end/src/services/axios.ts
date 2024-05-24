import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { isTokenExpiration, getAccessToken, setAccessToken, setRefreshToken, removeAccessToken, removeRefreshToken } from "@/utils";
import AuthService from "./AuthService";

export const getBaseUrl = () => {
  if (import.meta.env.MODE === 'development') {
    return import.meta.env.VITE_SERVER_URL;
  }

  return import.meta.env.VITE_SERVER_URL;
};

const instance: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
});

instance.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    request.headers['Content-Type'] = 'application/json' // Change to your preferred content type
    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.request.use(
  async (request: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    let newHeaders = { ...request.headers }
    if (accessToken) {
      newHeaders = {
        ...request.headers,
        Authorization: "Bearer " + accessToken,
      };
      // create new access token when expired
      if (isTokenExpiration(accessToken)) {
        const response = await AuthService.refreshToken()
        if (response) {
          const accessToken = response.data.data.access_token
          const refreshToken = response.data.data.refresh_token
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          newHeaders = {
            ...request.headers,
            Authorization: "Bearer " + accessToken,
          };
        }
      }
    }
    request = { ...request, headers: newHeaders as AxiosRequestHeaders };
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
    // remove token when invalid
    removeAccessToken()
    removeRefreshToken()
    // Handle errors or responses with non-2xx status codes
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({ message: 'Unknown error' });
    }
  },
);

export default instance;
