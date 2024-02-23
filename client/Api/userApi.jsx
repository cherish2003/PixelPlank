import axios from "axios";

axios.defaults.withCredentials = true;

export const loginApi = axios.create({
  baseURL: `${process.env.API_URL}/user/login`,
});
export const registerApi = axios.create({
  baseURL: `${process.env.API_URL}/user/signup`,
});
export const tokenApi = axios.create({
  baseURL: `${process.env.API_URL}/user/refresh`,
});
export const getUserdata = axios.create({
  baseURL: `${process.env.API_URL}/user/getdata`,
});
export const validateToken = axios.create({
  baseURL: `${process.env.API_URL}/user/verifyId`,
});
