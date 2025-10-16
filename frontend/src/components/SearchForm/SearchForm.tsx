import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  Select,
  Button,
  Space,
  Card,
  Row,
  Col,
  InputNumber,
  Checkbox,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store';
import { setFilter } from '../../store/slices/filtersSlice';
import type { SearchFilters } from '../../types/property';
import './SearchForm.css';

const { Option } = Select;

interface SearchFormProps {
  compact?: boolean;
  showAdvanced?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  compact = false,
  showAdvanced = false,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(showAdvanced);
  const [localFilters, setLocalFilters] = useState<Partial<SearchFilters>>({});

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.filters);

  const handleSearch = () => {
    // Обновляем глобальные фильтры
    Object.entries(localFilters).forEach(([key, value]) => {
      if (value !== undefined) {
        dispatch(setFilter({ key: key as keyof SearchFilters, value }));
      }
    });

    // Переходим на страницу поиска
    navigate('/search');
  };

  const handleLocalFilterChange = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const roomOptions = [
    { label: 'Студия', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4+', value: 4 },
  ];

  if (compact) {
    return (
      <div className="search-form search-form--compact">
        <Input.Group compact>
          <Select
            value={localFilters.dealType || filters.dealType}
            onChange={(value) => handleLocalFilterChange('dealType', value)}
            className="search-form__deal-type"
          >
            <Option value="sale">Купить</Option>
            <Option value="rent">Снять</Option>
          </Select>

          <Select
            value={localFilters.propertyType || filters.propertyType}
            onChange={(value) => handleLocalFilterChange('propertyType', value)}
            placeholder="Тип недвижимости"
            className="search-form__property-type"
          >
            <Option value="">Любой тип</Option>
            <Option value="apartment">Квартира</Option>
            <Option value="house">Дом</Option>
            <Option value="commercial">Коммерция</Option>
          </Select>

          <Input
            placeholder="Район, метро, адрес"
            className="search-form__location"
            onPressEnter={handleSearch}
          />

          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            className="search-form__submit"
          >
            Найти
          </Button>
        </Input.Group>
      </div>
    );
  }

  return (
    <Card className="search-form">
      {/* Основные фильтры */}
      <div className="search-form__main">
        <Row
          gutter={[16, 16]}
          align="middle"
        >
          <Col
            xs={24}
            sm={6}
            md={4}
          >
            <Select
              value={localFilters.dealType || filters.dealType}
              onChange={(value) => handleLocalFilterChange('dealType', value)}
              className="w-full"
              size="large"
            >
              <Option value="sale">Купить</Option>
              <Option value="rent">Снять</Option>
            </Select>
          </Col>

          <Col
            xs={24}
            sm={6}
            md={4}
          >
            <Select
              value={localFilters.propertyType || filters.propertyType}
              onChange={(value) =>
                handleLocalFilterChange('propertyType', value)
              }
              placeholder="Тип недвижимости"
              className="w-full"
              size="large"
            >
              <Option value="">Любой тип</Option>
              <Option value="apartment">Квартира</Option>
              <Option value="house">Дом</Option>
              <Option value="commercial">Коммерция</Option>
            </Select>
          </Col>

          <Col
            xs={24}
            sm={8}
            md={8}
          >
            <Input
              placeholder="Район, метро, адрес"
              size="large"
              className="w-full"
              onPressEnter={handleSearch}
            />
          </Col>

          <Col
            xs={24}
            sm={4}
            md={4}
          >
            <Button
              type="primary"
              size="large"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              className="w-full"
            >
              Найти
            </Button>
          </Col>

          <Col
            xs={24}
            md={4}
          >
            <Button
              type="link"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="search-form__advanced-toggle"
            >
              {showAdvancedFilters ? 'Скрыть фильтры' : 'Больше фильтров'}
            </Button>
          </Col>
        </Row>
      </div>

      {/* Расширенные фильтры */}
      {showAdvancedFilters && (
        <div className="search-form__advanced">
          <Row gutter={[16, 16]}>
            {/* Цена */}
            <Col
              xs={24}
              sm={12}
              md={6}
            >
              <div className="search-form__filter-group">
                <label className="search-form__label">Цена</label>
                <Space.Compact className="w-full">
                  <InputNumber
                    placeholder="от"
                    value={localFilters.priceFrom}
                    onChange={(value) =>
                      handleLocalFilterChange('priceFrom', value || undefined)
                    }
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                    }
                    parser={(value) => Number(value?.replace(/\s/g, '') || 0)}
                    className="search-form__price-input"
                  />
                  <InputNumber
                    placeholder="до"
                    value={localFilters.priceTo}
                    onChange={(value) =>
                      handleLocalFilterChange('priceTo', value || undefined)
                    }
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                    }
                    parser={(value) => Number(value?.replace(/\s/g, '') || 0)}
                    className="search-form__price-input"
                  />
                </Space.Compact>
              </div>
            </Col>

            {/* Площадь */}
            <Col
              xs={24}
              sm={12}
              md={6}
            >
              <div className="search-form__filter-group">
                <label className="search-form__label">Площадь, м²</label>
                <Space.Compact className="w-full">
                  <InputNumber
                    placeholder="от"
                    value={localFilters.areaFrom}
                    onChange={(value) =>
                      handleLocalFilterChange('areaFrom', value || undefined)
                    }
                    className="search-form__area-input"
                  />
                  <InputNumber
                    placeholder="до"
                    value={localFilters.areaTo}
                    onChange={(value) =>
                      handleLocalFilterChange('areaTo', value || undefined)
                    }
                    className="search-form__area-input"
                  />
                </Space.Compact>
              </div>
            </Col>

            {/* Количество комнат */}
            <Col
              xs={24}
              sm={12}
              md={6}
            >
              <div className="search-form__filter-group">
                <label className="search-form__label">Комнат</label>
                <Checkbox.Group
                  options={roomOptions}
                  value={localFilters.rooms || []}
                  onChange={(value) =>
                    handleLocalFilterChange('rooms', value as number[])
                  }
                  className="search-form__rooms"
                />
              </div>
            </Col>

            {/* Дополнительные опции */}
            <Col
              xs={24}
              sm={12}
              md={6}
            >
              <div className="search-form__filter-group">
                <label className="search-form__label">Дополнительно</label>
                <Space direction="vertical">
                  <Checkbox
                    checked={localFilters.hasPhoto}
                    onChange={(e) =>
                      handleLocalFilterChange('hasPhoto', e.target.checked)
                    }
                  >
                    Только с фото
                  </Checkbox>
                  <Checkbox
                    checked={localFilters.newBuilding}
                    onChange={(e) =>
                      handleLocalFilterChange('newBuilding', e.target.checked)
                    }
                  >
                    Новостройка
                  </Checkbox>
                </Space>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Card>
  );
};

export default SearchForm;
