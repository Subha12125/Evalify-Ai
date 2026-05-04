import React from 'react';

const Input = ({ 
  label, 
  error, 
  icon: Icon, 
  className = '', 
  id, 
  ...props 
}) => {
  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-[10px] font-bold text-on-surface uppercase tracking-widest ml-1"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-lg">
            {Icon}
          </span>
        )}
        <input
          id={id}
          className={`
            w-full bg-surface-container-high/50 rounded-xl text-sm text-on-surface placeholder:text-outline/60
            border-none focus:ring-2 transition-all py-3.5
            ${Icon ? 'pl-12 pr-4' : 'px-4'}
            ${error ? 'focus:ring-error/30' : 'focus:ring-primary/30'}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-[10px] font-bold text-error mt-1 ml-1 animate-page-in">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
