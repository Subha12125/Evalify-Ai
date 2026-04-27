import React from 'react';

const ScoreCard = ({ label, value, subValue, icon, color = 'primary', noBg = false }) => {
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
    <div className="bg-white p-5 sm:p-6 rounded-[1.5rem] atmospheric-shadow border border-outline-variant/10 flex flex-col justify-between h-full min-h-[160px] group hover:-translate-y-1 hover:shadow-md transition-all relative overflow-hidden">
      
      {/* Top Section: Icon */}
      <div className="mb-6 relative z-10">
        {!noBg ? (
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${colors[color]}`}>
            <span className="material-symbols-outlined text-2xl font-variation-fill">{icon}</span>
          </div>
        ) : (
          <div className={`w-12 h-12 flex items-center justify-center ${textColors[color] || 'text-on-surface'}`}>
            <span className="material-symbols-outlined text-4xl font-variation-fill">{icon}</span>
          </div>
        )}
      </div>
      
      {/* Bottom Section: Text & Values */}
      <div className="relative z-10 flex flex-col gap-1">
        <h3 className="text-3xl font-black font-headline text-on-surface leading-none">{value}</h3>
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
