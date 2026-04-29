import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useExam } from '../hooks/useExam';
import ScoreCard from '../components/evaluation/ScoreCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { fetchExams } = useExam();

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  const recentActivity = [
    { id: 1, name: 'Advanced Algorithms Final', batch: 'CS-2024-A', student: 'John Doe', initials: 'JD', status: 'Completed', statusColor: 'emerald', route: '/exams/1' },
    { id: 2, name: 'Neural Networks Intro', batch: 'AI-Lab-1', student: 'Alice Smith', initials: 'AS', status: 'Processing', statusColor: 'amber', route: '/evaluation-progress' },
    { id: 3, name: 'Data Structures Midterm', batch: 'CS-2023-B', student: 'James Lee', initials: 'JL', status: 'Completed', statusColor: 'emerald', route: '/exams/3' },
    { id: 4, name: 'Microeconomics Final', batch: 'ECO-2024', student: 'Sara Patel', initials: 'SP', status: 'Flagged', statusColor: 'red', route: '/exams/4' },
  ];

  const statusColors = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
  };

  return (
    <div className="min-h-full">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight mb-2 font-headline">Academic Dashboard</h1>
        <p className="text-on-surface-variant text-sm sm:text-base">Welcome back, {user?.name || 'Professor'}. Here is your evaluation summary.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <ScoreCard label="Total Exams" value="128" icon="menu_book" color="primary" subValue="Sem 1" />
        <ScoreCard label="Completed" value="842" icon="task_alt" color="secondary" subValue="+12%" />
        <ScoreCard label="Pending" value="34" icon="pending_actions" color="error" subValue="Urgent" />
        <ScoreCard label="Students" value="1,247" icon="school" color="success" subValue="Active" />
      </div>

      {/* Chart Area + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 atmospheric-shadow border border-outline-variant/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline font-bold text-sm">Weekly Evaluation Trend</h3>
            <div className="flex gap-2">
              <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-1 rounded uppercase">This Week</span>
            </div>
          </div>
          <div className="flex items-end gap-1 sm:gap-3 h-40">
            {[40, 65, 55, 80, 70, 90, 75].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className={`w-full rounded-lg transition-all hover:opacity-80 ${i === 5 ? 'bg-primary' : 'bg-primary/15'}`}
                  style={{ height: `${h}%` }}
                />
                <span className="text-[9px] font-bold text-outline">{['M','T','W','T','F','S','S'][i]}</span>
              </div>
            ))}
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
              <p className="text-xs text-on-surface-variant leading-relaxed">CS-2024-A batch performance up 8% since midterm.</p>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg border-l-2 border-primary">
              <p className="text-[10px] font-bold text-primary mb-1 uppercase tracking-wider">Suggestion</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">34 pending items are similar. Use Batch Grading to save ~2h.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold tracking-tight font-headline">Recent Activity</h2>
          <button onClick={() => navigate('/results')} className="text-primary font-bold text-xs flex items-center gap-1 hover:underline">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-surface-container-low/50 text-[10px] uppercase tracking-widest font-bold text-outline">
                  <th className="px-6 py-3.5">Exam</th>
                  <th className="px-6 py-3.5">Student</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {recentActivity.map((item) => (
                  <tr key={item.id} onClick={() => navigate(item.route)} className="hover:bg-surface-container-low/50 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">description</span>
                        <div>
                          <p className="font-semibold text-sm text-on-surface">{item.name}</p>
                          <p className="text-[10px] font-bold text-outline uppercase tracking-wider">{item.batch}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[9px]">{item.initials}</div>
                        <span className="text-sm text-on-surface-variant">{item.student}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${statusColors[item.statusColor]}`}></span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{item.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 hover:bg-surface-container-highest rounded-lg text-outline-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
