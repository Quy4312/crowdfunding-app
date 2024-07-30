import axios from "axios";
export default axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});
export const axiosPrivate = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});
