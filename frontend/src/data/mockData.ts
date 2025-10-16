import type { Property, District, MetroStation } from '../types/property';

// Mock изображения (используем placeholder сервис)
const getPropertyImage = (id: number) =>
  `https://picsum.photos/seed/${id}/800/600`;

// Mock данные для недвижимости в Узбекистане
export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Просторная 3-комнатная квартира в центре Ташкента',
    price: 150000, // USD
    area: 95,
    rooms: 3,
    floor: 7,
    totalFloors: 16,
    address: 'Ташкент, Мирабадский район, улица Афросиаб, 15',
    district: 'Мирабадский',
    metro: {
      name: 'Буюк Ипак Йули',
      distance: 5,
      color: '#E63946',
    },
    images: [
      getPropertyImage(1),
      getPropertyImage(2),
      getPropertyImage(3),
      getPropertyImage(4),
      getPropertyImage(5),
    ],
    description:
      'Отличная квартира в престижном районе Ташкента. Высокие потолки, панорамные окна, евроремонт. Развитая инфраструктура, рядом парки, школы, торговые центры.',
    type: 'apartment',
    dealType: 'sale',
    coordinates: {
      lat: 41.3111,
      lng: 69.2797,
    },
    features: ['Балкон', 'Кондиционер', 'Парковка', 'Лифт', 'Охрана'],
    publishedAt: '2024-12-10T10:30:00Z',
    author: {
      name: 'Агентство "Tashkent Realty"',
      phone: '+998 (71) 200-00-01',
      isAgent: true,
    },
  },
  {
    id: '2',
    title: 'Уютная студия в новостройке Юнусабад',
    price: 45000,
    area: 32,
    rooms: 0,
    floor: 12,
    totalFloors: 25,
    address: 'Ташкент, Юнусабадский район, 7-квартал',
    district: 'Юнусабадский',
    metro: {
      name: 'Юнусабад',
      distance: 8,
      color: '#E63946',
    },
    images: [getPropertyImage(6), getPropertyImage(7), getPropertyImage(8)],
    description:
      'Студия в современном жилом комплексе. Панорамные окна, кухня-студия, современный санузел. Охраняемая территория, детская площадка, подземный паркинг.',
    type: 'apartment',
    dealType: 'sale',
    coordinates: {
      lat: 41.3445,
      lng: 69.2892,
    },
    features: [
      'Новостройка',
      'Охрана',
      'Детская площадка',
      'Закрытая территория',
    ],
    publishedAt: '2024-12-11T14:20:00Z',
    author: {
      name: 'Каримов Азиз',
      phone: '+998 (90) 123-45-67',
      isAgent: false,
    },
  },
  {
    id: '3',
    title: '2-комнатная квартира у метро Чиланзар',
    price: 400, // USD/месяц
    area: 58,
    rooms: 2,
    floor: 4,
    totalFloors: 9,
    address: 'Ташкент, Чиланзарский район, 12-квартал',
    district: 'Чиланзарский',
    metro: {
      name: 'Чиланзар',
      distance: 3,
      color: '#0096D6',
    },
    images: [
      getPropertyImage(9),
      getPropertyImage(10),
      getPropertyImage(11),
      getPropertyImage(12),
    ],
    description:
      'Сдаётся уютная двухкомнатная квартира. Мебель, бытовая техника. Хороший ремонт. Тихий двор, рядом школа и базар.',
    type: 'apartment',
    dealType: 'rent',
    coordinates: {
      lat: 41.2753,
      lng: 69.2036,
    },
    features: ['Мебель', 'Техника', 'Балкон', 'Рядом метро'],
    publishedAt: '2024-12-12T09:15:00Z',
    author: {
      name: 'Умарова Дильбар',
      phone: '+998 (93) 555-66-77',
      isAgent: false,
    },
  },
  {
    id: '4',
    title: 'Загородный дом в Кибрайском районе',
    price: 180000,
    area: 200,
    rooms: 5,
    floor: 2,
    totalFloors: 2,
    address: 'Ташкентская область, Кибрайский район, махалля "Гулистан"',
    district: 'Кибрайский',
    images: [
      getPropertyImage(13),
      getPropertyImage(14),
      getPropertyImage(15),
      getPropertyImage(16),
      getPropertyImage(17),
    ],
    description:
      'Двухэтажный коттедж с земельным участком 8 соток. Газ, электричество, вода. Хоз. постройки, гараж на 2 машины. Сад с фруктовыми деревьями.',
    type: 'house',
    dealType: 'sale',
    coordinates: {
      lat: 41.42,
      lng: 69.48,
    },
    features: [
      'Хоз. постройки',
      'Гараж',
      'Участок 8 соток',
      'Газ',
      'Вода',
      'Сад',
    ],
    publishedAt: '2024-12-09T11:45:00Z',
    author: {
      name: 'Агентство "Загород Дом"',
      phone: '+998 (71) 250-00-02',
      isAgent: true,
    },
  },
  {
    id: '5',
    title: 'Однокомнатная квартира в Сергели',
    price: 38000,
    area: 42,
    rooms: 1,
    floor: 9,
    totalFloors: 14,
    address: 'Ташкент, Сергелийский район, массив "Сергели-6"',
    district: 'Сергелийский',
    metro: {
      name: 'Сергели',
      distance: 10,
      color: '#0096D6',
    },
    images: [getPropertyImage(18), getPropertyImage(19), getPropertyImage(20)],
    description:
      'Однокомнатная квартира с хорошей планировкой. Современный ремонт, встроенная мебель. Панельный дом.',
    type: 'apartment',
    dealType: 'sale',
    coordinates: {
      lat: 41.2195,
      lng: 69.2286,
    },
    features: ['Лоджия', 'Кондиционер', 'Развитая инфраструктура'],
    publishedAt: '2024-12-10T16:00:00Z',
    author: {
      name: 'Рахимов Отабек',
      phone: '+998 (97) 777-88-99',
      isAgent: false,
    },
  },
  {
    id: '6',
    title: 'Элитная 4-комнатная квартира в Мирзо-Улугбекском районе',
    price: 280000,
    area: 160,
    rooms: 4,
    floor: 18,
    totalFloors: 22,
    address: 'Ташкент, Мирзо-Улугбекский район, ЖК "Tashkent City"',
    district: 'Мирзо-Улугбекский',
    metro: {
      name: 'Мирзо Улугбек',
      distance: 2,
      color: '#0096D6',
    },
    images: [
      getPropertyImage(21),
      getPropertyImage(22),
      getPropertyImage(23),
      getPropertyImage(24),
      getPropertyImage(25),
      getPropertyImage(26),
    ],
    description:
      'Роскошная квартира в элитном жилом комплексе. Дизайнерский ремонт, панорамные окна с видом на город. Консьерж, охрана, подземный паркинг.',
    type: 'apartment',
    dealType: 'sale',
    coordinates: {
      lat: 41.3248,
      lng: 69.3249,
    },
    features: [
      'Панорамные окна',
      'Консьерж',
      'Охрана',
      'Паркинг',
      'Элитный дом',
      'Бизнес-класс',
    ],
    publishedAt: '2024-12-08T13:30:00Z',
    author: {
      name: 'Агентство "Elite Realty UZ"',
      phone: '+998 (71) 200-00-05',
      isAgent: true,
    },
  },
  {
    id: '7',
    title: 'Комната в 3-комнатной квартире',
    price: 150, // USD/месяц
    area: 16,
    rooms: 1,
    floor: 5,
    totalFloors: 9,
    address: 'Ташкент, Яшнабадский район, улица Бабура',
    district: 'Яшнабадский',
    metro: {
      name: 'Бабур',
      distance: 7,
      color: '#0096D6',
    },
    images: [getPropertyImage(27), getPropertyImage(28)],
    description:
      'Сдаётся комната в трёхкомнатной квартире. Соседи приветливые. Есть мебель. Коммунальные услуги включены.',
    type: 'apartment',
    dealType: 'rent',
    coordinates: {
      lat: 41.2856,
      lng: 69.2289,
    },
    features: ['Мебель', 'Рядом метро', 'Тихий двор'],
    publishedAt: '2024-12-11T08:00:00Z',
    author: {
      name: 'Алимова Нигора',
      phone: '+998 (94) 888-99-00',
      isAgent: false,
    },
  },
  {
    id: '8',
    title: 'Офис в бизнес-центре "Tashkent Tower"',
    price: 2500, // USD/месяц
    area: 75,
    rooms: 3,
    floor: 12,
    totalFloors: 20,
    address: 'Ташкент, Шайхантахурский район, улица Амира Темура',
    district: 'Шайхантахурский',
    metro: {
      name: 'Амир Темур Хиёбони',
      distance: 3,
      color: '#E63946',
    },
    images: [getPropertyImage(29), getPropertyImage(30), getPropertyImage(31)],
    description:
      'Офисное помещение в престижном бизнес-центре класса А. Современный ремонт, мебель. Отличная транспортная доступность в центре города.',
    type: 'commercial',
    dealType: 'rent',
    coordinates: {
      lat: 41.3113,
      lng: 69.2491,
    },
    features: ['Охрана', 'Парковка', 'Лифт', 'Кондиционер'],
    publishedAt: '2024-12-09T15:45:00Z',
    author: {
      name: 'БЦ "Tashkent Tower"',
      phone: '+998 (71) 200-00-10',
      isAgent: true,
    },
  },
  {
    id: '9',
    title: '2-комнатная квартира с ремонтом в Учтепе',
    price: 52000,
    area: 65,
    rooms: 2,
    floor: 6,
    totalFloors: 12,
    address: 'Ташкент, Учтепинский район, массив "Учтепа-1"',
    district: 'Учтепинский',
    metro: {
      name: 'Учтепа',
      distance: 5,
      color: '#0096D6',
    },
    images: [getPropertyImage(32), getPropertyImage(33), getPropertyImage(34)],
    description:
      'Двухкомнатная квартира в тихом районе. Хороший ремонт, встроенная кухня. Рядом школы, детские сады, парк.',
    type: 'apartment',
    dealType: 'sale',
    coordinates: {
      lat: 41.3308,
      lng: 69.178,
    },
    features: [
      'Балкон',
      'Встроенная кухня',
      'Тихий двор',
      'Развитая инфраструктура',
    ],
    publishedAt: '2024-12-10T12:00:00Z',
    author: {
      name: 'Агентство "Uybaraka"',
      phone: '+998 (71) 250-00-15',
      isAgent: true,
    },
  },
  {
    id: '10',
    title: 'Таунхаус в коттеджном поселке "Qibray Gardens"',
    price: 120000,
    area: 140,
    rooms: 4,
    floor: 2,
    totalFloors: 2,
    address: 'Ташкентская область, Кибрайский район, КП "Qibray Gardens"',
    district: 'Кибрайский',
    images: [
      getPropertyImage(35),
      getPropertyImage(36),
      getPropertyImage(37),
      getPropertyImage(38),
    ],
    description:
      'Современный таунхаус в охраняемом поселке. Два этажа, гараж, терраса. Рядом школа и детский сад.',
    type: 'house',
    dealType: 'sale',
    coordinates: {
      lat: 41.395,
      lng: 69.455,
    },
    features: [
      'Гараж',
      'Терраса',
      'Охрана',
      'Закрытая территория',
      'Детская площадка',
    ],
    publishedAt: '2024-12-07T10:30:00Z',
    author: {
      name: 'КП "Qibray Gardens"',
      phone: '+998 (71) 200-00-20',
      isAgent: true,
    },
  },
  {
    id: '11',
    title: 'Квартира-студия для инвестиций в Яккасарае',
    price: 35000,
    area: 28,
    rooms: 0,
    floor: 5,
    totalFloors: 10,
    address: 'Ташкент, Яккасарайский район, улица Бешагач',
    district: 'Яккасарайский',
    metro: {
      name: 'Беруний',
      distance: 10,
      color: '#E63946',
    },
    images: [getPropertyImage(39), getPropertyImage(40)],
    description:
      'Компактная студия в хорошем районе. Отличный вариант для инвестиций или для молодой семьи.',
    type: 'apartment',
    dealType: 'sale',
    coordinates: {
      lat: 41.2894,
      lng: 69.2333,
    },
    features: ['Новый дом', 'Рядом метро'],
    publishedAt: '2024-12-11T17:20:00Z',
    author: {
      name: 'Ахмедов Жахонгир',
      phone: '+998 (91) 234-56-78',
      isAgent: false,
    },
  },
  {
    id: '12',
    title: 'Пентхаус с видом на Ташкент в ЖК "Horizon"',
    price: 450000,
    area: 240,
    rooms: 5,
    floor: 25,
    totalFloors: 25,
    address: 'Ташкент, Яшнабадский район, ЖК "Horizon"',
    district: 'Яшнабадский',
    metro: {
      name: 'Минор',
      distance: 5,
      color: '#0096D6',
    },
    images: [
      getPropertyImage(41),
      getPropertyImage(42),
      getPropertyImage(43),
      getPropertyImage(44),
      getPropertyImage(45),
    ],
    description:
      'Роскошный пентхаус на последнем этаже премиального комплекса. Панорамный вид 360° на весь Ташкент, собственная терраса, дизайнерская отделка.',
    type: 'apartment',
    dealType: 'sale',
    coordinates: {
      lat: 41.274,
      lng: 69.215,
    },
    features: [
      'Панорамные окна',
      'Терраса',
      'Консьерж',
      'Охрана',
      'Паркинг',
      'Элитный дом',
    ],
    publishedAt: '2024-12-06T14:00:00Z',
    author: {
      name: 'Агентство "Premium Realty Tashkent"',
      phone: '+998 (71) 200-00-25',
      isAgent: true,
    },
  },
];

