import React from 'react';

const UploadProgress = ({ progress, fileName }) => {
  return (
    <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/10 mb-3 animate-page-in">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3 truncate pr-4">
          <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-lg">picture_as_pdf</span>
          </div>
          <span className="text-xs font-bold text-on-surface truncate">{fileName}</span>
        </div>
        <span className="text-[10px] font-black text-primary uppercase tracking-tighter">{progress}%</span>
      </div>
      
      <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 shadow-[0_0_8px_rgba(113,42,226,0.2)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default UploadProgress;
