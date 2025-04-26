import React from 'react';

export const Card = ({ children }) => (
  <div className="border shadow-lg rounded-lg overflow-hidden">
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);
