import React from 'react';

const ProgressTracker = ({ progress, total, currentStep }) => {
  const percentage = Math.round((progress / total) * 100) || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h4 className="text-2xl font-black font-headline text-on-surface">{percentage}%</h4>
          <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">{currentStep || 'Processing Batch'}</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-primary">{progress}</span>
          <span className="text-xs text-on-surface-variant"> / {total} Papers</span>
        </div>
      </div>
      
      <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-primary-container transition-all duration-500 ease-out shadow-[0_0_12px_rgba(113,42,226,0.3)]"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Scanning', icon: 'document_scanner', done: progress > (total * 0.3) },
          { label: 'Analyzing', icon: 'psychology', done: progress > (total * 0.6) },
          { label: 'Finalizing', icon: 'task_alt', done: progress === total },
        ].map((step, i) => (
          <div key={i} className={`flex items-center gap-2 p-3 rounded-xl border ${step.done ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-surface-container-low border-outline-variant/10 text-on-surface-variant'}`}>
            <span className="material-symbols-outlined text-lg">{step.icon}</span>
            <span className="text-[10px] font-black uppercase tracking-tighter">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
