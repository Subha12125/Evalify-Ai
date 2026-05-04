import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useExam } from '../hooks/useExam';
import { useQuota } from '../hooks/useQuota';
import ScoreCard from '../components/evaluation/ScoreCard';
import Spinner from '../components/ui/Spinner';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { exams, loading, fetchExams } = useExam();
  const { remaining, limit, plan, fetchQuota } = useQuota();

  useEffect(() => {
    fetchExams();
    fetchQuota();
  }, [fetchExams, fetchQuota]);

  // Compute real stats from exams data
  const totalExams = exams.length;
  const completedExams = exams.filter(e => e.status === 'completed').length;
  const pendingExams = exams.filter(e => ['pending', 'evaluating', 'processing'].includes(e.status)).length;
  const failedExams = exams.filter(e => e.status === 'failed').length;

  const statusColors = {
    completed: 'bg-emerald-500',
    evaluating: 'bg-amber-500',
    processing: 'bg-amber-500',
    pending: 'bg-blue-500',
    failed: 'bg-red-500',
  };

  const statusLabels = {
    completed: 'Completed',
    evaluating: 'Processing',
    processing: 'Processing',
    pending: 'Pending',
    failed: 'Failed',
  };

  return (
    <div className="min-h-full">
      <div className="mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-1 sm:mb-2 font-headline">Academic Dashboard</h1>
        <p className="text-on-surface-variant text-xs sm:text-sm md:text-base">Welcome back, {user?.name || 'Professor'}. Here is your evaluation summary.</p>
      </div>

      {/* Stats Grid — Real Data */}
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-10">
        <ScoreCard label="Total Exams" value={String(totalExams)} icon="menu_book" color="primary" subValue="All Time" />
        <ScoreCard label="Completed" value={String(completedExams)} icon="task_alt" color="secondary" subValue={totalExams > 0 ? `${Math.round((completedExams / totalExams) * 100)}%` : '—'} />
        <ScoreCard label="Pending" value={String(pendingExams)} icon="pending_actions" color="error" subValue={pendingExams > 0 ? 'In Progress' : 'None'} />
        <ScoreCard label="Daily Quota" value={`${remaining}/${limit}`} icon="toll" color={remaining > 0 ? 'success' : 'error'} subValue={plan === 'free' ? 'Free Tier' : plan} />
      </div>

      {/* Chart Area + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div className="lg:col-span-2 bg-white rounded-xl p-4 sm:p-6 atmospheric-shadow border border-outline-variant/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline font-bold text-sm">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <button 
              onClick={() => navigate('/create-exam')}
              className="p-6 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors text-left group"
            >
              <span className="material-symbols-outlined text-primary text-2xl mb-3 group-hover:scale-110 transition-transform inline-block">add_circle</span>
              <p className="font-bold text-sm text-on-surface">New Evaluation</p>
              <p className="text-xs text-on-surface-variant mt-1">Upload & evaluate answer sheets</p>
            </button>
            <button 
              onClick={() => navigate('/exams')}
              className="p-6 rounded-xl bg-secondary/5 hover:bg-secondary/10 transition-colors text-left group"
            >
              <span className="material-symbols-outlined text-secondary text-2xl mb-3 group-hover:scale-110 transition-transform inline-block">menu_book</span>
              <p className="font-bold text-sm text-on-surface">View Exams</p>
              <p className="text-xs text-on-surface-variant mt-1">Manage all your examinations</p>
            </button>
            <button 
              onClick={() => navigate('/results')}
              className="p-6 rounded-xl bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors text-left group"
            >
              <span className="material-symbols-outlined text-emerald-600 text-2xl mb-3 group-hover:scale-110 transition-transform inline-block">analytics</span>
              <p className="font-bold text-sm text-on-surface">Results</p>
              <p className="text-xs text-on-surface-variant mt-1">View scores & AI insights</p>
            </button>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 atmospheric-shadow border border-outline-variant/10">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <h4 className="font-bold text-[10px] uppercase tracking-widest text-secondary font-headline">AI Insights</h4>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-secondary/5 rounded-lg border-l-2 border-secondary">
              <p className="text-[10px] font-bold text-secondary mb-1 uppercase tracking-wider">Performance</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {completedExams > 0 
                  ? `${completedExams} exam(s) evaluated successfully. AI models are ready.`
                  : 'No evaluations yet. Upload your first exam to get started.'}
              </p>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg border-l-2 border-primary">
              <p className="text-[10px] font-bold text-primary mb-1 uppercase tracking-wider">Suggestion</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {pendingExams > 0
                  ? `${pendingExams} pending evaluation(s). Check the Exams page for details.`
                  : 'All evaluations are up to date. Create a new exam to continue.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Exams Table — Real Data */}
      <div>
        <div className="flex justify-between items-center mb-4 sm:mb-5">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight font-headline">Recent Exams</h2>
          <button onClick={() => navigate('/exams')} className="text-primary font-bold text-xs flex items-center gap-1 hover:underline">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center py-16">
                <Spinner size="lg" />
              </div>
            ) : exams.length > 0 ? (
              <table className="w-full text-left border-collapse min-w-[400px]">
                <thead>
                  <tr className="bg-surface-container-low/50 text-[10px] uppercase tracking-widest font-bold text-outline">
                    <th className="px-3 sm:px-6 py-3 sm:py-3.5">Exam</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-3.5 hidden sm:table-cell">Subject</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-3.5">Marks</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-3.5">Status</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {exams.slice(0, 5).map((exam) => (
                    <tr key={exam.id} onClick={() => navigate(`/exams/${exam.id}`)} className="hover:bg-surface-container-low/50 transition-colors cursor-pointer group">
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors text-lg sm:text-2xl">description</span>
                          <p className="font-semibold text-xs sm:text-sm text-on-surface truncate max-w-[120px] sm:max-w-none">{exam.title || exam.name}</p>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-on-surface-variant hidden sm:table-cell">{exam.subject}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-on-surface-variant font-medium">{exam.total_marks}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusColors[exam.status] || 'bg-gray-400'}`}></span>
                          <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{statusLabels[exam.status] || exam.status}</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                        <button className="p-1 sm:p-1.5 hover:bg-surface-container-highest rounded-lg text-outline-variant hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-lg">chevron_right</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-outline text-4xl mb-3 block">menu_book</span>
                <p className="text-sm text-on-surface-variant mb-4">No exams yet. Create your first evaluation!</p>
                <button 
                  onClick={() => navigate('/create-exam')}
                  className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg text-sm hover:opacity-90 transition-opacity"
                >
                  Create Exam
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
