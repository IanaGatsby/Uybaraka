import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Layout,
  Button,
  Menu,
  // Select,
  // Input,
  Space,
  Drawer,
  Badge,
} from 'antd';
import {
  // SearchOutlined,
  MenuOutlined,
  HeartOutlined,
  UserOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store';
import { setFilter } from '../../store/slices/filtersSlice';
// import { toggleMobileFilters } from '../../store/slices/uiSlice';
import './Header.css';

const { Header: AntHeader } = Layout;
// const { Option } = Select;

const Header = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.filters);

  const handleDealTypeChange = (value: 'sale' | 'rent') => {
    dispatch(setFilter({ key: 'dealType', value }));
  };

  const handleSearch = () => {
    navigate('/search');
  };

  console.log(handleSearch);

  const menuItems = [
    {
      key: 'buy',
      label: (
        <span
          className={filters.dealType === 'sale' ? 'active' : ''}
          onClick={() => handleDealTypeChange('sale')}
        >
          Купить
        </span>
      ),
    },
    {
      key: 'rent',
      label: (
        <span
          className={filters.dealType === 'rent' ? 'active' : ''}
          onClick={() => handleDealTypeChange('rent')}
        >
          Снять
        </span>
      ),
    },
    {
      key: 'newbuildings',
      label: 'Новостройки',
    },
    {
      key: 'mortgage',
      label: 'Ипотека',
    },
  ];

  return (
    <AntHeader className="header">
      <div className="header__container">
        {/* Логотип */}
        <div className="header__logo">
          <Link to="/">
            <img
              src="/logo-cian.svg"
              alt="CIAN"
              className="header__logo-img"
              width={80}
              height={32}
            />
          </Link>
        </div>

        {/* Навигация для десктопа */}
        <div className="header__nav desktop-only">
          <Menu
            mode="horizontal"
            items={menuItems}
            className="header__menu"
            selectedKeys={[filters.dealType === 'sale' ? 'buy' : 'rent']}
          />
        </div>

        {/* Поиск */}
        {/* <div className="header__search">
          <Input.Group compact>
            <Select
              value={filters.propertyType}
              className="header__property-type"
              placeholder="Тип"
              onChange={(value) =>
                dispatch(setFilter({ key: 'propertyType', value }))
              }
            >
              <Option value="">Любой тип</Option>
              <Option value="apartment">Квартира</Option>
              <Option value="house">Дом</Option>
              <Option value="commercial">Коммерция</Option>
            </Select>
            <Input
              placeholder="Район, метро, адрес"
              className="header__search-input"
              suffix={
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleSearch}
                  className="header__search-btn"
                >
                  Найти
                </Button>
              }
            />
          </Input.Group>
        </div> */}

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
              +998 (**) ***-**-**
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
              +998 (**) ***-**-**
            </Button>
          </div>
        </Drawer>
      </div>
    </AntHeader>
  );
};

export default Header;
