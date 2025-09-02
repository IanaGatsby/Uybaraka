import { useEffect } from 'react';
import {
  Row,
  Col,
  Typography,
  Pagination,
  Spin,
  Empty,
  Button,
  Space,
} from 'antd';
import {
  AppstoreOutlined,
  BarsOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchProperties } from '../../store/slices/propertiesSlice';
import { setFilter } from '../../store/slices/filtersSlice';
import { setViewMode, toggleMobileFilters } from '../../store/slices/uiSlice';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
// import SearchFilters from '../../components/SearchFilters/SearchFilters';
import SearchForm from '../../components/SearchForm/SearchForm';
import { formatResultsCount } from '../../utils/formatters';
// import './SearchPage.css';

const { Title, Text } = Typography;

const SearchPage = () => {
  const dispatch = useAppDispatch();

  const {
    items: properties,
    loading,
    total,
    page,
    totalPages,
  } = useAppSelector((state) => state.properties);
  const { filters } = useAppSelector((state) => state.filters);
  const { viewMode, isMobileFiltersVisible } = useAppSelector(
    (state) => state.ui
  );

  console.log('Mobile filters visible:', isMobileFiltersVisible);

  useEffect(() => {
    dispatch(fetchProperties(filters));
  }, [dispatch, filters]);

  const handlePageChange = (newPage: number) => {
    dispatch(setFilter({ key: 'page', value: newPage }));
  };

  const handleViewModeChange = (mode: 'list' | 'grid') => {
    dispatch(setViewMode(mode));
  };

  const getGridColumns = () => {
    if (viewMode === 'list') {
      return { xs: 24 };
    }
    return { xs: 24, sm: 12, md: 8, lg: 6 };
  };

  return (
    <div className="search-page">
      {/* Поисковая форма */}
      <div className="search-page__form">
        <div className="container">
          <SearchForm compact />
        </div>
      </div>

      <div className="search-page__content">
        <div className="container">
          <Row gutter={24}>
            {/* Боковые фильтры (десктоп) */}
            <Col
              xs={0}
              lg={6}
            >
              <div className="search-page__sidebar">
                {/* <SearchFilters /> */}
              </div>
            </Col>

            {/* Основной контент */}
            <Col
              xs={24}
              lg={18}
            >
              <div className="search-page__main">
                {/* Заголовок и управление */}
                <div className="search-page__header">
                  <div className="search-page__results-info">
                    <Title
                      level={3}
                      className="search-page__title"
                    >
                      {filters.dealType === 'sale' ? 'Купить' : 'Снять'}{' '}
                      недвижимость
                    </Title>
                    {!loading && (
                      <Text className="search-page__count">
                        {formatResultsCount(total)}
                      </Text>
                    )}
                  </div>

                  <div className="search-page__controls">
                    <Space size="middle">
                      {/* Кнопка фильтров для мобильных */}
                      <Button
                        className="search-page__mobile-filters mobile-only"
                        icon={<FilterOutlined />}
                        onClick={() => dispatch(toggleMobileFilters())}
                      >
                        Фильтры
                      </Button>

                      {/* Переключатель вида */}
                      <div className="search-page__view-switcher desktop-only">
                        <Button.Group>
                          <Button
                            type={viewMode === 'grid' ? 'primary' : 'default'}
                            icon={<AppstoreOutlined />}
                            onClick={() => handleViewModeChange('grid')}
                          />
                          <Button
                            type={viewMode === 'list' ? 'primary' : 'default'}
                            icon={<BarsOutlined />}
                            onClick={() => handleViewModeChange('list')}
                          />
                        </Button.Group>
                      </div>
                    </Space>
                  </div>
                </div>

                {/* Результаты поиска */}
                <div className="search-page__results">
                  {loading ? (
                    <div className="search-page__loading">
                      <Spin size="large" />
                    </div>
                  ) : properties.length === 0 ? (
                    <Empty
                      description="Объявления не найдены"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    >
                      <Button
                        type="primary"
                        onClick={() => window.location.reload()}
                      >
                        Попробовать снова
                      </Button>
                    </Empty>
                  ) : (
                    <>
                      <Row
                        gutter={[16, 16]}
                        className={`search-page__grid search-page__grid--${viewMode}`}
                      >
                        {properties.map((property) => (
                          <Col
                            key={property.id}
                            {...getGridColumns()}
                          >
                            <PropertyCard
                              property={property}
                              showFavorite={true}
                            />
                          </Col>
                        ))}
                      </Row>

                      {/* Пагинация */}
                      {totalPages > 1 && (
                        <div className="search-page__pagination">
                          <Pagination
                            current={page}
                            total={total}
                            pageSize={filters.limit || 20}
                            showTotal={(total, range) =>
                              `${range[0]}-${range[1]} из ${total} объявлений`
                            }
                            showSizeChanger
                            showQuickJumper
                            onChange={handlePageChange}
                            onShowSizeChange={(current, size) => {
                              dispatch(
                                setFilter({ key: 'limit', value: size })
                              );
                              dispatch(setFilter({ key: 'page', value: 1 }));
                            }}
                            pageSizeOptions={['10', '20', '50', '100']}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Мобильные фильтры */}
      {/* <SearchFilters
        mobile
        visible={isMobileFiltersVisible}
        onClose={() => dispatch(toggleMobileFilters())}
      /> */}
    </div>
  );
};

export default SearchPage;
