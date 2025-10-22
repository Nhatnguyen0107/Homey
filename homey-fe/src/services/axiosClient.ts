import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "https://demo-be-hhq0.onrender.com/api/v1",
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//  Đồng bộ lại: tất cả dùng "access_token"
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;

