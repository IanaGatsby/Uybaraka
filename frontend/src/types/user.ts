// Типы пользователей
export type UserRole = 'developer' | 'owner' | 'realtor' | 'admin';

export type UserStatus = 'active' | 'blocked' | 'pending';

// Интерфейс пользователя
export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  createdAt: string;
  updatedAt: string;

  // Для застройщиков
  companyName?: string;
  companyLogo?: string;
  companyDescription?: string;
  inn?: string; // ИНН компании

  // Для риэлторов
  agencyName?: string;
  agencyLogo?: string;
  licenseNumber?: string;

  // Статистика
  totalListings: number;
  activeListings: number;
  soldListings: number;
  rating?: number;
  reviewsCount?: number;

  // Верификация
  isVerified: boolean;
  verifiedAt?: string;

  // Баланс
  balance: number;
}

// Регистрация пользователя
export interface UserRegistration {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;

  // Для юридических лиц
  companyName?: string;
  inn?: string;
  agencyName?: string;
}

// Вход пользователя
export interface UserLogin {
  email: string;
  password: string;
}

// Профиль пользователя (для редактирования)
export interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: File | string;

  // Для застройщиков
  companyName?: string;
  companyLogo?: File | string;
  companyDescription?: string;
  inn?: string;

  // Для риэлторов
  agencyName?: string;
  agencyLogo?: File | string;
  licenseNumber?: string;
}
