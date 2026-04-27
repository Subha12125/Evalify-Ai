import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useEvaluation } from '../hooks/useEvaluation';
import MarksTable from '../components/results/MarksTable';
import ScoreCard from '../components/evaluation/ScoreCard';
import Spinner from '../components/ui/Spinner';

const Results = () => {
  const navigate = useNavigate();
  const { evaluations, loading, fetchResults } = useEvaluation();
  const [filter, setFilter] = useState('all');
  const { addToast } = useToast();

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const mockData = [
    { id: 1, name: 'Alex Harrison', rollNo: 'CS2024-001', score: 94, totalMarks: 100, accuracy: 98, status: 'completed' },
    { id: 2, name: 'Sarah Miller', rollNo: 'CS2024-002', score: 82, totalMarks: 100, accuracy: 92, status: 'completed' },
    { id: 3, name: 'James Wilson', rollNo: 'CS2024-003', score: 45, totalMarks: 100, accuracy: 88, status: 'failed' },
    { id: 4, name: 'Elena Rodriguez', rollNo: 'CS2024-004', score: 92, totalMarks: 100, accuracy: 95, status: 'completed' },
  ];

  return (
    <div className="relative min-h-full">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] -z-10 opacity-40 pointer-events-none">
        <div className="absolute top-[-100px] left-[10%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-[50px] right-[10%] w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[80px] animate-pulse delay-700" />
      </div>

      {/* Premium Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Live Analytics</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-headline text-on-surface tracking-tighter mb-3 leading-tight">
            Examination <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Results</span>
          </h1>
          <p className="text-on-surface-variant font-medium text-sm sm:text-base max-w-xl leading-relaxed">
            Advanced analytics for CS102: Data Structures & Algorithms. View granular performance metrics and AI-driven insights.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            onClick={() => addToast('Exporting report to PDF...', 'info')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-on-surface-variant font-bold hover:text-primary transition-all shadow-sm border border-outline-variant/10 hover:shadow-md hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Export
          </button>
          <button 
            onClick={() => navigate('/evaluation-progress')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-container text-white font-bold hover:shadow-xl hover:shadow-primary/30 transition-all border-none hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            Recalculate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-10">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <ScoreCard label="Batch Average" value="78.4%" icon="trending_up" color="primary" subValue="+4.2% vs last year" />
            <ScoreCard label="Evaluation Progress" value="100%" icon="check_circle" color="secondary" />
            <ScoreCard label="Flagged for Review" value="12" icon="error" color="error" />
            <ScoreCard label="AI Confidence" value="98.2%" icon="verified" color="success" noBg={true} />
          </div>
 
          {/* Table Section */}
          <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-xl shadow-surface-container-highest/20 border border-white overflow-hidden atmospheric-shadow">
            <div className="p-8 sm:p-10 border-b border-outline-variant/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <h2 className="font-headline font-extrabold text-2xl text-on-surface tracking-tight mb-1">Performance Matrix</h2>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Individual Student Records</p>
              </div>
              
              {/* Segmented Control */}
              <div className="flex p-1 bg-surface-container-highest/30 rounded-xl">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${filter === 'all' ? 'bg-white text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  All ({mockData.length})
                </button>
                <button 
                  onClick={() => setFilter('flagged')}
                  className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${filter === 'flagged' ? 'bg-white text-error shadow-sm' : 'text-on-surface-variant hover:text-error'}`}
                >
                  Flagged (12)
                </button>
              </div>
            </div>
            
            <div className="p-2">
              {loading ? (
                <div className="py-32 flex flex-col items-center justify-center gap-4">
                  <Spinner size="lg" />
                  <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest animate-pulse">Loading Matrix...</p>
                </div>
              ) : (
                <MarksTable 
                  data={evaluations.length > 0 ? evaluations : mockData} 
                  onRowClick={(row) => navigate(`/exams/${row.id}`)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Rail: AI Insights */}
        <div className="col-span-12 lg:col-span-4 lg:order-2">
          <aside className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-xl shadow-surface-container-highest/20 border border-white atmospheric-shadow sticky top-28 text-on-surface relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 group-hover:bg-secondary/10 transition-colors duration-1000"></div>
            
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </div>
                <h4 className="font-headline font-extrabold text-sm uppercase tracking-widest text-secondary">AI Intelligence</h4>
              </div>
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
              </span>
            </div>
            
            <div className="space-y-8 relative z-10">
              {/* Critical Insight */}
              <div onClick={() => addToast('Opening detailed AI insight report...', 'info')} className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 hover:border-warning/30 transition-colors cursor-pointer group/card shadow-sm hover:shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-warning text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                  <p className="text-[10px] font-bold text-warning uppercase tracking-widest">Performance Bottleneck</p>
                </div>
                <p className="text-lg font-bold mb-2 text-on-surface font-headline group-hover/card:text-secondary transition-colors">Linked List Logic</p>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">64% of students struggled with Question 4. The model detects fundamental misunderstanding of pointer allocation.</p>
                <div className="flex items-center text-xs font-bold text-secondary gap-1 group-hover/card:translate-x-1 transition-transform">
                  <span>View detailed analysis</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              </div>

              {/* Popular Feedback */}
              <div>
                <p className="text-[10px] font-bold text-outline uppercase mb-4 tracking-widest">Common Auto-Corrections</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 rounded-xl bg-surface-container-high border border-transparent text-[10px] font-bold text-on-surface-variant uppercase hover:bg-secondary/10 hover:text-secondary hover:border-secondary/20 transition-all cursor-pointer">"Optimized loop" (42)</span>
                  <span className="px-4 py-2 rounded-xl bg-surface-container-high border border-transparent text-[10px] font-bold text-on-surface-variant uppercase hover:bg-secondary/10 hover:text-secondary hover:border-secondary/20 transition-all cursor-pointer">"Memory leak" (18)</span>
                </div>
              </div>

              {/* Engine Status */}
              <div className="pt-8 border-t border-outline-variant/10">
                <p className="text-[10px] font-bold text-outline uppercase mb-4 tracking-widest">System Telemetry</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-on-surface-variant">OCR Confidence</span>
                    <span className="font-bold text-emerald-600">99.8%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-on-surface-variant">Processing Time</span>
                    <span className="font-bold text-on-surface">14.2s</span>
                  </div>
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
