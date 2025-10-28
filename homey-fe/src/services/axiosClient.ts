import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "https://demo-be-hhq0.onrender.com/api/v1",
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Gắn token tự động
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
