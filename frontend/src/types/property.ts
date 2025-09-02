export interface Property {
  id: string;
  title: string;
  price: number;
  area: number;
  rooms: number;
  floor: number;
  totalFloors: number;
  address: string;
  district: string;
  metro?: {
    name: string;
    distance: number;
    color: string;
  };
  images: string[];
  description: string;
  type: 'apartment' | 'house' | 'commercial';
  dealType: 'sale' | 'rent';
  coordinates?: {
    lat: number;
    lng: number;
  };
  features: string[];
  publishedAt: string;
  author: {
    name: string;
    phone: string;
    isAgent: boolean;
  };
}

export interface SearchFilters {
  dealType: 'sale' | 'rent';
  propertyType: 'apartment' | 'house' | 'commercial' | '';
  priceFrom?: number;
  priceTo?: number;
  areaFrom?: number;
  areaTo?: number;
  rooms?: number[];
  districts?: string[];
  metroStations?: string[];
  hasPhoto?: boolean;
  newBuilding?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'area' | 'date';
  sortOrder?: 'asc' | 'desc';
}

export interface PropertySearchResponse {
  properties: Property[];
  total: number;
  page: number;
  totalPages: number;
}

export interface District {
  id: string;
  name: string;
  count: number;
}

export interface MetroStation {
  id: string;
  name: string;
  line: string;
  color: string;
}
