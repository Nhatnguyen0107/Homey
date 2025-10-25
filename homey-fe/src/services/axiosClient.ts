import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "https://demo-be-hhq0.onrender.com/api/v1",
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Luôn đính kèm token
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//  Nếu token hết hạn → xóa token để AuthContext biết logout
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Token hết hạn hoặc không hợp lệ — xóa access_token");
      localStorage.removeItem("access_token");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
