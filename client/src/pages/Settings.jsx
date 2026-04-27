import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [aiAutoGrade, setAiAutoGrade] = useState(true);

  const Toggle = ({ checked, onChange }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-surface-container-highest'}`}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform ${checked ? 'left-6' : 'left-1'}`} />
    </button>
  );

  return (
    <div className="min-h-full max-w-3xl">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold font-headline mb-2">Settings</h1>
        <p className="text-on-surface-variant text-sm">Manage your account, preferences and integrations.</p>
      </div>

      {/* Profile */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 atmospheric-shadow border border-outline-variant/10 mb-6">
        <h2 className="text-[10px] font-black uppercase tracking-widest text-outline mb-6">Profile</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl font-headline">
            {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold font-headline">{user?.name || 'Professor'}</h3>
            <p className="text-sm text-on-surface-variant">{user?.email || 'user@university.edu'} • Faculty</p>
          </div>
          <button className="px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-lg font-bold text-xs hover:bg-surface-container-highest transition-all">
            Edit Profile
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-outline">Full Name</label>
            <input className="w-full px-4 py-3 bg-surface-container-high/50 rounded-lg text-sm text-on-surface border-none focus:ring-2 focus:ring-primary/30" defaultValue={user?.name || ''} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-outline">Department</label>
            <input className="w-full px-4 py-3 bg-surface-container-high/50 rounded-lg text-sm text-on-surface border-none focus:ring-2 focus:ring-primary/30" placeholder="e.g. Computer Science" />
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 atmospheric-shadow border border-outline-variant/10 mb-6">
        <h2 className="text-[10px] font-black uppercase tracking-widest text-outline mb-6">Preferences</h2>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-bold text-on-surface">Dark Mode</p>
              <p className="text-xs text-on-surface-variant">Switch to dark theme</p>
            </div>
            <Toggle checked={darkMode} onChange={setDarkMode} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-bold text-on-surface">Email Notifications</p>
              <p className="text-xs text-on-surface-variant">Receive grading alerts via email</p>
            </div>
            <Toggle checked={emailNotifs} onChange={setEmailNotifs} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-bold text-on-surface">AI Auto-Grading</p>
              <p className="text-xs text-on-surface-variant">Allow AI to auto-submit grades</p>
            </div>
            <Toggle checked={aiAutoGrade} onChange={setAiAutoGrade} />
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 atmospheric-shadow border border-error/20 mb-6">
        <h2 className="text-[10px] font-black uppercase tracking-widest text-error mb-6">Danger Zone</h2>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm font-bold text-on-surface">Delete Account</p>
            <p className="text-xs text-on-surface-variant">Permanently remove all data and evaluations.</p>
          </div>
          <button className="px-4 py-2 bg-error/10 text-error rounded-lg font-bold text-xs hover:bg-error hover:text-white transition-all">
            Delete Account
          </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
