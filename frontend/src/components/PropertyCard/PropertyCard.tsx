import { useState } from 'react';
import { Card, Typography, Space, Tag, Button, Image } from 'antd';
import {
  HeartOutlined,
  HeartFilled,
  EnvironmentOutlined,
  ExpandOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import type { Property } from '../../types/property';
import { formatPrice, formatArea, formatRooms } from '../../utils/formatters';
import './PropertyCard.css';

const { Title, Text, Paragraph } = Typography;

interface PropertyCardProps {
  property: Property;
  showFavorite?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  showFavorite = true,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
    });
  };

  return (
    <Card
      className="property-card"
      hoverable
      cover={
        <div className="property-card__image-container">
          <Link to={`/property/${property.id}`}>
            <Image
              alt={property.title}
              src={property.images[currentImageIndex]}
              className="property-card__image"
              preview={false}
              placeholder={
                <div className="property-card__image-placeholder">
                  <BankOutlined />
                </div>
              }
            />
          </Link>

          {/* Навигация по фотографиям */}
          {property.images.length > 1 && (
            <div className="property-card__image-nav">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  className={`property-card__image-dot ${
                    index === currentImageIndex ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleImageChange(index);
                  }}
                />
              ))}
            </div>
          )}

          {/* Кнопка избранного */}
          {showFavorite && (
            <Button
              className="property-card__favorite"
              type="text"
              shape="circle"
              icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
              onClick={handleFavoriteClick}
            />
          )}

          {/* Бейдж с типом сделки */}
          <div className="property-card__deal-type">
            <Tag color={property.dealType === 'sale' ? 'green' : 'blue'}>
              {property.dealType === 'sale' ? 'Продажа' : 'Аренда'}
            </Tag>
          </div>

          {/* Счетчик фотографий */}
          <div className="property-card__photo-count">
            <ExpandOutlined />
            <span>{property.images.length}</span>
          </div>
        </div>
      }
    >
      <div className="property-card__content">
        {/* Цена */}
        <div className="property-card__price">
          <Title
            level={4}
            className="price"
          >
            {formatPrice(property.price)}
            {property.dealType === 'rent' && (
              <Text className="property-card__price-period">/мес</Text>
            )}
          </Title>
        </div>

        {/* Основная информация */}
        <div className="property-card__details">
          <Space
            size="middle"
            wrap
          >
            <Text className="property-card__detail">
              {formatRooms(property.rooms)}
            </Text>
            <Text className="property-card__detail">
              {formatArea(property.area)} м²
            </Text>
            <Text className="property-card__detail">
              {property.floor}/{property.totalFloors} этаж
            </Text>
          </Space>
        </div>

        {/* Адрес */}
        <div className="property-card__location">
          <Space size="small">
            <EnvironmentOutlined className="property-card__location-icon" />
            <Text
              className="property-card__address"
              ellipsis
            >
              {property.address}
            </Text>
          </Space>
        </div>

        {/* Метро */}
        {property.metro && (
          <div className="property-card__metro">
            <span
              className="metro-badge"
              style={{ color: property.metro.color }}
            >
              {property.metro.name} • {property.metro.distance} мин
            </span>
          </div>
        )}

        {/* Описание */}
        <Paragraph
          className="property-card__description"
          ellipsis={{ rows: 2 }}
        >
          {property.description}
        </Paragraph>

        {/* Особенности */}
        {property.features.length > 0 && (
          <div className="property-card__features">
            <Space
              size={[4, 4]}
              wrap
            >
              {property.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="property-feature"
                >
                  {feature}
                </span>
              ))}
              {property.features.length > 3 && (
                <span className="property-feature">
                  +{property.features.length - 3}
                </span>
              )}
            </Space>
          </div>
        )}

        {/* Дата публикации и автор */}
        <div className="property-card__footer">
          <Space
            // justify="space-between"
            className="w-full"
          >
            <Text className="property-card__date">
              {formatDate(property.publishedAt)}
            </Text>
            {/* {property.author.isAgent && <Tag size="small">Агентство</Tag>} */}
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
