import axios from "axios";

import { API_BASE_URL } from "../utils/constants";


// ==================================================
// Axios Instance
// ==================================================

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


// ==================================================
// Request Interceptor
// ==================================================

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// ==================================================
// Response Interceptor
// ==================================================

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.detail ||
      error?.response?.data?.message ||
      error?.message ||
      "An unexpected error occurred.";

    return Promise.reject(
      new Error(message)
    );
  }
);


// ==================================================
// API Methods
// ==================================================

export const api = {
  get: async (url, config = {}) => {
    const response =
      await apiClient.get(url, config);

    return response.data;
  },

  post: async (
    url,
    data,
    config = {}
  ) => {
    const response =
      await apiClient.post(
        url,
        data,
        config
      );

    return response.data;
  },

  put: async (
    url,
    data,
    config = {}
  ) => {
    const response =
      await apiClient.put(
        url,
        data,
        config
      );

    return response.data;
  },

  patch: async (
    url,
    data,
    config = {}
  ) => {
    const response =
      await apiClient.patch(
        url,
        data,
        config
      );

    return response.data;
  },

  delete: async (
    url,
    config = {}
  ) => {
    const response =
      await apiClient.delete(
        url,
        config
      );

    return response.data;
  },
};

export default apiClient;