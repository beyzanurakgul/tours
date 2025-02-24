'use client';

import React from 'react';
import Image from 'next/image';
import { Modal, Button } from './ui';
import { useFilterStore } from '../store/useFilterStore';

const DetailModal: React.FC = () => {
  const { selectedTourId, tours, setSelectedTourId } = useFilterStore();
  const selectedTour = tours.find((tour) => tour.id === selectedTourId);

  if (!selectedTour) return null;

  return (
    <Modal isOpen={!!selectedTourId} onClose={() => setSelectedTourId(null)} widthClass="w-full sm:w-1/2 md:w-1/3">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedTour.title}</h2>
        
        <div className="relative w-full h-60 rounded-lg overflow-hidden mb-4">
          <Image
            src={selectedTour.imageUrl}
            alt={selectedTour.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        <p className="text-gray-700 text-md mb-4">
          {selectedTour.description ?? 'Detay bilgisi bulunmamaktadır.'}
        </p>

        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span className="font-semibold">Fiyat:</span>
          <span className="text-primary-500 font-bold">{selectedTour.price} USD</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span className="font-semibold">Süre:</span>
          <span>{selectedTour.filters.duration} dk</span>
        </div>
      </div>

      <Button onClick={() => setSelectedTourId(null)} className="w-full">
        Kapat
      </Button>
    </Modal>
  );
};

export default DetailModal;
