// import { useEffect, useState } from 'react';
// import {
//   Card,
//   Typography,
//   Space,
//   Checkbox,
//   Slider,
//   Select,
//   Button,
//   Divider,
//   Collapse,
//   InputNumber,
//   Drawer,
//   Row,
//   Col,
//   // Tag,
//   Spin,
// } from 'antd';
// import {
//   FilterOutlined,
//   ClearOutlined,
//   // EnvironmentOutlined,
// } from '@ant-design/icons';
// import { useAppDispatch, useAppSelector } from '../../store';
// import {
//   setFilter,
//   setPriceRange,
//   setAreaRange,
//   toggleRoom,
//   toggleDistrict,
//   resetFilters,
//   fetchDistricts,
//   fetchMetroStations,
// } from '../../store/slices/filtersSlice';
// // import {
// //   ROOM_OPTIONS,
// //   PRICE_RANGES,
// //   // AREA_RANGES,
// //   SORT_OPTIONS,
// // } from '../../constants';
// import { formatPrice, formatResultsCount } from '../../utils/formatters';
// import './SearchFilters.css';

// const { Title, Text } = Typography;
// const { Option } = Select;
// const { Panel } = Collapse;

// interface SearchFiltersProps {
//   mobile?: boolean;
//   visible?: boolean;
//   onClose?: () => void;
// }

// const SearchFilters: React.FC<SearchFiltersProps> = ({
//   mobile = false,
//   visible = false,
//   onClose,
// }) => {
//   const dispatch = useAppDispatch();
//   const { filters, districts, metroStations, districtsLoading, metroLoading } =
//     useAppSelector((state) => state.filters);
//   const { total } = useAppSelector((state) => state.properties);

//   const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
//     filters.priceFrom || 0,
//     filters.priceTo || 50000000,
//   ]);
//   const [localAreaRange, setLocalAreaRange] = useState<[number, number]>([
//     filters.areaFrom || 0,
//     filters.areaTo || 300,
//   ]);

//   useEffect(() => {
//     dispatch(fetchDistricts());
//     dispatch(fetchMetroStations());
//   }, [dispatch]);

//   // Обработчики для фильтров
//   const handleDealTypeChange = (value: 'sale' | 'rent') => {
//     dispatch(setFilter({ key: 'dealType', value }));
//   };

//   const handlePropertyTypeChange = (value: string) => {
//     dispatch(setFilter({ key: 'propertyType', value }));
//   };

//   const handleSortChange = (value: string) => {
//     const [sortBy, sortOrder] = value.split('-');
//     dispatch(setFilter({ key: 'sortBy', value: sortBy as any }));
//     dispatch(setFilter({ key: 'sortOrder', value: sortOrder as any }));
//   };

//   const handlePriceRangeChange = (range: [number, number]) => {
//     setLocalPriceRange(range);
//   };

//   const handlePriceRangeAfterChange = (range: [number, number]) => {
//     dispatch(
//       setPriceRange({
//         from: range[0] > 0 ? range[0] : undefined,
//         to: range[1] < 50000000 ? range[1] : undefined,
//       })
//     );
//   };

//   const handleAreaRangeChange = (range: [number, number]) => {
//     setLocalAreaRange(range);
//   };

//   const handleAreaRangeAfterChange = (range: [number, number]) => {
//     dispatch(
//       setAreaRange({
//         from: range[0] > 0 ? range[0] : undefined,
//         to: range[1] < 300 ? range[1] : undefined,
//       })
//     );
//   };

//   const handleRoomToggle = (room: number) => {
//     dispatch(toggleRoom(room));
//   };

//   const handleDistrictToggle = (district: string) => {
//     dispatch(toggleDistrict(district));
//   };

//   const handleMetroChange = (stations: string[]) => {
//     dispatch(setFilter({ key: 'metroStations', value: stations }));
//   };

//   const handleReset = () => {
//     dispatch(resetFilters());
//     setLocalPriceRange([0, 50000000]);
//     setLocalAreaRange([0, 300]);
//   };

//   const handlePricePreset = (preset: { min?: number; max?: number }) => {
//     const from = preset.min || 0;
//     const to = preset.max || 50000000;
//     setLocalPriceRange([from, to]);
//     dispatch(
//       setPriceRange({
//         from: preset.min,
//         to: preset.max,
//       })
//     );
//   };

//   // const getCurrentPriceRanges = () => {
//   //   return PRICE_RANGES[filters.dealType] || PRICE_RANGES.sale;
//   // };

