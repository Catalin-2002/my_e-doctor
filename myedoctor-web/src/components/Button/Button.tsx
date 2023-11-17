// components/Button.tsx

import React, { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const Button = ({ variant = 'primary', className = '', children, ...props }: ButtonProps) => {
  let variantClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-green text-white';
      break;
    case 'secondary':
      variantClasses = 'bg-blue-500 text-white';
      break;
    case 'tertiary':
      variantClasses = 'bg-gray-500 text-white';
      break;
    default:
      break;
  }

  return (
    <button
      className={twMerge(
        `rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-${variant}-300 hover:bg-${variant}-600 ${variantClasses}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
