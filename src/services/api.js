import axios from "axios";
import config from "../utilities/config";

const api = axios.create({
  baseURL: config.baseURL,
});

api.interceptors.request.use(
  function (config) {
    const token = '';

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

export default api;