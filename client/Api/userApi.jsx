import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
export const signupApi = axios.create({
  baseURL: `${process.env.API_URL}/user/signup`,
});
