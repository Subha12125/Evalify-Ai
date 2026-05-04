import React from 'react';

const ScoreCard = ({ label, value, subValue, icon, color = 'primary', noBg = false }) => {
  const statusValues = ['completed', 'failed', 'evaluating', 'processing', 'pending', 'created'];
  const isStatusValue = statusValues.includes(value?.toLowerCase());

  const statusStyles = {
    completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    failed: 'bg-red-50 text-red-700 border border-red-200',
    evaluating: 'bg-amber-50 text-amber-700 border border-amber-200',
    processing: 'bg-amber-50 text-amber-700 border border-amber-200',
    pending: 'bg-blue-50 text-blue-700 border border-blue-200',
    created: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
  };

  const statusDots = {
    completed: 'bg-emerald-500',
    failed: 'bg-red-500',
    evaluating: 'bg-amber-500 animate-pulse',
    processing: 'bg-amber-500 animate-pulse',
    pending: 'bg-blue-500',
    created: 'bg-indigo-500',
  };

  const colors = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-success/10 text-success',
    error: 'bg-error/10 text-error',
    warning: 'bg-warning/10 text-warning',
  };

  const textColors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    error: 'text-error',
    warning: 'text-warning',
  };

  return (
    <div className="bg-white p-3.5 sm:p-5 md:p-6 rounded-xl sm:rounded-[1.5rem] atmospheric-shadow border border-outline-variant/10 flex flex-col justify-between h-full min-h-[120px] sm:min-h-[160px] group hover:-translate-y-1 hover:shadow-md transition-all relative overflow-hidden">
      
      {/* Top Section: Icon */}
      <div className="mb-3 sm:mb-6 relative z-10">
        {!noBg ? (
          <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm ${colors[color]}`}>
            <span className="material-symbols-outlined text-lg sm:text-2xl font-variation-fill">{icon}</span>
          </div>
        ) : (
          <div className={`w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center ${textColors[color] || 'text-on-surface'}`}>
            <span className="material-symbols-outlined text-2xl sm:text-4xl font-variation-fill">{icon}</span>
          </div>
        )}
      </div>
      
      {/* Bottom Section: Text & Values */}
      <div className="relative z-10 flex flex-col gap-1">
        {isStatusValue ? (
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider w-fit ${statusStyles[value?.toLowerCase()] || 'bg-gray-100 text-gray-700'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusDots[value?.toLowerCase()] || 'bg-gray-500'}`} />
            {value}
          </span>
        ) : (
          <h3 className="text-xl sm:text-3xl font-black font-headline text-on-surface leading-none">{value}</h3>
        )}
        <p className="text-[10px] font-bold uppercase tracking-widest text-outline leading-tight mt-1 break-words">
          {label}
        </p>
        {subValue && (
          <p className={`text-[10px] font-bold mt-1 ${subValue.includes('+') ? 'text-emerald-500' : 'text-on-surface-variant'}`}>
            {subValue}
          </p>
        )}
      </div>
      
    </div>
  );
};

export default ScoreCard;
