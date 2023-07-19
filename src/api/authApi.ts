import axios from "axios";
import { LoginInput } from "../pages/login.page";
import { RegisterInput } from "../pages/register.page";
import { GenericResponse, ILoginResponse, IUserResponse, IUser } from "./types";

// const BASE_URL = process.env.API_URL;
const BASE_URL = `/api`;
console.log(BASE_URL);

const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const refreshAccessTokenFn = async () => {
  const response = await authApi.get<ILoginResponse>("auth/refresh");
  return response.data;
};

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data.message as string;
    if (errMessage.includes("not logged in") && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAccessTokenFn();
      return authApi(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const signUpUser = async (user: RegisterInput) => {
  const response = await authApi.post<GenericResponse>("auth/register", user);
  return response.data;
};

export const loginUser = async (user: LoginInput) => {
  const response = await authApi.post<ILoginResponse>("auth/login", user);
  return response.data;
};

export const verifyEmail = async (verificationCode: string) => {
  const response = await authApi.get<GenericResponse>(
    `auth/verifyemail/${verificationCode}`
  );
  return response.data;
};

export const logoutUser = async () => {
  const response = await authApi.get<GenericResponse>("auth/logout");
  return response.data;
};

export const getMe = async (token: string) => {
  const response = await authApi.get<IUser>("user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};