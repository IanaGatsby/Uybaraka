import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Button, Menu, Space, Drawer, Badge } from 'antd';
import {
  MenuOutlined,
  HeartOutlined,
  UserOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store';
import { setFilter } from '../../store/slices/filtersSlice';
import './Header.css';

const { Header: AntHeader } = Layout;

const Header = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.filters);

  const handleDealTypeChange = (value: 'sale' | 'rent') => {
    dispatch(setFilter({ key: 'dealType', value }));
    navigate('/search');
  };

  const menuItems = [
    {
      key: 'buy',
      label: <span onClick={() => handleDealTypeChange('sale')}>Купить</span>,
    },
    {
      key: 'rent',
      label: <span onClick={() => handleDealTypeChange('rent')}>Снять</span>,
    },
    {
      key: 'newbuildings',
      label: <Link to="/search">Новостройки</Link>,
    },
    {
      key: 'mortgage',
      label: <Link to="/search">Ипотека</Link>,
    },
  ];

  return (
    <AntHeader className="header">
      <div className="header-wrapper">
        {/* Верхняя часть - Логотип и действия */}
        <div className="header__top">
          <div className="header__container">
            {/* Логотип */}
            <div className="header__logo">
              <Link to="/">
                <img
                  src="../../assets/logo.svg"
                  alt="UYBARAKA"
                />
                <span
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#6e5dc6',
                  }}
                >
                  UYBARAKA
                </span>
              </Link>
            </div>

            {/* Дополнительные кнопки */}
            <div className="header__actions desktop-only">
              <Space size="middle">
                <Badge
                  count={0}
                  showZero={false}
                >
                  <Button
                    type="text"
                    icon={<HeartOutlined />}
                    className="header__action-btn"
                  >
                    Избранное
                  </Button>
                </Badge>

                <Button
                  type="text"
                  icon={<UserOutlined />}
                  className="header__action-btn"
                >
                  Войти
                </Button>

                <Button
                  type="default"
                  icon={<PhoneOutlined />}
                  className="header__phone-btn"
                >
                  +998 71 200-00-00
                </Button>
              </Space>
            </div>

            {/* Мобильное меню */}
            <div className="header__mobile mobile-only">
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileMenuVisible(true)}
                className="header__mobile-menu-btn"
              />
            </div>
          </div>
        </div>

        {/* Нижняя часть - Навигация */}
        <div className="header__bottom desktop-only">
          <div className="header__container">
            <Menu
              mode="horizontal"
              items={menuItems}
              className="header__menu"
              selectedKeys={[filters.dealType === 'sale' ? 'buy' : 'rent']}
            />
          </div>
        </div>
      </div>

      {/* Drawer для мобильного меню */}
      <Drawer
        title="Меню"
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        className="header__mobile-drawer"
      >
        <Menu
          mode="vertical"
          items={menuItems}
          selectedKeys={[filters.dealType === 'sale' ? 'buy' : 'rent']}
        />

        <div className="header__mobile-actions">
          <Button
            type="text"
            icon={<HeartOutlined />}
            block
            className="mb-2"
          >
            Избранное
          </Button>

          <Button
            type="text"
            icon={<UserOutlined />}
            block
            className="mb-2"
          >
            Войти
          </Button>

          <Button
            type="primary"
            icon={<PhoneOutlined />}
            block
          >
            +998 71 200-00-00
          </Button>
        </div>
      </Drawer>
    </AntHeader>
  );
};

export default Header;
