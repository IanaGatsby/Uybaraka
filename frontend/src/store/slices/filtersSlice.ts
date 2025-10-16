import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { propertyAPI } from '../../services/api';
import type {
  SearchFilters,
  District,
  MetroStation,
} from '../../types/property';

interface FiltersState {
  filters: SearchFilters;
  districts: District[];
  metroStations: MetroStation[];
  districtsLoading: boolean;
  metroLoading: boolean;
}

const initialState: FiltersState = {
  filters: {
    dealType: 'sale',
    propertyType: '',
    page: 1,
    limit: 20,
    sortBy: 'date',
    sortOrder: 'desc',
  },
  districts: [],
  metroStations: [],
  districtsLoading: false,
  metroLoading: false,
};

// Async thunks
export const fetchDistricts = createAsyncThunk(
  'filters/fetchDistricts',
  async () => {
    const response = await propertyAPI.getDistricts();
    return response;
  }
);

export const fetchMetroStations = createAsyncThunk(
  'filters/fetchMetroStations',
  async () => {
    const response = await propertyAPI.getMetroStations();
    return response;
  }
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: <K extends keyof SearchFilters>(
      state: FiltersState,
      action: PayloadAction<{ key: K; value: SearchFilters[K] }>
    ) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
      // При изменении фильтров сбрасываем на первую страницу
      if (key !== 'page') {
        state.filters.page = 1;
      }
    },

    setFilters: (state, action: PayloadAction<Partial<SearchFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    resetFilters: (state) => {
      state.filters = {
        dealType: 'sale',
        propertyType: '',
        page: 1,
        limit: 20,
        sortBy: 'date',
        sortOrder: 'desc',
      };
    },

    setPriceRange: (
      state,
      action: PayloadAction<{ from?: number; to?: number }>
    ) => {
      state.filters.priceFrom = action.payload.from;
      state.filters.priceTo = action.payload.to;
      state.filters.page = 1;
    },

    setAreaRange: (
      state,
      action: PayloadAction<{ from?: number; to?: number }>
    ) => {
      state.filters.areaFrom = action.payload.from;
      state.filters.areaTo = action.payload.to;
      state.filters.page = 1;
    },

    toggleRoom: (state, action: PayloadAction<number>) => {
      const room = action.payload;
      const currentRooms = state.filters.rooms || [];

      if (currentRooms.includes(room)) {
        state.filters.rooms = currentRooms.filter((r) => r !== room);
      } else {
        state.filters.rooms = [...currentRooms, room];
      }
      state.filters.page = 1;
    },

    toggleDistrict: (state, action: PayloadAction<string>) => {
      const district = action.payload;
      const currentDistricts = state.filters.districts || [];

      if (currentDistricts.includes(district)) {
        state.filters.districts = currentDistricts.filter(
          (d) => d !== district
        );
      } else {
        state.filters.districts = [...currentDistricts, district];
      }
      state.filters.page = 1;
    },
  },
  extraReducers: (builder) => {
    // Fetch districts
    builder
      .addCase(fetchDistricts.pending, (state) => {
        state.districtsLoading = true;
      })
      .addCase(
        fetchDistricts.fulfilled,
        (state, action: PayloadAction<District[]>) => {
          state.districtsLoading = false;
          state.districts = action.payload;
        }
      )
      .addCase(fetchDistricts.rejected, (state) => {
        state.districtsLoading = false;
      });

    // Fetch metro stations
    builder
      .addCase(fetchMetroStations.pending, (state) => {
        state.metroLoading = true;
      })
      .addCase(
        fetchMetroStations.fulfilled,
        (state, action: PayloadAction<MetroStation[]>) => {
          state.metroLoading = false;
          state.metroStations = action.payload;
        }
      )
      .addCase(fetchMetroStations.rejected, (state) => {
        state.metroLoading = false;
      });
  },
});

export const {
  setFilter,
  setFilters,
  resetFilters,
  setPriceRange,
  setAreaRange,
  toggleRoom,
  toggleDistrict,
} = filtersSlice.actions;

export default filtersSlice.reducer;
