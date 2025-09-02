import axios from 'axios';
import type {
  Property,
  SearchFilters,
  PropertySearchResponse,
  District,
  MetroStation,
} from '../types/property';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const propertyAPI = {
  // Получить список недвижимости с фильтрами
  getProperties: async (
    filters: SearchFilters
  ): Promise<PropertySearchResponse> => {
    const response = await api.get('/properties', { params: filters });
    return response.data;
  },

  // Получить конкретную недвижимость
  getProperty: async (id: string): Promise<Property> => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  // Получить рекомендуемые объекты
  getFeaturedProperties: async (limit: number = 8): Promise<Property[]> => {
    const response = await api.get('/properties/featured', {
      params: { limit },
    });
    return response.data;
  },

  // Получить похожие объекты
  getSimilarProperties: async (
    id: string,
    limit: number = 6
  ): Promise<Property[]> => {
    const response = await api.get(`/properties/${id}/similar`, {
      params: { limit },
    });
    return response.data;
  },

  // Получить статистику по районам
  getDistricts: async (): Promise<District[]> => {
    const response = await api.get('/districts');
    return response.data;
  },

  // Получить станции метро
  getMetroStations: async (): Promise<MetroStation[]> => {
    const response = await api.get('/metro');
    return response.data;
  },

  // Получить статистику цен
  getPriceStats: async (filters: Partial<SearchFilters>) => {
    const response = await api.get('/properties/stats/prices', {
      params: filters,
    });
    return response.data;
  },
};

export default api;
