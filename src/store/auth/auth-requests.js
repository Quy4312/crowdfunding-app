import axios from "api/axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const requestAuthRegister = (data) => {
  return axios.post(`${API_BASE_URL}/auth/register`, { ...data });
};
export const requestAuthLogin = (data) => {
  return axios.post(`${API_BASE_URL}/auth/login`, { ...data });
};
export const requestAuthFetchMe = (token) => {
  if (!token) return;
  return axios.get(`${API_BASE_URL}/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const requestAuthRefreshToken = (token) => {
  if (!token) return;
  return axios.post(`${API_BASE_URL}/token`, {
    "Content-Type": "application/json",
    refreshToken: token,
  });
};
