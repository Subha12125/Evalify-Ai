import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full">
      {/* Hero Heading */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight mb-2 font-headline">Academic Dashboard</h1>
        <p className="text-on-surface-variant text-base sm:text-lg">Welcome back, Dr. Sterling. Here is your evaluation summary for today.</p>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div 
          onClick={() => navigate('/exams')}
          className="bg-white p-6 sm:p-8 rounded-xl atmospheric-shadow flex flex-col justify-between h-40 sm:h-48 group hover:bg-primary transition-all duration-300 cursor-pointer border border-outline-variant/10"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-white/20">
              <span className="material-symbols-outlined text-primary group-hover:text-white" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-primary group-hover:text-white/80 bg-primary/10 group-hover:bg-white/10 px-2 py-1 rounded">Semester 1</span>
          </div>
          <div>
            <p className="text-on-surface-variant group-hover:text-white/70 text-sm font-medium">Total Exams</p>
            <h3 className="text-3xl sm:text-4xl font-black group-hover:text-white font-headline">128</h3>
          </div>
        </div>
        
        <div 
          onClick={() => navigate('/results')}
          className="bg-white p-6 sm:p-8 rounded-xl atmospheric-shadow flex flex-col justify-between h-40 sm:h-48 group hover:bg-secondary transition-all duration-300 cursor-pointer border border-outline-variant/10"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-secondary/10 rounded-lg group-hover:bg-white/20">
              <span className="material-symbols-outlined text-secondary group-hover:text-white" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-secondary group-hover:text-white/80 bg-secondary/10 group-hover:bg-white/10 px-2 py-1 rounded">+12% vs last mo</span>
          </div>
          <div>
            <p className="text-on-surface-variant group-hover:text-white/70 text-sm font-medium">Evaluations Completed</p>
            <h3 className="text-3xl sm:text-4xl font-black group-hover:text-white font-headline">842</h3>
          </div>
        </div>

        <div 
          onClick={() => navigate('/evaluation-progress')}
          className="bg-white p-6 sm:p-8 rounded-xl atmospheric-shadow flex flex-col justify-between h-40 sm:h-48 border-l-4 border-error sm:col-span-2 lg:col-span-1 cursor-pointer hover:bg-error/5 transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-error/10 rounded-lg">
              <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>pending_actions</span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-error bg-error/10 px-2 py-1 rounded uppercase tracking-wider">Urgent</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium">Pending Evaluations</p>
            <h3 className="text-3xl sm:text-4xl font-black text-on-surface font-headline">34</h3>
          </div>
        </div>
      </div>

      {/* Content Split: Main Table & Insights Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <section className="lg:col-span-3 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold tracking-tight font-headline">Recent Activity</h2>
            <button 
              onClick={() => navigate('/results')}
              className="text-primary font-bold text-sm flex items-center gap-1 hover:underline active:scale-95 transition-transform"
            >
              View All Activity
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">
                    <th className="px-6 py-4">Exam Name</th>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  <tr 
                    onClick={() => navigate('/exams/1')}
                    className="hover:bg-surface-container-high transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary opacity-40 group-hover:opacity-100 transition-opacity">description</span>
                        <div>
                          <p className="font-semibold text-on-surface">Advanced Algorithms Final</p>
                          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Batch: CS-2024-A</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">JD</div>
                      <span className="text-sm">John Doe</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Completed</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 hover:bg-surface-container-highest rounded-lg text-outline-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-xl shadow-sm border border-outline-variant/10">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <h4 className="font-bold text-[10px] uppercase tracking-widest text-secondary font-headline">AI Insights</h4>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-secondary/5 rounded-lg border-l-2 border-secondary">
                <p className="text-[10px] font-bold text-secondary mb-1 uppercase tracking-wider">Performance</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">Overall performance in CS-2024-A is up 8%.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
