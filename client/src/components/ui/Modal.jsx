import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  maxWidth = 'max-w-xl'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      <div className={`
        relative w-full ${maxWidth} bg-white rounded-3xl shadow-2xl overflow-hidden
        animate-page-in
      `}>
        <div className="px-4 sm:px-8 py-6 border-b border-outline-variant/10 flex justify-between items-center">
          <h2 className="text-xl font-extrabold font-headline text-on-surface">{title}</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-outline">close</span>
          </button>
        </div>
        
        <div className="px-4 sm:px-8 py-8 overflow-y-auto max-h-[70vh]">
          {children}
        </div>

        {footer && (
          <div className="px-4 sm:px-8 py-6 border-t border-outline-variant/10 bg-surface-container-lowest/50 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.getElementById('root')
  );
};

export default Modal;
