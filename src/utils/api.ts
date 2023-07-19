import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const baseURL = "https://api.example.com"; // Replace with your API base URL

// Create a new instance of Axios with default configuration
const api: AxiosInstance = axios.create({
  baseURL,
});

// Request interceptor to include the token (if available)
api.interceptors.request.use((config: AxiosRequestConfig<any>) => {
  const token = localStorage.getItem("token"); // Replace with your token retrieval logic
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling error responses
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // Handle error here (e.g., show error messages)
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default api;
