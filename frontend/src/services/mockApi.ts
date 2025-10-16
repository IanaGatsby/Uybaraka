import type {
  Property,
  SearchFilters,
  PropertySearchResponse,
  District,
  MetroStation,
} from '../types/property';
import {
  // mockProperties,
  mockDistricts,
  mockMetroStations,
  getRandomProperties,
  filterProperties,
  getPropertyById,
  getSimilarProperties,
} from '../data/mockData';

// Симуляция задержки сети
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock API для разработки без бэкенда
 * Использует локальные данные вместо HTTP запросов
 */
export const mockAPI = {
  // Получить список недвижимости с фильтрами
  getProperties: async (
    filters: SearchFilters
  ): Promise<PropertySearchResponse> => {
    await delay();

    const filtered = filterProperties(filters);

    // Сортировка
    const sorted = [...filtered].sort((a, b) => {
      if (filters.sortBy === 'price') {
        return filters.sortOrder === 'asc'
          ? a.price - b.price
          : b.price - a.price;
      }
      if (filters.sortBy === 'area') {
        return filters.sortOrder === 'asc' ? a.area - b.area : b.area - a.area;
      }
      if (filters.sortBy === 'date') {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return filters.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });

    // Пагинация
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProperties = sorted.slice(startIndex, endIndex);

    return {
      properties: paginatedProperties,
      total: sorted.length,
      page,
      totalPages: Math.ceil(sorted.length / limit),
    };
  },

  // Получить конкретную недвижимость
  getProperty: async (id: string): Promise<Property> => {
    await delay();

    const property = getPropertyById(id);

    if (!property) {
      throw new Error('Property not found');
    }

    return property;
  },

  // Получить рекомендуемые объекты
  getFeaturedProperties: async (limit: number = 8): Promise<Property[]> => {
    await delay();

    return getRandomProperties(limit);
  },

  // Получить похожие объекты
  getSimilarProperties: async (
    id: string,
    limit: number = 6
  ): Promise<Property[]> => {
    await delay();

    return getSimilarProperties(id, limit);
  },

  // Получить статистику по районам
  getDistricts: async (): Promise<District[]> => {
    await delay();

    return mockDistricts;
  },

  // Получить станции метро
  getMetroStations: async (): Promise<MetroStation[]> => {
    await delay();

    return mockMetroStations;
  },

  // Получить статистику цен
  getPriceStats: async (filters: Partial<SearchFilters>) => {
    await delay();

    const filtered = filterProperties(filters);

    if (filtered.length === 0) {
      return {
        min: 0,
        max: 0,
        avg: 0,
        median: 0,
      };
    }

    const prices = filtered.map((p) => p.price).sort((a, b) => a - b);
    const min = prices[0];
    const max = prices[prices.length - 1];
    const avg = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const median = prices[Math.floor(prices.length / 2)];

    return { min, max, avg, median };
  },
};

// Экспортируем для использования
export default mockAPI;
