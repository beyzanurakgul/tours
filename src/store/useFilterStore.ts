'use client';

import { create } from 'zustand';

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

interface RangeValue {
  min: number;
  max: number;
}

interface FilterState {
  tours: Tour[];
  selectedTourId: number | null;
  selectedCategory: string | null;
  selectedStringFilters: string[];
  priceRange: RangeValue;
  durationRange: RangeValue;
  searchQuery: string;

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

export const useFilterStore = create<FilterState>((set) => ({
  tours: [],
  selectedTourId: null,
  selectedCategory: null,
  selectedStringFilters: [],
  priceRange: { min: 0, max: 999999 },
  durationRange: { min: 0, max: 999999 },
  searchQuery: '',

  setTours: (tours) => set({ tours }),
  setSelectedTourId: (id) => set({ selectedTourId: id }),
  setCategory: (category) => set({ selectedCategory: category, selectedStringFilters: [] }),
  addStringFilter: (filter) =>
    set((state) => ({
      selectedStringFilters: [...state.selectedStringFilters, filter],
    })),
  removeStringFilter: (filter) =>
    set((state) => ({
      selectedStringFilters: state.selectedStringFilters.filter((f) => f !== filter),
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
      searchQuery: '',
    }),
}));
