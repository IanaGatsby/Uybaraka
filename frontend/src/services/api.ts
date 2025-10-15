import axios from 'axios';
import type {
  Property,
  SearchFilters,
  PropertySearchResponse,
  District,
  MetroStation,
} from '../types/property';
import mockAPI from './mockApi';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false'; // По умолчанию true

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
    if (USE_MOCK_DATA) {
      console.log('🔵 Using MOCK API - getProperties', filters);
      return mockAPI.getProperties(filters);
    }
    const response = await api.get('/properties', { params: filters });
    return response.data;
  },

  // Получить конкретную недвижимость
  getProperty: async (id: string): Promise<Property> => {
    if (USE_MOCK_DATA) {
      console.log('🔵 Using MOCK API - getProperty', id);
      return mockAPI.getProperty(id);
    }
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  // Получить рекомендуемые объекты
  getFeaturedProperties: async (limit: number = 8): Promise<Property[]> => {
    if (USE_MOCK_DATA) {
      console.log('🔵 Using MOCK API - getFeaturedProperties', limit);
      return mockAPI.getFeaturedProperties(limit);
    }
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
    if (USE_MOCK_DATA) {
      console.log('🔵 Using MOCK API - getSimilarProperties', id, limit);
      return mockAPI.getSimilarProperties(id, limit);
    }
    const response = await api.get(`/properties/${id}/similar`, {
      params: { limit },
    });
    return response.data;
  },

  // Получить статистику по районам
  getDistricts: async (): Promise<District[]> => {
    if (USE_MOCK_DATA) {
      console.log('🔵 Using MOCK API - getDistricts');
      return mockAPI.getDistricts();
    }
    const response = await api.get('/districts');
    return response.data;
  },

  // Получить станции метро
  getMetroStations: async (): Promise<MetroStation[]> => {
    if (USE_MOCK_DATA) {
      console.log('🔵 Using MOCK API - getMetroStations');
      return mockAPI.getMetroStations();
    }
    const response = await api.get('/metro');
    return response.data;
  },

  // Получить статистику цен
  getPriceStats: async (filters: Partial<SearchFilters>) => {
    if (USE_MOCK_DATA) {
      console.log('🔵 Using MOCK API - getPriceStats', filters);
      return mockAPI.getPriceStats(filters);
    }
    const response = await api.get('/properties/stats/prices', {
      params: filters,
    });
    return response.data;
  },
};

export default api;
