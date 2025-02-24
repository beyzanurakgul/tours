'use client';

import React from 'react';
import { useFilterStore } from '../store/useFilterStore';

// 🚀 Örnek Ürün Listesi
const PRODUCTS = [
  { id: 1, category: 'Tours', name: 'Şehir Turu', filters: ['Fiyat', 'Lokasyon'] },
  { id: 2, category: 'Tickets', name: 'Konser Bileti', filters: ['Fiyat'] },
  { id: 3, category: 'Rent', name: 'SUV Araç Kiralama', filters: ['Araç Tipi', 'Teslim Noktası'] },
];

const ProductList: React.FC = () => {
  // 🚀 Zustand Store'dan filtreleme verilerini çek
  const { selectedCategory, selectedFilters } = useFilterStore();

  // 🚀 Seçili filtrelere uygun ürünleri filtrele
  const filteredProducts = PRODUCTS.filter(
    (product) =>
      (!selectedCategory || product.category === selectedCategory) &&
      selectedFilters.every((filter) => product.filters.includes(filter))
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Ürünler</h2>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.id} className="p-4 border rounded mb-2 shadow-md bg-white">
            {product.name}
          </div>
        ))
      ) : (
        <p className="text-gray-500">Bu kriterlere uygun ürün bulunamadı.</p>
      )}
    </div>
  );
};

export default ProductList;
