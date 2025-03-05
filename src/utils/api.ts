import axios from "axios";
import { clearAuthToken, getAuthToken, isLoggedIn } from "./storage";

const API_BASE_URL = "https://mbl-test-api.onrender.com/v1/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    if (isLoggedIn()) {
      config.headers.Authorization = `Token ${getAuthToken()}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      clearAuthToken();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const fetchItems = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};

export const createItem = async (url: string, newItem: unknown) => {
  const response = await api.post(url, newItem);
  return response.data;
};

export const updateItem = async (url: string, updatedData: unknown) => {
  const response = await api.put(url, updatedData);
  return response.data;
};

export const deleteItem = async (url: string) => {
  await api.delete(url);
};

export default api;
