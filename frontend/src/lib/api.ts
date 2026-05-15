import axios from 'axios';

/** Ensure requests hit /api/* (mount path on the Express app). */
function normalizeApiBase(raw: string | undefined): string {
  const fallback = 'http://localhost:5000';
  const trimmed = (raw || fallback).replace(/\/+$/, '');
  if (trimmed.endsWith('/api')) return trimmed;
  return `${trimmed}/api`;
}

const baseURL = normalizeApiBase(process.env.NEXT_PUBLIC_API_URL);

const api = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('ra_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('ra_token');
      const p = window.location.pathname;
      if (!p.startsWith('/admin/login') && !p.startsWith('/signup')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;
