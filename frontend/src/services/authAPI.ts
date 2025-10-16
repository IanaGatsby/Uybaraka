import axios from 'axios';
import type { User, UserLogin, UserRegistration } from '../types/user';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false';

// Создаем axios instance
const authApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor для добавления токена
authApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor для обработки ошибок
authApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Если 401 и это не повторный запрос
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Пытаемся обновить токен
        const { data } = await authApiClient.post('/auth/refresh');
        localStorage.setItem('token', data.token);

        // Повторяем оригинальный запрос
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return authApiClient(originalRequest);
      } catch (refreshError) {
        // Если обновление токена не удалось, разлогиниваем
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Mock данные для разработки
const mockAuthAPI = {
  login: async (credentials: UserLogin) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Имитация задержки

    // Простая проверка (для демо)
    if (
      credentials.email === 'demo@uybaraka.uz' &&
      credentials.password === 'demo123'
    ) {
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: '1',
          email: credentials.email,
          phone: '+998901234567',
          firstName: 'Демо',
          lastName: 'Пользователь',
          role: 'owner' as const,
          status: 'active' as const,
          totalListings: 5,
          activeListings: 3,
          soldListings: 2,
          isVerified: true,
          balance: 100,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as User,
      };
    }

    throw new Error('Неверный email или пароль');
  },

  register: async (userData: UserRegistration) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '2',
        email: userData.email,
        phone: userData.phone,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        status: 'active' as const,
        companyName: userData.companyName,
        inn: userData.inn,
        agencyName: userData.agencyName,
        totalListings: 0,
        activeListings: 0,
        soldListings: 0,
        isVerified: false,
        balance: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as User,
    };
  },

  logout: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
  },

  getCurrentUser: async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      id: '1',
      email: 'demo@uybaraka.uz',
      phone: '+998901234567',
      firstName: 'Демо',
      lastName: 'Пользователь',
      role: 'owner' as const,
      status: 'active' as const,
      totalListings: 5,
      activeListings: 3,
      soldListings: 2,
      isVerified: true,
      balance: 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as User;
  },

  refreshToken: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      token: 'mock-jwt-token-refreshed-' + Date.now(),
      user: {
        id: '1',
        email: 'demo@uybaraka.uz',
        phone: '+998901234567',
        firstName: 'Демо',
        lastName: 'Пользователь',
        role: 'owner' as const,
        status: 'active' as const,
        totalListings: 5,
        activeListings: 3,
        soldListings: 2,
        isVerified: true,
        balance: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as User,
    };
  },

  forgotPassword: async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      message: 'Письмо для восстановления пароля отправлено',
    };
  },
};

// API функции
export const authAPI = {
  // Вход
  login: async (credentials: UserLogin) => {
    if (USE_MOCK_DATA) {
      console.log('🔵 Using MOCK AUTH API - login');
      return mockAuthAPI.login(credentials);
    }

    const response = await authApiClient.post('/auth/login', credentials);
    return response.data;
  },

  // Регистрация
  register: async (userData: UserRegistration) => {
    if (USE_MOCK_DATA) {
      console.log('🔵 Using MOCK AUTH API - register');
      return mockAuthAPI.register(userData);
    }

    const response = await authApiClient.post('/auth/register', userData);
    return response.data;
  },

  // Выход
  logout: async () => {
    if (USE_MOCK_DATA) {
      console.log('🔵 Using MOCK AUTH API - logout');
      return mockAuthAPI.logout();
    }

    const response = await authApiClient.post('/auth/logout');
    return response.data;
  },

  // Получить текущего пользователя
  getCurrentUser: async () => {
    if (USE_MOCK_DATA) {
      console.log('🔵 Using MOCK AUTH API - getCurrentUser');
      return mockAuthAPI.getCurrentUser();
    }

    const response = await authApiClient.get('/auth/me');
    return response.data;
  },

  // Обновить токен
  refreshToken: async () => {
    if (USE_MOCK_DATA) {
      console.log('🔵 Using MOCK AUTH API - refreshToken');
      return mockAuthAPI.refreshToken();
    }

    const response = await authApiClient.post('/auth/refresh');
    return response.data;
  },

  // Восстановление пароля
  forgotPassword: async (email: string) => {
    if (USE_MOCK_DATA) {
      console.log('🔵 Using MOCK AUTH API - forgotPassword');
      return mockAuthAPI.forgotPassword(email);
    }

    const response = await authApiClient.post('/auth/forgot-password', {
      email,
    });
    return response.data;
  },

  // Сброс пароля
  resetPassword: async (token: string, newPassword: string) => {
    const response = await authApiClient.post('/auth/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  },
};

export default authApiClient;
