import React from 'react';

export const Button = ({ children, onClick, variant = 'primary' }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded ${variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
  >
    {children}
  </button>
);