//   const FilterContent = () => (
//     <div className="search-filters">
//       {/* Тип сделки */}
//       <div className="search-filters__section">
//         <Title level={5}>Тип сделки</Title>
//         <Select
//           value={filters.dealType}
//           onChange={handleDealTypeChange}
//           className="w-full"
//         >
//           <Option value="sale">Купить</Option>
//           <Option value="rent">Снять</Option>
//         </Select>
//       </div>

//       <Divider />

//       {/* Тип недвижимости */}
//       <div className="search-filters__section">
//         <Title level={5}>Тип недвижимости</Title>
//         <Select
//           value={filters.propertyType}
//           onChange={handlePropertyTypeChange}
//           className="w-full"
//           placeholder="Выберите тип"
//         >
//           <Option value="">Любой тип</Option>
//           <Option value="apartment">Квартира</Option>
//           <Option value="house">Дом</Option>
//           <Option value="commercial">Коммерческая</Option>
//         </Select>
//       </div>

//       <Divider />

//       {/* Сортировка */}
//       <div className="search-filters__section">
//         <Title level={5}>Сортировка</Title>
//         <Select
//           value={`${filters.sortBy}-${filters.sortOrder}`}
//           onChange={handleSortChange}
//           className="w-full"
//         >
//           {/* {SORT_OPTIONS.map((option) => (
//             <Option
//               key={`${option.value}-${option.order}`}
//               value={`${option.value}-${option.order}`}
//             >
//               {option.label}
//             </Option>
//           ))} */}
//         </Select>
//       </div>

//       <Divider />

//       {/* Цена */}
//       <div className="search-filters__section">
//         <Title level={5}>
//           Цена: {formatPrice(localPriceRange[0])} -{' '}
//           {formatPrice(localPriceRange[1])}
//         </Title>

//         {/* Быстрые фильтры цены */}
//         <div className="search-filters__price-presets">
//           <Space
//             size={[4, 8]}
//             wrap
//           >
//             {/* {getCurrentPriceRanges().map((preset, index) => (
//               <Button
//                 key={index}
//                 size="small"
//                 type={
//                   (filters.priceFrom === preset.min &&
//                     filters.priceTo === preset.max) ||
//                   (!filters.priceFrom &&
//                     !filters.priceTo &&
//                     !preset.min &&
//                     !preset.max)
//                     ? 'primary'
//                     : 'default'
//                 }
//                 onClick={() => handlePricePreset(preset)}
//               >
//                 {preset.label}
//               </Button>
//             ))} */}
//           </Space>
//         </div>

//         {/* Слайдер цены */}
//         <div className="search-filters__slider">
//           <Slider
//             range
//             min={0}
//             max={filters.dealType === 'sale' ? 50000000 : 500000}
//             step={filters.dealType === 'sale' ? 100000 : 5000}
//             value={localPriceRange}
//             // onChange={handlePriceRangeChange}
//             // onAfterChange={handlePriceRangeAfterChange}
//             tooltip={{
//               formatter: (value) => formatPrice(value || 0),
//             }}
//           />
//         </div>

//         {/* Ручной ввод цены */}
//         <Row gutter={8}>
//           <Col span={12}>
//             <InputNumber
//               placeholder="от"
//               value={filters.priceFrom}
//               onChange={(value) =>
//                 dispatch(
//                   setFilter({
//                     key: 'priceFrom',
//                     value: value || undefined,
//                   })
//                 )
//               }
//               formatter={(value) =>
//                 `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
//               }
//               parser={(value) => Number(value?.replace(/\s/g, '') || 0)}
//               className="w-full"
//             />
//           </Col>
//           <Col span={12}>
//             <InputNumber
//               placeholder="до"
//               value={filters.priceTo}
//               onChange={(value) =>
//                 dispatch(
//                   setFilter({
//                     key: 'priceTo',
//                     value: value || undefined,
//                   })
//                 )
//               }
//               formatter={(value) =>
//                 `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
//               }
//               parser={(value) => Number(value?.replace(/\s/g, '') || 0)}
//               className="w-full"
//             />
//           </Col>
//         </Row>
//       </div>

//       <Divider />

//       {/* Площадь */}
//       <div className="search-filters__section">
//         <Title level={5}>
//           Площадь: {localAreaRange[0]} - {localAreaRange[1]} м²
//         </Title>

//         <div className="search-filters__slider">
//           <Slider
//             range
//             min={0}
//             max={300}
//             step={5}
//             value={localAreaRange}
//             // onChange={handleAreaRangeChange}
//             // onAfterChange={handleAreaRangeAfterChange}
//             tooltip={{
//               formatter: (value) => `${value} м²`,
//             }}
//           />
//         </div>

