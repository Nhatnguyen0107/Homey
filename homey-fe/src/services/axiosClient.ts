import axios from "axios";

// Dùng trực tiếp URL API backend của bạn trên Render
const axiosClient = axios.create({
  // baseURL: "http://localhost:3000/api/v1",

  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
