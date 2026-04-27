import React from 'react';

const ScoreCard = ({ label, value, subValue, icon, color = 'primary', noBg = false }) => {
  const colors = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-success/10 text-success',
    error: 'bg-error/10 text-error',
    warning: 'bg-warning/10 text-warning',
  };

  return (
    <div className="bg-white p-4 rounded-2xl atmospheric-shadow border border-outline-variant/10 flex items-center gap-3 group hover:translate-y-[-2px] transition-all min-w-0">
      {!noBg ? (
        <div className={`w-10 h-14 rounded-full flex items-center justify-center text-xl shrink-0 ${colors[color]}`}>
          <span className="material-symbols-outlined font-variation-fill">{icon}</span>
        </div>
      ) : (
        <div className="w-10 h-14 flex items-center justify-center text-2xl shrink-0 text-on-surface">
          <span className="material-symbols-outlined font-variation-fill">{icon}</span>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-bold uppercase tracking-wide text-outline mb-0.5 break-words">{label}</p>
        <div className="flex flex-col">
          <h3 className="text-2xl font-black font-headline text-on-surface leading-tight">{value}</h3>
          {subValue && (
            <span className={`text-[10px] font-bold ${subValue.includes('+') ? 'text-green-600' : 'text-on-surface-variant'}`}>
              {subValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
