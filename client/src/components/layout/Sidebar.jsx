import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'grid_view' },
    { name: 'Exams', path: '/exams', icon: 'description' },
    { name: 'Results', path: '/results', icon: 'analytics' },
    { name: 'Pricing', path: '/pricing', icon: 'payments' },
    { name: 'Settings', path: '/settings', icon: 'settings' },
  ];

  return (
    <aside className={`fixed top-0 left-0 h-full w-64 bg-surface-container-lowest z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="p-6 flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center ai-glow shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <span className="text-xl font-black text-on-surface tracking-tighter font-headline">Evalify AI</span>
        </div>

        {/* Create Exam CTA */}
        <button
          onClick={() => { navigate('/create-exam'); onClose(); }}
          className="mb-8 w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          New Evaluation
        </button>

        {/* Nav Links */}
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${isActive ? 'bg-primary text-on-primary shadow-md shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto space-y-4 pt-6 border-t border-outline-variant/10">
          <NavLink
            to="/pricing"
            onClick={onClose}
            className="block bg-gradient-to-br from-secondary/10 to-primary/5 rounded-2xl p-4 relative overflow-hidden group cursor-pointer hover:from-secondary/20 transition-all"
          >
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">Upgrade</p>
              <p className="text-sm font-bold text-on-surface">Go Pro — ₹14,999/mo</p>
            </div>
            <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-6xl text-secondary/10 group-hover:text-secondary/20 transition-colors">verified</span>
          </NavLink>

          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs font-headline">DS</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-on-surface truncate">Dr. Sterling</p>
              <p className="text-[10px] text-on-surface-variant truncate">Faculty Head</p>
            </div>
            <button
              onClick={() => { window.location.href = '/login'; }}
              className="p-2 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/5 transition-all"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
