import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvaluation } from '../hooks/useEvaluation';
import MarksTable from '../components/results/MarksTable';
import ScoreCard from '../components/evaluation/ScoreCard';
import Spinner from '../components/ui/Spinner';

const Results = () => {
  const navigate = useNavigate();
  const { evaluations, loading, fetchResults } = useEvaluation();

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const mockData = [
    { id: 1, name: 'Alex Harrison', rollNo: 'CS2024-001', score: 94, totalMarks: 100, accuracy: 98, status: 'completed' },
    { id: 2, name: 'Sarah Miller', rollNo: 'CS2024-002', score: 82, totalMarks: 100, accuracy: 92, status: 'completed' },
    { id: 3, name: 'James Wilson', rollNo: 'CS2024-003', score: 45, totalMarks: 100, accuracy: 88, status: 'failed' },
  ];

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
        <div className="col-span-12 lg:col-span-8 space-y-12">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <ScoreCard label="Average" value="78.4%" icon="trending_up" color="primary" subValue="+4.2%" />
            <ScoreCard label="Progress" value="92%" icon="check_circle" color="secondary" />
            <ScoreCard label="Flagged" value="12" icon="error" color="error" />
            <ScoreCard label="Confidence" value="98.2%" icon="verified" noBg={true} />
          </div>
 
          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden">
            <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-container-low/50">
              <h2 className="font-headline font-bold text-lg text-on-surface tracking-tight">Performance Matrix</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-[9px] font-bold uppercase tracking-wider">All ({mockData.length})</span>
              </div>
            </div>
            
            {loading ? (
              <div className="py-20"><Spinner size="lg" /></div>
            ) : (
              <MarksTable 
                data={evaluations.length > 0 ? evaluations : mockData} 
                onRowClick={(row) => navigate(`/exams/${row.id}`)}
              />
            )}
          </div>
        </div>

        {/* Insights Rail */}
        <div className="col-span-12 lg:col-span-4 lg:order-2">
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
