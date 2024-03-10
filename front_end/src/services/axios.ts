import axios, {
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";


const getBaseUrl = () => {
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

const getAccessToken = () => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJuZ3V5ZW5naWFsb2MyQGdtYWlsLmNvbSIsImlhdCI6MTY5Njk1MTQ1MiwiZXhwIjoxNjk2OTUyMDUyfQ.BJus-4UjzkLt2SU5XdQtUH-oWQFRH28r-RuFLsM6HjM";
};

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
  (error) => {
    // Handle errors or responses with non-2xx status codes
    return Promise.reject(error);
  },
);

export default instance;
