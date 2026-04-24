import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'grid_view' },
    { name: 'Results', path: '/results', icon: 'analytics' },
    { name: 'Exams', path: '/exams', icon: 'description' },
    { name: 'Pricing', path: '/pricing', icon: 'payments' },
    { name: 'Settings', path: '/settings', icon: 'settings' },
  ];

  return (
    <aside className={`fixed top-0 left-0 h-full w-64 bg-surface-container-lowest border-r border-outline-variant/10 z-50 transition-all duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="p-8 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center ai-glow shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <span className="text-xl font-black text-on-surface tracking-tighter font-headline">Evalify AI</span>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${isActive ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-4 pt-8 border-t border-outline-variant/10">
          <div className="bg-surface-container-high rounded-2xl p-4 relative overflow-hidden group cursor-pointer hover:bg-primary transition-all transition-duration-300">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary group-hover:text-white/80 mb-1">Upgrade</p>
              <p className="text-sm font-bold group-hover:text-white">Pro Plan</p>
            </div>
            <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-6xl opacity-5 group-hover:opacity-20 transition-opacity">verified</span>
          </div>

          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary font-black text-xs">DS</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-on-surface truncate">Dr. Sterling</p>
              <p className="text-[10px] text-on-surface-variant truncate">Faculty Head</p>
            </div>
            <button 
              onClick={() => window.location.href = '/login'}
              className="material-symbols-outlined text-on-surface-variant hover:text-error transition-colors"
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
