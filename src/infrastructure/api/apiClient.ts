// Layer: Infrastructure
// Path: src/infrastructure/api/apiClient.ts

import axios, { AxiosError, AxiosResponse } from 'axios';
import { useAuthStore } from '../../presentation/shared/store/auth.store';
import { IResponse } from '../contracts/IResponse';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Inject JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Validate standard IResponse wrapper
apiClient.interceptors.response.use(
  (response: AxiosResponse<IResponse<any>>) => {
    // Si la API devuelve un status HTTP 200 pero `ok` es falso, lanzamos un error lógico
    if (response.data && response.data.ok === false) {
      return Promise.reject(new Error(response.data.message || 'Error en la petición'));
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Auto-logout si el token expira o es inválido
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
