import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            className={`px-6 py-4 rounded-xl shadow-2xl font-bold flex items-center gap-3 animate-slide-up ${
              toast.type === 'error' ? 'bg-error text-on-error' : 'bg-on-surface text-surface'
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {toast.type === 'error' ? 'error' : 'check_circle'}
            </span>
            <span className="text-sm">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
