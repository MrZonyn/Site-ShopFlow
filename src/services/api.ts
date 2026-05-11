import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3333/api",
  timeout: 10000,
});

// Interceptor de resposta para lidar com erros globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ?? "Ocorreu um erro inesperado.";
    console.error("API Error:", message);
    return Promise.reject(error);
  },
);