// Mock данные для районов Ташкента
export const mockDistricts: District[] = [
  { id: '1', name: 'Мирабадский', count: 1245 },
  { id: '2', name: 'Юнусабадский', count: 1856 },
  { id: '3', name: 'Чиланзарский', count: 2167 },
  { id: '4', name: 'Кибрайский', count: 432 },
  { id: '5', name: 'Сергелийский', count: 1523 },
  { id: '6', name: 'Мирзо-Улугбекский', count: 978 },
  { id: '7', name: 'Яшнабадский', count: 1298 },
  { id: '8', name: 'Шайхантахурский', count: 845 },
  { id: '9', name: 'Учтепинский', count: 1089 },
  { id: '10', name: 'Яккасарайский', count: 1134 },
  { id: '11', name: 'Бектемирский', count: 756 },
  { id: '12', name: 'Алмазарский', count: 967 },
];

// Mock данные для станций метро Ташкента
export const mockMetroStations: MetroStation[] = [
  { id: '1', name: 'Буюк Ипак Йули', line: 'Узбекистанская', color: '#E63946' },
  { id: '2', name: 'Юнусабад', line: 'Узбекистанская', color: '#E63946' },
  { id: '3', name: 'Чиланзар', line: 'Чиланзарская', color: '#0096D6' },
  { id: '4', name: 'Сергели', line: 'Чиланзарская', color: '#0096D6' },
  { id: '5', name: 'Мирзо Улугбек', line: 'Чиланзарская', color: '#0096D6' },
  { id: '6', name: 'Бабур', line: 'Чиланзарская', color: '#0096D6' },
  {
    id: '7',
    name: 'Амир Темур Хиёбони',
    line: 'Узбекистанская',
    color: '#E63946',
  },
  { id: '8', name: 'Учтепа', line: 'Чиланзарская', color: '#0096D6' },
  { id: '9', name: 'Минор', line: 'Чиланзарская', color: '#0096D6' },
  { id: '10', name: 'Беруний', line: 'Узбекистанская', color: '#E63946' },
];

