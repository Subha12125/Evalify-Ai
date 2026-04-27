import React, { useCallback } from 'react';

const FileDropzone = ({ onFilesAdded, filesCount }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      onFilesAdded(droppedFiles);
    }
  }, [onFilesAdded]);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesAdded(e.target.files);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative group border-2 border-dashed border-outline-variant/30 rounded-3xl p-10 sm:p-16 flex flex-col items-center justify-center transition-all hover:border-primary/40 hover:bg-primary/5 bg-surface-container-lowest"
    >
      <input
        type="file"
        multiple
        accept=".pdf"
        onChange={handleFileInput}
        className="absolute inset-0 opacity-0 cursor-pointer z-10"
      />
      
      <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          upload_file
        </span>
      </div>
      
      <h3 className="text-xl font-bold font-headline mb-2 text-on-surface">Upload Student Answer Sheets</h3>
      <p className="text-on-surface-variant text-sm mb-6 text-center max-w-sm">
        Drag and drop PDF files here, or click to browse. Only PDF format is supported.
      </p>
      
      <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full">
        <span className="material-symbols-outlined text-sm text-primary">info</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
          {filesCount > 0 ? `${filesCount} files selected` : 'Support batch upload up to 50 files'}
        </span>
      </div>
    </div>
  );
};

export default FileDropzone;
