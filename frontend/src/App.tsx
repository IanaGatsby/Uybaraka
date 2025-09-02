import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider, App as AntApp } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { store } from './store';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import PropertyPage from './pages/PropertyPage/PropertyPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
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
                <Route
                  path="*"
                  element={<NotFoundPage />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </AntApp>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
