import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isMobileFiltersVisible: boolean;
  isMapVisible: boolean;
  viewMode: 'list' | 'grid';
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
}

const initialState: UIState = {
  isMobileFiltersVisible: false,
  isMapVisible: false,
  viewMode: 'grid',
  sidebarCollapsed: false,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileFilters: (state) => {
      state.isMobileFiltersVisible = !state.isMobileFiltersVisible;
    },

    setMobileFiltersVisible: (state, action: PayloadAction<boolean>) => {
      state.isMobileFiltersVisible = action.payload;
    },

    toggleMap: (state) => {
      state.isMapVisible = !state.isMapVisible;
    },

    setMapVisible: (state, action: PayloadAction<boolean>) => {
      state.isMapVisible = action.payload;
    },

    setViewMode: (state, action: PayloadAction<'list' | 'grid'>) => {
      state.viewMode = action.payload;
    },

    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },

    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },

    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const {
  toggleMobileFilters,
  setMobileFiltersVisible,
  toggleMap,
  setMapVisible,
  setViewMode,
  toggleSidebar,
  setSidebarCollapsed,
  setTheme,
} = uiSlice.actions;

export default uiSlice.reducer;
