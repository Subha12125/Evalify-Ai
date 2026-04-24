import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

const Navbar = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const getPageTitle = () => {
    const map = {
      '/dashboard': 'Dashboard',
      '/create-exam': 'Create Exam',
      '/results': 'Results',
      '/exams': 'Exams',
      '/evaluation-progress': 'Evaluation',
      '/settings': 'Settings',
      '/pricing': 'Pricing',
    };
    if (location.pathname.startsWith('/exams/')) return 'Exam Detail';
    return map[location.pathname] || 'Evalify AI';
  };

  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] z-40 flex justify-between items-center px-4 sm:px-8 py-3 bg-surface/80 backdrop-blur-xl font-headline text-sm transition-all duration-300">
      <div className="flex items-center gap-4 sm:gap-8">
        <button
          className="lg:hidden p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors"
          onClick={onMenuClick}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2
          className="text-lg font-black text-on-surface truncate max-w-[140px] sm:max-w-none cursor-pointer hover:text-primary transition-colors"
          onClick={() => navigate('/dashboard')}
        >
          {getPageTitle()}
        </h2>
        <div className="hidden md:flex gap-1">
          {[
            { label: 'Overview', path: '/dashboard' },
            { label: 'Batch Status', path: '/evaluation-progress' },
          ].map((tab) => (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${location.pathname === tab.path ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={() => navigate('/create-exam')}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-bold text-xs hover:opacity-90 active:scale-95 transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Exam
        </button>

        <button
          onClick={() => addToast('No new notifications')}
          className="text-on-surface-variant hover:text-primary relative p-2 rounded-lg hover:bg-surface-container-high transition-all"
        >
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface"></span>
        </button>

        <button
          onClick={() => addToast('Preparing export...')}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-lg font-bold text-xs hover:bg-surface-container-highest transition-all"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          Export
        </button>
      </div>
    </header>
  );
};

export default Navbar;
