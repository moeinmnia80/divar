import axios from "axios";
import { getCookie, setCookie } from "utils/cookie.js";
import { getNewToken } from "configs/token.js";

const apiMP = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
});
apiMP.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) request.headers.Authorization = `bearer ${accessToken}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);
apiMP.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await getNewToken();
      if (!response?.response) return;
      setCookie(response?.response.data);
      return apiMP(originalRequest);
    }
  },
);
export default apiMP;