// Функция для получения случайных объектов
export const getRandomProperties = (count: number): Property[] => {
  const shuffled = [...mockProperties].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Функция для фильтрации объектов
export const filterProperties = (filters: any): Property[] => {
  return mockProperties.filter((property) => {
    // Фильтр по типу сделки
    if (filters.dealType && property.dealType !== filters.dealType) {
      return false;
    }

    // Фильтр по типу недвижимости
    if (filters.propertyType && property.type !== filters.propertyType) {
      return false;
    }

    // Фильтр по цене
    if (filters.priceFrom && property.price < filters.priceFrom) {
      return false;
    }
    if (filters.priceTo && property.price > filters.priceTo) {
      return false;
    }

    // Фильтр по площади
    if (filters.areaFrom && property.area < filters.areaFrom) {
      return false;
    }
    if (filters.areaTo && property.area > filters.areaTo) {
      return false;
    }

    // Фильтр по количеству комнат
    if (filters.rooms && filters.rooms.length > 0) {
      if (!filters.rooms.includes(property.rooms)) {
        return false;
      }
    }

    // Фильтр по району
    if (filters.districts && filters.districts.length > 0) {
      if (!filters.districts.includes(property.district)) {
        return false;
      }
    }

    return true;
  });
};

// Функция для получения объекта по ID
export const getPropertyById = (id: string): Property | undefined => {
  return mockProperties.find((property) => property.id === id);
};

// Функция для получения похожих объектов
export const getSimilarProperties = (
  propertyId: string,
  limit: number = 6
): Property[] => {
  const currentProperty = getPropertyById(propertyId);
  if (!currentProperty) return [];

  // Фильтруем по типу и примерной цене
  const similar = mockProperties.filter((property) => {
    if (property.id === propertyId) return false;
    if (property.type !== currentProperty.type) return false;

    const priceDiff = Math.abs(property.price - currentProperty.price);
    const priceThreshold = currentProperty.price * 0.3; // 30% разница

    return priceDiff <= priceThreshold;
  });

  return similar.slice(0, limit);
};
