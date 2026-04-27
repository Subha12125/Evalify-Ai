import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon: Icon, 
  loading = false, 
  disabled = false,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-xl gap-2';
  
  const variants = {
    primary: 'bg-primary text-on-primary shadow-lg shadow-primary/20 hover:opacity-90',
    secondary: 'bg-secondary text-on-secondary shadow-lg shadow-secondary/20 hover:opacity-90',
    outline: 'border-2 border-outline-variant text-on-surface hover:bg-surface-container-high',
    ghost: 'text-on-surface-variant hover:bg-surface-container-high',
    error: 'bg-error text-on-error hover:opacity-90 shadow-lg shadow-error/20',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="material-symbols-outlined animate-spin text-[1.2em]">progress_activity</span>
      ) : Icon ? (
        <span className="material-symbols-outlined text-[1.2em]">{Icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
