'use client';

import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <input
        type="checkbox"
        className="hidden peer"
        {...props}
      />
      <div className="w-5 h-5 border-2 border-gray-300 rounded-md flex items-center justify-center peer-checked:bg-primary-500 peer-checked:border-primary-600 transition-all">
        {/* Tik İşareti - Seçildiğinde Gözükecek */}
        {props.checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 111.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      {label && <span className="text-gray-800 text-sm">{label}</span>}
    </label>
  );
};

export default Checkbox;
