'use client';

import React, { useCallback } from 'react';
import clsx from 'clsx';
import { AiFillCloseCircle } from 'react-icons/ai';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  widthClass?: string; // Örnek: "w-3/4 sm:w-1/2 md:w-1/3"
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  widthClass = 'w-3/4 sm:w-1/2 md:w-1/3'
}) => {
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.currentTarget === e.target) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
    >
      <div
        className={clsx(
          widthClass,
          'bg-white h-full p-6 overflow-y-auto relative rounded-l-lg shadow-lg transform transition-all duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-4xl 
                     hover:text-primary-600 transition duration-200 ease-in-out"
        >
          <AiFillCloseCircle />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
