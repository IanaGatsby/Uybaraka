/**
 * Форматирует цену в читаемый вид
 */
export const formatPrice = (price: number): string => {
  if (price >= 1000000) {
    const millions = price / 1000000;
    if (millions % 1 === 0) {
      return `${millions} млн ₽`;
    }
    return `${millions.toFixed(1)} млн ₽`;
  }

  if (price >= 1000) {
    return `${Math.round(price / 1000)} тыс. ₽`;
  }

  return `${price.toLocaleString('ru-RU')} ₽`;
};

/**
 * Форматирует площадь
 */
export const formatArea = (area: number): string => {
  if (area % 1 === 0) {
    return area.toString();
  }
  return area.toFixed(1);
};

/**
 * Форматирует количество комнат
 */
export const formatRooms = (rooms: number): string => {
  if (rooms === 0) {
    return 'Студия';
  }
  return `${rooms}-комн.`;
};

/**
 * Форматирует этаж
 */
export const formatFloor = (floor: number, totalFloors: number): string => {
  return `${floor}/${totalFloors} эт.`;
};

/**
 * Форматирует дату публикации
 */
export const formatPublishedDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return 'Сегодня';
  } else if (diffDays === 2) {
    return 'Вчера';
  } else if (diffDays <= 7) {
    return `${diffDays - 1} дн. назад`;
  } else {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  }
};

/**
 * Форматирует расстояние до метро
 */
export const formatMetroDistance = (distance: number): string => {
  if (distance < 1) {
    return 'рядом';
  } else if (distance <= 5) {
    return `${distance} мин`;
  } else if (distance <= 15) {
    return `${distance} мин`;
  } else {
    return `${distance} мин`;
  }
};

/**
 * Форматирует тип недвижимости
 */
export const formatPropertyType = (type: string): string => {
  const types: Record<string, string> = {
    apartment: 'Квартира',
    house: 'Дом',
    commercial: 'Коммерческая',
    room: 'Комната',
    studio: 'Студия',
  };

  return types[type] || type;
};

/**
 * Форматирует тип сделки
 */
export const formatDealType = (dealType: string): string => {
  const types: Record<string, string> = {
    sale: 'Продажа',
    rent: 'Аренда',
    daily: 'Посуточно',
  };

  return types[dealType] || dealType;
};

/**
 * Сокращает длинный текст
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Форматирует номер телефона
 */
export const formatPhone = (phone: string): string => {
  // Убираем все символы кроме цифр
  const cleaned = phone.replace(/\D/g, '');

  // Если номер начинается с 8, заменяем на +7
  const normalized = cleaned.startsWith('8')
    ? '7' + cleaned.substring(1)
    : cleaned;

  // Форматируем номер
  if (normalized.length === 11 && normalized.startsWith('7')) {
    return `+7 (${normalized.substring(1, 4)}) ${normalized.substring(
      4,
      7
    )}-${normalized.substring(7, 9)}-${normalized.substring(9, 11)}`;
  }

  return phone; // Возвращаем исходный номер если не удалось отформатировать
};

/**
 * Склоняет слова в зависимости от числа
 */
export const pluralize = (
  count: number,
  one: string,
  few: string,
  many: string
): string => {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 19) {
    return many;
  }

  if (mod10 === 1) {
    return one;
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return few;
  }

  return many;
};

/**
 * Форматирует количество объявлений
 */
export const formatResultsCount = (count: number): string => {
  const word = pluralize(count, 'объявление', 'объявления', 'объявлений');
  return `${count.toLocaleString('ru-RU')} ${word}`;
};

/**
 * Форматирует диапазон цен для фильтра
 */
export const formatPriceRange = (from?: number, to?: number): string => {
  if (!from && !to) {
    return 'Любая цена';
  }

  if (from && !to) {
    return `от ${formatPrice(from)}`;
  }

  if (!from && to) {
    return `до ${formatPrice(to)}`;
  }

  return `${formatPrice(from!)} - ${formatPrice(to!)}`;
};

/**
 * Форматирует диапазон площади для фильтра
 */
export const formatAreaRange = (from?: number, to?: number): string => {
  if (!from && !to) {
    return 'Любая площадь';
  }

  if (from && !to) {
    return `от ${from} м²`;
  }

  if (!from && to) {
    return `до ${to} м²`;
  }

  return `${from}-${to} м²`;
};