//         <Row gutter={8}>
//           <Col span={12}>
//             <InputNumber
//               placeholder="от"
//               value={filters.areaFrom}
//               onChange={(value) =>
//                 dispatch(
//                   setFilter({
//                     key: 'areaFrom',
//                     value: value || undefined,
//                   })
//                 )
//               }
//               addonAfter="м²"
//               className="w-full"
//             />
//           </Col>
//           <Col span={12}>
//             <InputNumber
//               placeholder="до"
//               value={filters.areaTo}
//               onChange={(value) =>
//                 dispatch(
//                   setFilter({
//                     key: 'areaTo',
//                     value: value || undefined,
//                   })
//                 )
//               }
//               addonAfter="м²"
//               className="w-full"
//             />
//           </Col>
//         </Row>
//       </div>

//       <Divider />

//       {/* Количество комнат */}
//       <div className="search-filters__section">
//         <Title level={5}>Комнат</Title>
//         <div className="search-filters__rooms">
//           {ROOM_OPTIONS.map((room) => (
//             <Button
//               key={room.value}
//               size="small"
//               type={filters.rooms?.includes(room.value) ? 'primary' : 'default'}
//               onClick={() => handleRoomToggle(room.value)}
//               className="search-filters__room-btn"
//             >
//               {room.label}
//             </Button>
//           ))}
//         </div>
//       </div>

//       <Divider />

//       {/* Дополнительные фильтры в коллапсе */}
//       <Collapse ghost>
//         {/* Районы */}
//         <Panel
//           header="Районы"
//           key="districts"
//         >
//           <div className="search-filters__section">
//             {districtsLoading ? (
//               <Spin size="small" />
//             ) : (
//               <div className="search-filters__districts">
//                 {districts.slice(0, 10).map((district) => (
//                   <Checkbox
//                     key={district.id}
//                     checked={
//                       filters.districts?.includes(district.name) || false
//                     }
//                     onChange={() => handleDistrictToggle(district.name)}
//                   >
//                     <Space>
//                       <Text>{district.name}</Text>
//                       <Text type="secondary">({district.count})</Text>
//                     </Space>
//                   </Checkbox>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Panel>

//         {/* Метро */}
//         <Panel
//           header="Метро"
//           key="metro"
//         >
//           <div className="search-filters__section">
//             {metroLoading ? (
//               <Spin size="small" />
//             ) : (
//               <Select
//                 mode="multiple"
//                 placeholder="Выберите станции метро"
//                 value={filters.metroStations || []}
//                 onChange={handleMetroChange}
//                 className="w-full"
//                 maxTagCount="responsive"
//               >
//                 {metroStations.map((station) => (
//                   <Option
//                     key={station.id}
//                     value={station.name}
//                   >
//                     <Space>
//                       <span
//                         className="metro-dot"
//                         style={{ backgroundColor: station.color }}
//                       />
//                       {station.name}
//                     </Space>
//                   </Option>
//                 ))}
//               </Select>
//             )}
//           </div>
//         </Panel>

//         {/* Дополнительные опции */}
//         <Panel
//           header="Дополнительно"
//           key="additional"
//         >
//           <div className="search-filters__section">
//             <Space direction="vertical">
//               <Checkbox
//                 checked={filters.hasPhoto}
//                 onChange={(e) =>
//                   dispatch(
//                     setFilter({
//                       key: 'hasPhoto',
//                       value: e.target.checked,
//                     })
//                   )
//                 }
//               >
//                 Только с фото
//               </Checkbox>
//               <Checkbox
//                 checked={filters.newBuilding}
//                 onChange={(e) =>
//                   dispatch(
//                     setFilter({
//                       key: 'newBuilding',
//                       value: e.target.checked,
//                     })
//                   )
//                 }
//               >
//                 Новостройка
//               </Checkbox>
//             </Space>
//           </div>
//         </Panel>
//       </Collapse>

//       {/* Кнопки действий */}
//       <div className="search-filters__actions">
//         <Space
//           direction="vertical"
//           className="w-full"
//         >
//           <Button
//             type="primary"
//             block
//             icon={<FilterOutlined />}
//             onClick={mobile ? onClose : undefined}
//           >
//             Показать {formatResultsCount(total)}
//           </Button>
//           <Button
//             block
//             icon={<ClearOutlined />}
//             onClick={handleReset}
//           >
//             Сбросить все
//           </Button>
//         </Space>
//       </div>
//     </div>
//   );

//   if (mobile) {
//     return (
//       <Drawer
//         title="Фильтры"
//         placement="bottom"
//         onClose={onClose}
//         open={visible}
//         height="80vh"
//         className="search-filters-drawer"
//       >
//         <FilterContent />
//       </Drawer>
//     );
//   }

//   return (
//     <Card className="search-filters-card">
//       <FilterContent />
//     </Card>
//   );
// };

// export default SearchFilters;
