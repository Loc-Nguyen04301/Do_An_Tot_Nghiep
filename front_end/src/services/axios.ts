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
    let newHeaders = { ...request.headers }

    const accessToken = getAccessToken();
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
    console.log(error)
    // remove token when invalid (401 Unauthorization)
    if (error.response && error.response.status === 401 && error.response.data) {
      removeAccessToken()
      removeRefreshToken()
    }
    if (error.response && error.response.status !== 401 && error.response.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({ message: 'Axios response error' });
    }
  },
);

export default instance;
