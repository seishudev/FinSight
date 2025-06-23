import axios from 'axios';
import type { FailedRequest } from '../model/ApiTypes';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  withCredentials: true
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await api.post('/auth/refresh');
      return api(originalRequest);
    } catch (err) {
      processQueue(err);
      window.location.href = '/login';
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }

    return Promise.reject(error);
  }
);
