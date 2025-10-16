import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store';
import { getCurrentUser } from '../../store/slices/authSlice';
import type { UserRole } from '../../types/user';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[]; // Если указано, проверяем роль пользователя
  requireVerified?: boolean; // Требуется ли верификация
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  requireVerified = false,
}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, loading, token } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Если есть токен но нет данных пользователя, загружаем их
    if (token && !user && !loading) {
      dispatch(getCurrentUser());
    }
  }, [token, user, loading, dispatch]);

  // Показываем загрузку пока проверяем авторизацию
  if (loading || (token && !user)) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Spin
          size="large"
          tip="Загрузка..."
        />
      </div>
    );
  }

  // Если не авторизован, редирект на login
  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Проверка роли пользователя
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to="/dashboard"
        state={{ error: 'У вас нет доступа к этой странице' }}
        replace
      />
    );
  }

  // Проверка верификации
  if (requireVerified && !user.isVerified) {
    return (
      <Navigate
        to="/verify-account"
        state={{ error: 'Требуется верификация аккаунта' }}
        replace
      />
    );
  }

  // Если все проверки пройдены, показываем контент
  return <>{children}</>;
};

export default ProtectedRoute;
