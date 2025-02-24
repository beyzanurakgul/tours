'use client';

import { create } from 'zustand';

export interface Tour {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  imageUrl: string;
  category: string;
  description?: string;
  filters: {
    [key: string]: any;
  };
}

interface RangeValue {
  min: number;
  max: number;
}

interface FilterState {
  tours: Tour[];

  // Seçili Ana Kategori
  selectedCategory: string | null;

  // String / Etiket filtreleri (örn. 'manzara', 'macera', 'airport' vs.)
  selectedStringFilters: string[];

  // Fiyat ve Süre Aralığı
  priceRange: RangeValue;
  durationRange: RangeValue;

  // Arama çubuğu
  searchQuery: string;

  // Metotlar
  setTours: (tours: Tour[]) => void;
  setCategory: (category: string | null) => void;
  addStringFilter: (filter: string) => void;
  removeStringFilter: (filter: string) => void;
  clearStringFilters: () => void;
  setPriceRange: (range: RangeValue) => void;
  setDurationRange: (range: RangeValue) => void;
  setSearchQuery: (query: string) => void;
  clearAllFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  tours: [],
  selectedCategory: null,
  selectedStringFilters: [],
  priceRange: { min: 0, max: 999999 },
  durationRange: { min: 0, max: 999999 },
  searchQuery: '',

  setTours: (tours) => set({ tours }),

  setCategory: (category) =>
    set({
      selectedCategory: category,
      selectedStringFilters: [],
      priceRange: { min: 0, max: 999999 },
      durationRange: { min: 0, max: 999999 },
      searchQuery: ''
    }),

  addStringFilter: (filter) =>
    set((state) => ({
      selectedStringFilters: [...state.selectedStringFilters, filter]
    })),

  removeStringFilter: (filter) =>
    set((state) => ({
      selectedStringFilters: state.selectedStringFilters.filter((f) => f !== filter)
    })),

  clearStringFilters: () => set({ selectedStringFilters: [] }),

  setPriceRange: (range) => set({ priceRange: range }),

  setDurationRange: (range) => set({ durationRange: range }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  clearAllFilters: () =>
    set({
      selectedCategory: null,
      selectedStringFilters: [],
      priceRange: { min: 0, max: 999999 },
      durationRange: { min: 0, max: 999999 },
      searchQuery: ''
    })
}));
