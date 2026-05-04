import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
        <span className="material-symbols-outlined text-primary text-4xl">search_off</span>
      </div>
      <h1 className="text-6xl font-black font-headline text-on-surface mb-4">404</h1>
      <p className="text-on-surface-variant text-lg font-medium mb-8 max-w-md">
        This page doesn't exist or has been moved. Let's get you back on track.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-surface-container-high text-on-surface-variant rounded-xl font-bold text-sm hover:bg-surface-container-highest transition-all"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
        >
          Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
