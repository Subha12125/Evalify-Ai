import React from 'react';
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-headline text-on-surface tracking-tight mb-2">Examination Results</h1>
          <p className="text-on-surface-variant text-sm sm:text-base max-w-xl">Advanced analytics for CS102: Data Structures & Algorithms. View granular performance metrics.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            onClick={() => alert('Filtering results...')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface-container-lowest text-on-surface-variant font-semibold hover:bg-surface-container-high transition-colors atmospheric-shadow border border-outline-variant/10"
          >
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filters
          </button>
          <button 
            onClick={() => navigate('/evaluation-progress')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-on-primary font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all border-none"
          >
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            Recalculate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 xl:col-span-8 space-y-12">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-6 rounded-xl atmospheric-shadow border border-outline-variant/10 group hover:border-primary/40 transition-colors cursor-default">
              <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Average</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-headline text-primary">78.4%</h3>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-green-600">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                +4.2%
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl atmospheric-shadow border border-outline-variant/10 group hover:border-secondary/40 transition-colors cursor-default">
              <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Progress</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-headline text-secondary">92%</h3>
              <div className="w-full bg-surface-container-high h-1 rounded-full mt-4 overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl atmospheric-shadow border border-outline-variant/10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Flagged</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-headline text-error">12</h3>
              <p className="mt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Manual Review</p>
            </div>
            <div className="bg-primary-container p-6 rounded-xl text-on-primary-container shadow-lg shadow-primary-container/20">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">Confidence</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-headline">High</h3>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold">
                <span className="material-symbols-outlined text-xs">verified</span>
                98.2% Accurate
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden">
            <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-container-low/50">
              <h2 className="font-headline font-bold text-lg text-on-surface tracking-tight">Performance Matrix</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-[9px] font-bold uppercase tracking-wider">All (142)</span>
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[9px] font-bold uppercase tracking-wider">Graded (130)</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-surface-container-low/30 border-b border-outline-variant/10 text-on-surface-variant">
                    <th className="px-8 py-4 font-headline font-bold text-[10px] uppercase tracking-widest">Name</th>
                    <th className="px-8 py-4 font-headline font-bold text-[10px] uppercase tracking-widest">Roll #</th>
                    <th className="px-8 py-4 font-headline font-bold text-[10px] uppercase tracking-widest text-center">Marks</th>
                    <th className="px-8 py-4 font-headline font-bold text-[10px] uppercase tracking-widest text-center">Status</th>
                    <th className="px-8 py-4 font-headline font-bold text-[10px] uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  <tr 
                    onClick={() => navigate('/exams/1')}
                    className="hover:bg-surface-container-high transition-colors cursor-pointer group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold font-headline text-xs">AH</div>
                        <div>
                          <p className="font-semibold text-sm text-on-surface">Alex Harrison</p>
                          <p className="text-[10px] text-on-surface-variant">alex.h@university.edu</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-body text-xs text-on-surface-variant">CS2024-001</td>
                    <td className="px-8 py-5 text-center">
                      <span className="font-headline font-extrabold text-lg text-on-surface">94/100</span>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">Graded</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Insights Rail */}
        <div className="col-span-12 xl:col-span-4 lg:order-2">
          <aside className="bg-surface-container-lowest/80 backdrop-blur-xl rounded-2xl p-6 atmospheric-shadow border border-outline-variant/10 sticky top-28">
            <div className="flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <h4 className="font-headline font-extrabold text-[10px] uppercase tracking-widest text-secondary">AI Insights</h4>
            </div>
            
            <div className="space-y-8">
              <div 
                onClick={() => alert('Viewing detailed bottleneck report')}
                className="p-4 rounded-xl bg-primary/5 border-l-4 border-primary cursor-pointer hover:bg-primary/10 transition-colors"
              >
                <p className="text-[10px] font-bold text-outline uppercase mb-2 tracking-tighter">Performance Bottleneck</p>
                <p className="text-sm font-semibold mb-2 text-on-surface font-headline">Linked List Logic</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">64% of students struggled with Question 4. Click for AI analysis.</p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-outline uppercase mb-4 tracking-tighter">Popular Feedback</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-[9px] font-bold text-on-surface-variant uppercase cursor-pointer hover:bg-primary hover:text-white transition-all">"Optimized loop"</span>
                  <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-[9px] font-bold text-on-surface-variant uppercase cursor-pointer hover:bg-primary hover:text-white transition-all">"Memory leak"</span>
                </div>
              </div>

              <div className="pt-6 border-t border-outline-variant/20 space-y-3">
                <p className="text-[10px] font-bold text-outline uppercase mb-1 tracking-tighter">Status</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-on-surface-variant">Scanning</span>
                  <span className="font-bold text-green-600">Complete</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-on-surface-variant">Grading</span>
                  <span className="font-bold text-green-600">Complete</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Results;
