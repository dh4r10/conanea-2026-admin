import axios, { type AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// =========================
// REQUEST
// =========================
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().authTokens?.access;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =========================
// RESPONSE
// =========================
let isRefreshing = false;

type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else if (token) prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // evitar loop infinito
    if (original.url?.includes('/token/refresh/')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !original._retry) {
      const { authTokens, setAuth, logout } = useAuthStore.getState();

      if (!authTokens?.refresh) {
        logout();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              original.headers!.Authorization = `Bearer ${token}`;
              resolve(api(original));
            },
            reject,
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/token/refresh/`,
          {
            refresh: authTokens.refresh,
          },
        );

        const newAccess = response.data.access;
        const newRefresh = response.data.refresh ?? authTokens.refresh;

        const user = JSON.parse(atob(newAccess.split('.')[1]));

        setAuth({ access: newAccess, refresh: newRefresh }, user);

        processQueue(null, newAccess);

        original.headers!.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch (err) {
        processQueue(err, null);
        logout();
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
