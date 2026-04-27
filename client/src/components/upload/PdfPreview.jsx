import React from 'react';
import { useToast } from '../../context/ToastContext';

const PdfPreview = ({ url, fileName }) => {
  const { addToast } = useToast();

  if (!url) return null;

  return (
    <div className="w-full h-full bg-surface-container-high rounded-3xl overflow-hidden flex flex-col border border-outline-variant/10">
      <div className="px-6 py-4 bg-white/80 backdrop-blur-md border-b border-outline-variant/10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">picture_as_pdf</span>
          <span className="text-xs font-bold text-on-surface uppercase tracking-tight truncate max-w-[200px]">{fileName}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => addToast('Zoom not available in preview', 'info')} className="p-2 hover:bg-surface-container-highest rounded-lg transition-colors">
            <span className="material-symbols-outlined text-lg">zoom_in</span>
          </button>
          <button onClick={() => addToast('Printing document...', 'info')} className="p-2 hover:bg-surface-container-highest rounded-lg transition-colors">
            <span className="material-symbols-outlined text-lg">print</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-surface-container-highest flex items-center justify-center p-8">
        {/* In a real app, use react-pdf or an iframe */}
        <div className="w-full max-w-2xl aspect-[1/1.414] bg-white shadow-2xl rounded-sm flex items-center justify-center relative group">
          <iframe src={url} className="w-full h-full border-none" title={fileName} />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default PdfPreview;
