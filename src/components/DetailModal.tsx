'use client';

import React from 'react';
import { Modal, Button } from './ui';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  imageUrl?: string;
}

const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  imageUrl
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} widthClass="w-full sm:w-1/2 md:w-1/3">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        {imageUrl && (
          // Next.js Image yeni sürüm için -> fill / style={{ objectFit: 'cover' }}
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover rounded mb-2"
          />
        )}
        <p className="text-gray-700">
          {description ?? 'Detay bilgisi bulunmamaktadır.'}
        </p>
      </div>
      <Button onClick={onClose} className="w-full">
        Kapat
      </Button>
    </Modal>
  );
};

export default DetailModal;
