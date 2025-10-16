// src/services/axiosClient.ts
import axios from "axios";
import { API_URL } from "../constants";

const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Tự động gắn token vào header
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
