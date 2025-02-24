'use client';

import React from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  const baseStyles =
    'px-4 py-2 rounded font-semibold focus:outline-none transition-colors duration-200';
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-primary-500 hover:bg-primary-600 text-white';
      break;
    case 'secondary':
      variantStyles = 'bg-gray-400 hover:bg-gray-500 text-white';
      break;
    case 'danger':
      variantStyles = 'bg-red-500 hover:bg-red-600 text-white';
      break;
    default:
      variantStyles = 'bg-primary-500 hover:bg-primary-600 text-white';
  }

  return (
    <button className={clsx(baseStyles, variantStyles, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
