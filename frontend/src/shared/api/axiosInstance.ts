import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

interface FailedRequest {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
  originalRequestConfig: CustomAxiosRequestConfig;
}

export const api = axios.create({
  baseURL: 'https://finsight.duckdns.org/api/api/v1',
  withCredentials: true
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];
const REFRESH_URL = '/auth/refresh';

const processQueue = (error: any | null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && originalRequest.url !== REFRESH_URL) {
      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
            originalRequestConfig: originalRequest
          });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      } else {
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          isRefreshing = true;

          try {
            console.log('Attempting to refresh token...');
            await api.post(REFRESH_URL);
            console.log('Token refreshed successfully.');

            processQueue(null);
            return api(originalRequest);
          } catch (refreshError: any) {
            console.error('Failed to refresh token:', refreshError);
            processQueue(refreshError);

            if (window.location.pathname !== '/login') {
              window.location.href = '/login';
            }
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }
      }
    }

    return Promise.reject(error);
  }
);