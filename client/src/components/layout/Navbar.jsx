import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

const Navbar = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const getPageTitle = () => {
    switch(location.pathname) {
      case '/dashboard': return 'Dashboard';
      case '/create-exam': return 'Create Exam';
      case '/results': return 'Results';
      case '/exams': return 'Exams';
      case '/evaluation-progress': return 'Evaluation';
      default: 
        if (location.pathname.startsWith('/exams/')) return 'Evaluation Detail';
        return 'Evalify AI';
    }
  };

  const handleExport = () => {
    addToast('Preparing your academic report for export...');
  };

  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] z-40 flex justify-between items-center px-4 sm:px-8 py-4 bg-surface/70 backdrop-blur-xl shadow-sm font-headline text-sm transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-4 sm:gap-8">
        <button 
          className="lg:hidden p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg flex items-center justify-center transition-colors"
          onClick={onMenuClick}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 
          className="text-lg font-black text-on-surface font-headline truncate max-w-[120px] sm:max-w-none cursor-pointer hover:text-primary transition-colors"
          onClick={() => navigate('/dashboard')}
        >
          {getPageTitle()}
        </h2>
        <div className="hidden md:flex gap-6">
          <button 
            onClick={() => navigate('/dashboard')}
            className={`font-bold pb-2 transition-all border-b-2 ${location.pathname === '/dashboard' ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-primary'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => navigate('/evaluation-progress')}
            className={`font-bold pb-2 transition-all border-b-2 ${location.pathname === '/evaluation-progress' ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-primary'}`}
          >
            Batch Status
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-6">
        <div className="relative group hidden sm:block">
          <span className="absolute inset-y-0 left-3 flex items-center text-outline">
            <span className="material-symbols-outlined text-lg">search</span>
          </span>
          <input 
            className="pl-10 pr-4 py-2 rounded-full bg-surface-container-highest border-none focus:ring-2 focus:ring-primary/40 text-sm w-32 md:w-64 transition-all" 
            placeholder="Search..." 
            type="text"
            onKeyDown={(e) => e.key === 'Enter' && addToast(`Searching for: ${e.target.value}`)}
          />
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4 lg:border-l border-outline-variant/20 lg:pl-6">
          <button 
            onClick={() => addToast('System notifications are up to date')}
            className="text-on-surface-variant hover:text-primary relative p-1 transition-colors"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
          </button>
          <button 
            onClick={() => addToast('Viewing history (last 24 hours)')}
            className="hidden sm:block text-on-surface-variant hover:text-primary p-1 transition-colors"
          >
            <span className="material-symbols-outlined">history</span>
          </button>
          <button 
            onClick={handleExport}
            className="bg-primary text-on-primary px-3 sm:px-4 py-2 rounded-lg font-bold hover:opacity-90 active:scale-95 transition-all text-xs sm:text-sm shadow-md shadow-primary/10"
          >
            <span className="sm:hidden">Export</span>
            <span className="hidden sm:inline">Export All</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
