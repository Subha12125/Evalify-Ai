import React from 'react';

const Spinner = ({ size = 'md', color = 'primary', className = '' }) => {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-[3px]',
    lg: 'w-12 h-12 border-4',
  };

  const colors = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    white: 'border-white',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`
        ${sizes[size]} 
        ${colors[color]} 
        border-t-transparent rounded-full animate-spin
      `} />
    </div>
  );
};

export default Spinner;
