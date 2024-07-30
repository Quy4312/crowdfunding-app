import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});
export const axiosPrivate = axios.create({
  baseURL: "http://localhost:4001",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});
