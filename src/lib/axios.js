import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ??
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDYyZDU2ODA4MTJjNjc5ZDkwNWE4NSIsImlhdCI6MTc2MjA4ODQ2MCwiZXhwIjoxNzYyNjkzMjYwfQ.NoFtMph7R1K1espayNGvwJiYugr8C4XYgknk2V_yk60";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
