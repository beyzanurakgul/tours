'use client';

import React from 'react';
import Image from 'next/image';

export interface CardProps {
  title: string;
  subtitle?: string;
  price?: string;
  imageUrl: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  price,
  imageUrl,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden 
                 transition-transform transform hover:scale-105 hover:shadow-xl 
                 cursor-pointer"
    >
      {/* Resim Alanı */}
      <div className="relative w-full h-52">
        {/* Next.js 13 için: fill + style={{ objectFit: 'cover' }} */}
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"        // eski yöntem
          objectFit="cover"   // eski yöntem
          className="rounded-t-lg"
          priority
        />
      </div>

      {/* Metin İçeriği */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        {subtitle && <p className="text-gray-600 text-sm mb-2">{subtitle}</p>}
        {price && <p className="text-primary-600 font-semibold text-lg">{price}</p>}
        <div className="flex items-center text-yellow-500 text-sm mb-2">
          ★ 4.3 (20)
        </div>
         <div className="absolute bottom-0 right-0 mt-2 mr-8">
        <div className="text-orange-500 border-b-2 border-orange-500 w-12 text-sm">
          Detaylar
        </div>
       </div>
      </div>
    </div>
  );
};

export default Card;
