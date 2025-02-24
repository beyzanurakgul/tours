'use client';

import React, { useState, useEffect } from 'react';
import { useFilterStore } from '../store/useFilterStore';
import { Card } from '../components/ui';
import toursData from '../data/tours.json';
import DetailModal from '../components/DetailModal';

export default function HomePage() {
  const {
    tours,
    setTours,
    selectedCategory,
    selectedStringFilters,
    priceRange,
    durationRange,
    searchQuery
  } = useFilterStore();

  const [selectedTourId, setSelectedTourId] = useState<number | null>(null);

  // Uygulama açıldığında sahte veri store’a yüklensin
  useEffect(() => {
    setTours(toursData as any);
  }, [setTours]);

  // **Filtrelenmiş sonuçları hesapla**
  const filteredTours = tours.filter((tour) => {
    if (selectedCategory && tour.category !== selectedCategory) return false;
    if (tour.price < priceRange.min || tour.price > priceRange.max) return false;
    const duration = tour.filters.duration ?? 0;
    if (duration < durationRange.min || duration > durationRange.max) return false;
    for (let filt of selectedStringFilters) {
      if (filt === 'ticket') {
        if (!tour.filters.ticket) return false;
      } else {
        if (!tour.filters.tags || !tour.filters.tags.includes(filt)) return false;
      }
    }
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      const combinedText = `${tour.title} ${tour.subtitle} ${tour.description ?? ''} ${(tour.filters.location || '')}`
        .toLowerCase();
      if (!combinedText.includes(lowerQuery)) return false;
    }
    return true;
  });

  // Seçili ürünü bul
  const selectedTour = filteredTours.find((t) => t.id === selectedTourId);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      
      {/* Başlık Bilgisi */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {selectedCategory ? `${selectedCategory} Listesi` : 'Tüm Ürünler'}
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Kategori ve filtreleri kullanarak istediğiniz ürünü bulun.
        </p>
      </div>

      {/* Ürün Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {filteredTours.length > 0 ? (
          filteredTours.map((tour) => (
            <Card
              key={tour.id}
              title={tour.title}
              subtitle={tour.subtitle}
              price={`${tour.price} USD`}
              imageUrl={tour.imageUrl}
              onClick={() => setSelectedTourId(tour.id)}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 text-lg font-semibold">
              Bu kriterlere uygun ürün bulunamadı.
            </p>
            <p className="text-gray-400 mt-2">Farklı bir kategori veya filtre deneyin.</p>
          </div>
        )}
      </div>

      {/* Detay Modalı */}
      {selectedTour && (
        <DetailModal
          isOpen={true}
          onClose={() => setSelectedTourId(null)}
          title={selectedTour.title}
          description={selectedTour.description}
          imageUrl={selectedTour.imageUrl}
        />
      )}
    </div>
  );
}
