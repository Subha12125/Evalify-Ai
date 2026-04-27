import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hoverable = false, 
  noPadding = false 
}) => {
  return (
    <div className={`
      bg-white rounded-2xl atmospheric-shadow border border-outline-variant/10 overflow-hidden transition-all
      ${hoverable ? 'hover:translate-y-[-4px] hover:shadow-xl' : ''}
      ${className}
    `}>
      <div className={noPadding ? '' : 'p-6 sm:p-8'}>
        {children}
      </div>
    </div>
  );
};

export default Card;
