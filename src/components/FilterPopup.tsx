'use client';

import React from 'react';
import { Modal, Button, Checkbox } from './ui';
import { useFilterStore } from '../store/useFilterStore';

const CATEGORIES = [
  {
    name: 'Tours',
    filters: ['ticket', 'manzara', 'macera', 'doğa', 'yürüyüş', 'yükseklik']
  },
  {
    name: 'Tickets',
    filters: ['müzik', 'eğlence', 'deniz', 'Feribot', 'Konser']
  },
  {
    name: 'Rent',
    filters: ['özel', 'mavi tur', 'lüks', 'vehicleType']
  },
  {
    name: 'Transfer',
    filters: ['airport', 'vip', 'özel']
  }
];

const FilterPopup: React.FC<{ closePopup: () => void }> = ({ closePopup }) => {
  const {
    selectedCategory,
    setCategory,
    selectedStringFilters,
    addStringFilter,
    removeStringFilter,
    priceRange,
    setPriceRange,
    durationRange,
    setDurationRange
  } = useFilterStore();

  const selectedCatObj = CATEGORIES.find((cat) => cat.name === selectedCategory);

  const handleCheckboxToggle = (filt: string) => {
    if (selectedStringFilters.includes(filt)) {
      removeStringFilter(filt);
    } else {
      addStringFilter(filt);
    }
  };

  const handleApplyFilters = () => {
    closePopup();
  };

  return (
    <Modal isOpen={true} onClose={closePopup} widthClass="flex items-center justify-center min-h-screen bg-gray-100 h-6/6 sm:w-1/2 md:w-1/3">
      <h2 className="text-xl text-orange-600 font-bold mb-4">Kategoriler</h2>

      {/* 🔹 Kategori Seçimi */}
      <div className="flex flex-col space-y-2 mb-6">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.name}
            variant={selectedCategory === cat.name ? 'primary' : 'secondary'}
            onClick={() => setCategory(cat.name)}
            className="w-full text-left"
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* 🔹 Fiyat ve Süre Filtreleri */}
      {selectedCategory && (
        <>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg text-orange-600 font-semibold mb-2">Fiyat Aralığı (USD)</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-orange-600 text-sm mb-1">Min</span>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                  className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all text-orange-600"
                  placeholder="Min"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-600 text-sm mb-1">Max</span>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all text-orange-600"
                  placeholder="Max"
                />
              </label>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg text-orange-600 font-semibold mb-2">Süre Aralığı (dakika)</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-gray-600 text-sm mb-1">Min</span>
                <input
                  type="number"
                  value={durationRange.min}
                  onChange={(e) => setDurationRange({ ...durationRange, min: Number(e.target.value) })}
                  className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all text-orange-600"
                  placeholder="Min"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-600 text-sm mb-1">Max</span>
                <input
                  type="number"
                  value={durationRange.max}
                  onChange={(e) => setDurationRange({ ...durationRange, max: Number(e.target.value) })}
                  className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all text-orange-600"
                  placeholder="Max"
                />
              </label>
            </div>
          </div>

          {/* 🔹 Tag Cloud */}
          {selectedCatObj && (
            <>
              <h3 className="text-lg font-semibold ">Etiketler</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCatObj.filters.map((filt) => (
                  <Checkbox
                    key={filt}
                    label={filt}
                    checked={selectedStringFilters.includes(filt)}
                    onChange={() => handleCheckboxToggle(filt)}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* 🔹 Filtreleri Uygula Butonu */}
      <Button className="mb-4 mt-2 w-full" onClick={handleApplyFilters}>
        Filtrele
      </Button>
    </Modal>
  );
};

export default FilterPopup;
