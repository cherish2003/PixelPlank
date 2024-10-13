import axios from "axios";

axios.defaults.withCredentials = true;
export const loginApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/user/login`,
});
export const registerApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/user/signup`,
});
export const tokenApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/user/refresh`,
});
export const getUserdata = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/user/getdata`,
});
export const validateToken = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/user/verifyId`,
});
