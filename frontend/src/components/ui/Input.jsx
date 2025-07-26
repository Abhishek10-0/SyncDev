// codesync-frontend/src/components/ui/Input.jsx
// Reusable styled input component using Tailwind CSS.

import React from 'react';

const Input = ({ label, id, type = 'text', value, onChange, placeholder, ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-gray-300 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="shadow appearance-none border border-gray-700 rounded-md w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-accent-blue transition-colors duration-200"
        {...props}
      />
    </div>
  );
};

export default Input;
