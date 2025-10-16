import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider, App as AntApp } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { store } from './store';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import PropertyPage from './pages/PropertyPage/PropertyPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Protected Route
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import './styles/global.css';

// Кастомная тема для Ant Design в стиле Baraka
const theme = {
  token: {
    colorPrimary: '#8F7EE7', // Основной фиолетовый цвет Baraka
    colorSuccess: '#28a745',
    colorInfo: '#6E5DC6',
    colorWarning: '#ffc107',
    colorError: '#dc3545',
    fontFamily: 'Roboto Flex, sans-serif',
    borderRadius: 6,
    wireframe: false,
  },
  components: {
    Button: {
      borderRadius: 6,
      controlHeight: 40,
    },
    Input: {
      borderRadius: 6,
      controlHeight: 40,
    },
    Select: {
      borderRadius: 6,
      controlHeight: 40,
    },
    Card: {
      borderRadius: 8,
    },
  },
};

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        locale={ruRU}
        theme={theme}
      >
        <AntApp>
          <BrowserRouter>
            <Routes>
              {/* Публичные страницы */}
              <Route
                path="/"
                element={<MainLayout />}
              >
                <Route
                  index
                  element={<HomePage />}
                />
                <Route
                  path="search"
                  element={<SearchPage />}
                />
                <Route
                  path="property/:id"
                  element={<PropertyPage />}
                />
              </Route>

              {/* Авторизация */}
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/register"
                element={<Register />}
              />

              {/* Защищенные страницы (Dashboard) */}
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    {/* <DashboardLayout /> */}
                    <div>Dashboard будет здесь</div>
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route
                path="*"
                element={<NotFoundPage />}
              />
            </Routes>
          </BrowserRouter>
        </AntApp>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
