'use client';

import { create } from 'zustand';

// 🚀 Tour (Ürün) Tip Tanımı
export interface Tour {
  id: number;
  title: string;
  subtitle?: string;
  price: number;
  imageUrl: string;
  category: string;
  description?: string;
  filters: {
    location?: string;
    duration?: number;
    ticket?: boolean;
    tags?: string[];
  };
}

// 🚀 Aralık Tipi (Fiyat ve Süre için)
interface RangeValue {
  min: number;
  max: number;
}

// 🚀 Zustand Store State Tanımı
interface FilterState {
  tours: Tour[];
  selectedTourId: number | null;
  selectedCategory: string | null;
  selectedStringFilters: string[];
  selectedFilters: string[]; // ✅ Eksik olan state eklendi
  priceRange: RangeValue;
  durationRange: RangeValue;
  searchQuery: string;

  // 🚀 Fonksiyonlar (Actions)
  setTours: (tours: Tour[]) => void;
  setSelectedTourId: (id: number | null) => void;
  setCategory: (category: string | null) => void;
  addStringFilter: (filter: string) => void;
  removeStringFilter: (filter: string) => void;
  clearStringFilters: () => void;
  setPriceRange: (range: RangeValue) => void;
  setDurationRange: (range: RangeValue) => void;
  setSearchQuery: (query: string) => void;
  clearAllFilters: () => void;
}

// 🚀 Zustand Store Tanımı
export const useFilterStore = create<FilterState>((set) => ({
  tours: [],
  selectedTourId: null,
  selectedCategory: null,
  selectedStringFilters: [],
  selectedFilters: [], // ✅ Yeni eklenen state
  priceRange: { min: 0, max: 999999 },
  durationRange: { min: 0, max: 999999 },
  searchQuery: '',

  setTours: (tours) => set({ tours }),
  setSelectedTourId: (id) => set({ selectedTourId: id }),
  setCategory: (category) =>
    set({ selectedCategory: category, selectedStringFilters: [], selectedFilters: [] }),
  
  addStringFilter: (filter) =>
    set((state) => ({
      selectedStringFilters: [...state.selectedStringFilters, filter],
      selectedFilters: [...state.selectedFilters, filter], // ✅ Yeni ekleme
    })),

  removeStringFilter: (filter) =>
    set((state) => ({
      selectedStringFilters: state.selectedStringFilters.filter((f) => f !== filter),
      selectedFilters: state.selectedFilters.filter((f) => f !== filter), // ✅ Yeni ekleme
    })),

  clearStringFilters: () => set({ selectedStringFilters: [], selectedFilters: [] }),

  setPriceRange: (range) => set({ priceRange: range }),
  setDurationRange: (range) => set({ durationRange: range }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  clearAllFilters: () =>
    set({
      selectedCategory: null,
      selectedStringFilters: [],
      selectedFilters: [],
      priceRange: { min: 0, max: 999999 },
      durationRange: { min: 0, max: 999999 },
      searchQuery: '',
    }),
}));
