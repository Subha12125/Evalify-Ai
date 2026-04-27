import React from 'react';

const ScoreCard = ({ label, value, subValue, icon, color = 'primary' }) => {
  const colors = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-success/10 text-success',
    error: 'bg-error/10 text-error',
    warning: 'bg-warning/10 text-warning',
  };

  return (
    <div className="bg-white p-6 rounded-2xl atmospheric-shadow border border-outline-variant/10 flex items-center gap-5 group hover:translate-y-[-4px] transition-all">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${colors[color]}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-outline mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-black font-headline text-on-surface">{value}</h3>
          {subValue && <span className="text-xs font-bold text-on-surface-variant">{subValue}</span>}
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
