import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log("🚀 ~ API_BASE_URL:", API_BASE_URL);

export default axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});
export const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});
