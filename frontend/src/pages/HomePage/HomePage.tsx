import { useEffect } from 'react';
import {
  Row,
  Col,
  Typography,
  Card,
  Button,
  Space,
  Statistic,
  Spin,
} from 'antd';
import {
  SearchOutlined,
  HomeOutlined,
  BankOutlined,
  ShopOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchFeaturedProperties } from '../../store/slices/propertiesSlice';
import { setFilter } from '../../store/slices/filtersSlice';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import SearchForm from '../../components/SearchForm/SearchForm';
import './HomePage.css';

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { featuredProperties, featuredLoading } = useAppSelector(
    (state) => state.properties
  );

  useEffect(() => {
    dispatch(fetchFeaturedProperties(8));
  }, [dispatch]);

  const handlePropertyTypeSearch = (
    type: 'apartment' | 'house' | 'commercial'
  ) => {
    dispatch(setFilter({ key: 'propertyType', value: type }));
    navigate('/search');
  };

  const propertyTypes = [
    {
      key: 'apartment',
      title: 'Квартиры',
      icon: <HomeOutlined />,
      count: '125 847',
      description: 'Вторичное жилье и новостройки',
    },
    {
      key: 'house',
      title: 'Дома и дачи',
      icon: <BankOutlined />,
      count: '45 672',
      description: 'Загородная недвижимость',
    },
    {
      key: 'commercial',
      title: 'Коммерческая',
      icon: <ShopOutlined />,
      count: '18 234',
      description: 'Офисы, торговые помещения',
    },
  ];

  return (
    <div className="home-page">
      {/* Hero секция */}
      <section className="home-hero">
        <div className="home-hero__container">
          <div className="home-hero__content">
            <Title
              level={1}
              className="home-hero__title"
            >
              Найти недвижимость легко
            </Title>
            <Paragraph className="home-hero__subtitle">
              Более 200 000 объявлений о продаже и аренде недвижимости
            </Paragraph>

            <div className="home-hero__search">
              <SearchForm />
            </div>
          </div>
        </div>
      </section>

      {/* Типы недвижимости */}
      <section className="home-types">
        <div className="container">
          <Title
            level={2}
            className="section-title"
          >
            Типы недвижимости
          </Title>

          <Row gutter={[24, 24]}>
            {propertyTypes.map((type) => (
              <Col
                xs={24}
                sm={8}
                key={type.key}
              >
                <Card
                  className="home-type-card"
                  hoverable
                  onClick={() =>
                    handlePropertyTypeSearch(
                      type.key as 'apartment' | 'house' | 'commercial'
                    )
                  }
                >
                  <Space
                    direction="vertical"
                    size="middle"
                    className="w-full"
                  >
                    <div className="home-type-card__icon">{type.icon}</div>
                    <div>
                      <Title
                        level={4}
                        className="home-type-card__title"
                      >
                        {type.title}
                      </Title>
                      <Paragraph className="home-type-card__description">
                        {type.description}
                      </Paragraph>
                      <Statistic
                        value={type.count}
                        className="home-type-card__count"
                      />
                    </div>
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      block
                    >
                      Смотреть объявления
                    </Button>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Рекомендуемые объекты */}
      <section className="home-featured">
        <div className="container">
          <div className="section-header">
            <Title
              level={2}
              className="section-title"
            >
              Рекомендуемые объекты
            </Title>
            <Link to="/search">
              <Button
                type="text"
                icon={<ArrowRightOutlined />}
              >
                Смотреть все
              </Button>
            </Link>
          </div>

          {featuredLoading ? (
            <div className="text-center py-8">
              <Spin size="large" />
            </div>
          ) : (
            <Row gutter={[24, 24]}>
              {featuredProperties.map((property) => (
                <Col
                  xs={24}
                  sm={12}
                  lg={6}
                  key={property.id}
                >
                  <PropertyCard property={property} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </section>

      {/* Преимущества */}
      <section className="home-advantages">
        <div className="container">
          <Title
            level={2}
            className="section-title text-center"
          >
            Почему выбирают CIAN
          </Title>

          <Row
            gutter={[32, 32]}
            className="mt-8"
          >
            <Col
              xs={24}
              md={8}
            >
              <div className="home-advantage">
                <div className="home-advantage__number">200К+</div>
                <Title level={4}>Объявлений</Title>
                <Paragraph>
                  Самая большая база недвижимости в Узбекистане
                </Paragraph>
              </div>
            </Col>

            <Col
              xs={24}
              md={8}
            >
              <div className="home-advantage">
                <div className="home-advantage__number">15 лет</div>
                <Title level={4}>На рынке</Title>
                <Paragraph>Опыт и надежность в сфере недвижимости</Paragraph>
              </div>
            </Col>

            <Col
              xs={24}
              md={8}
            >
              <div className="home-advantage">
                <div className="home-advantage__number">24/7</div>
                <Title level={4}>Поддержка</Title>
                <Paragraph>
                  Круглосуточная помощь в поиске недвижимости
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
