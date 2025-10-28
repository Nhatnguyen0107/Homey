// gọi api  chạy ở cổng local 3000
import axios from "axios";

const axiosJson = axios.create({
    baseURL: "http://localhost:3000/api/v1", // json-server
    // baseURL: 'https://demo-be-hhq0.onrender.com/api/v1', // json-server
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosJson;