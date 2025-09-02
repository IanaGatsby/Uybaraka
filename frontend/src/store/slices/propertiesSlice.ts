import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { propertyAPI } from '../../services/api';
import type {
  Property,
  SearchFilters,
  PropertySearchResponse,
} from '../../types/property';

interface PropertiesState {
  items: Property[];
  featuredProperties: Property[];
  currentProperty: Property | null;
  similarProperties: Property[];
  loading: boolean;
  featuredLoading: boolean;
  currentPropertyLoading: boolean;
  error: string | null;
  total: number;
  page: number;
  totalPages: number;
}

const initialState: PropertiesState = {
  items: [],
  featuredProperties: [],
  currentProperty: null,
  similarProperties: [],
  loading: false,
  featuredLoading: false,
  currentPropertyLoading: false,
  error: null,
  total: 0,
  page: 1,
  totalPages: 0,
};

// Async thunks
export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (filters: SearchFilters) => {
    const response = await propertyAPI.getProperties(filters);
    return response;
  }
);

export const fetchFeaturedProperties = createAsyncThunk(
  'properties/fetchFeaturedProperties',
  async (limit: number = 8) => {
    const response = await propertyAPI.getFeaturedProperties(limit);
    return response;
  }
);

export const fetchProperty = createAsyncThunk(
  'properties/fetchProperty',
  async (id: string) => {
    const response = await propertyAPI.getProperty(id);
    return response;
  }
);

export const fetchSimilarProperties = createAsyncThunk(
  'properties/fetchSimilarProperties',
  async ({ id, limit = 6 }: { id: string; limit?: number }) => {
    const response = await propertyAPI.getSimilarProperties(id, limit);
    return response;
  }
);

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    clearCurrentProperty: (state) => {
      state.currentProperty = null;
      state.similarProperties = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch properties
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProperties.fulfilled,
        (state, action: PayloadAction<PropertySearchResponse>) => {
          state.loading = false;
          state.items = action.payload.properties;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch properties';
      });

    // Fetch featured properties
    builder
      .addCase(fetchFeaturedProperties.pending, (state) => {
        state.featuredLoading = true;
      })
      .addCase(
        fetchFeaturedProperties.fulfilled,
        (state, action: PayloadAction<Property[]>) => {
          state.featuredLoading = false;
          state.featuredProperties = action.payload;
        }
      )
      .addCase(fetchFeaturedProperties.rejected, (state, action) => {
        state.featuredLoading = false;
        state.error =
          action.error.message || 'Failed to fetch featured properties';
      });

    // Fetch single property
    builder
      .addCase(fetchProperty.pending, (state) => {
        state.currentPropertyLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProperty.fulfilled,
        (state, action: PayloadAction<Property>) => {
          state.currentPropertyLoading = false;
          state.currentProperty = action.payload;
        }
      )
      .addCase(fetchProperty.rejected, (state, action) => {
        state.currentPropertyLoading = false;
        state.error = action.error.message || 'Failed to fetch property';
      });

    // Fetch similar properties
    builder.addCase(
      fetchSimilarProperties.fulfilled,
      (state, action: PayloadAction<Property[]>) => {
        state.similarProperties = action.payload;
      }
    );
  },
});

export const { clearCurrentProperty, clearError } = propertiesSlice.actions;
export default propertiesSlice.reducer;
