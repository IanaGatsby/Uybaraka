import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Typography,
  Button,
  Spin,
  Result,
  Card,
  Space,
  Tag,
  // Divider,
} from 'antd';
import {
  ArrowLeftOutlined,
  HeartOutlined,
  ShareAltOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  // HomeOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  fetchProperty,
  clearCurrentProperty,
} from '../../store/slices/propertiesSlice';
import {
  formatPrice,
  formatArea,
  formatRooms,
  formatPublishedDate,
} from '../../utils/formatters';

const { Title, Text, Paragraph } = Typography;

const PropertyPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentProperty: property, currentPropertyLoading: loading } =
    useAppSelector((state) => state.properties);

  useEffect(() => {
    if (id) {
      dispatch(fetchProperty(id));
    }

    return () => {
      dispatch(clearCurrentProperty());
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <div style={{ padding: '100px 0', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!property) {
    return (
      <div style={{ padding: '100px 0' }}>
        <Result
          status="404"
          title="Объявление не найдено"
          subTitle="Возможно, объявление было удалено или перемещено."
          extra={
            <Button
              type="primary"
              onClick={() => navigate('/search')}
            >
              К поиску
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div
      className="property-page"
      style={{ padding: '24px 0' }}
    >
      <div className="container">
        {/* Навигация */}
        <div style={{ marginBottom: '24px' }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          >
            Назад
          </Button>
        </div>

        <Row gutter={[24, 24]}>
          {/* Основная информация */}
          <Col
            xs={24}
            lg={16}
          >
            <Card>
              {/* Заголовок */}
              <div style={{ marginBottom: '24px' }}>
                <Space
                  direction="vertical"
                  size="small"
                  style={{ width: '100%' }}
                >
                  <Title
                    level={2}
                    style={{ margin: 0 }}
                  >
                    {property.title}
                  </Title>
                  <Space size="middle">
                    <Text type="secondary">
                      <EnvironmentOutlined /> {property.address}
                    </Text>
                    <Text type="secondary">
                      Опубликовано {formatPublishedDate(property.publishedAt)}
                    </Text>
                  </Space>
                </Space>
              </div>

              {/* Фотографии */}
              <div style={{ marginBottom: '32px' }}>
                <img
                  src={property.images[0]}
                  alt={property.title}
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              </div>

              {/* Основные характеристики */}
              <div style={{ marginBottom: '32px' }}>
                <Title level={4}>Характеристики</Title>
                <Row gutter={[16, 16]}>
                  <Col
                    xs={12}
                    sm={6}
                  >
                    <Text type="secondary">Комнат</Text>
                    <div>
                      <Text strong>{formatRooms(property.rooms)}</Text>
                    </div>
                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                  >
                    <Text type="secondary">Площадь</Text>
                    <div>
                      <Text strong>{formatArea(property.area)} м²</Text>
                    </div>
                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                  >
                    <Text type="secondary">Этаж</Text>
                    <div>
                      <Text strong>
                        {property.floor} из {property.totalFloors}
                      </Text>
                    </div>
                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                  >
                    <Text type="secondary">Тип</Text>
                    <div>
                      <Text strong>{property.type}</Text>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Описание */}
              <div style={{ marginBottom: '32px' }}>
                <Title level={4}>Описание</Title>
                <Paragraph>{property.description}</Paragraph>
              </div>

              {/* Особенности */}
              {property.features.length > 0 && (
                <div>
                  <Title level={4}>Особенности</Title>
                  <Space
                    size={[8, 8]}
                    wrap
                  >
                    {property.features.map((feature, index) => (
                      <Tag key={index}>{feature}</Tag>
                    ))}
                  </Space>
                </div>
              )}
            </Card>
          </Col>

          {/* Боковая панель */}
          <Col
            xs={24}
            lg={8}
          >
            <div style={{ position: 'sticky', top: '24px' }}>
              {/* Цена и действия */}
              <Card style={{ marginBottom: '16px' }}>
                <Space
                  direction="vertical"
                  size="large"
                  style={{ width: '100%' }}
                >
                  <div>
                    <Title
                      level={2}
                      style={{ margin: 0, color: '#28a745' }}
                    >
                      {formatPrice(property.price)}
                      {property.dealType === 'rent' && (
                        <Text style={{ fontSize: '16px', color: '#666' }}>
                          /мес
                        </Text>
                      )}
                    </Title>
                    <Tag
                      color={property.dealType === 'sale' ? 'green' : 'blue'}
                    >
                      {property.dealType === 'sale' ? 'Продажа' : 'Аренда'}
                    </Tag>
                  </div>

                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: '100%' }}
                  >
                    <Button
                      type="primary"
                      size="large"
                      block
                      icon={<PhoneOutlined />}
                    >
                      Показать телефон
                    </Button>
                    <Button
                      size="large"
                      block
                      icon={<HeartOutlined />}
                    >
                      В избранное
                    </Button>
                    <Button
                      size="large"
                      block
                      icon={<ShareAltOutlined />}
                    >
                      Поделиться
                    </Button>
                  </Space>
                </Space>
              </Card>

              {/* Информация об авторе */}
              <Card>
                <Title level={5}>Контакты</Title>
                <Space direction="vertical">
                  <Text strong>{property.author.name}</Text>
                  {property.author.isAgent && <Tag color="blue">Агентство</Tag>}
                  <Text>{property.author.phone}</Text>
                </Space>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PropertyPage;
