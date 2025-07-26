// codesync-frontend/src/components/ui/Button.jsx
// Reusable styled button component using Tailwind CSS.

import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-all duration-200';
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-accent-blue hover:bg-accent-purple text-white';
      break;
    case 'secondary':
      variantStyles = 'bg-gray-600 hover:bg-gray-700 text-white';
      break;
    case 'outline':
      variantStyles = 'border border-gray-500 text-gray-300 hover:bg-gray-700';
      break;
    case 'google':
      variantStyles = 'bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2';
      break;
    case 'github':
      variantStyles = 'bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center space-x-2';
      break;
    case 'danger':
      variantStyles = 'bg-red-600 hover:bg-red-700 text-white';
      break;
    default:
      variantStyles = 'bg-accent-blue hover:bg-accent-purple text-white';
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
