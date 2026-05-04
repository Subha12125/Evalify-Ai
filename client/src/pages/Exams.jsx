import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExam } from '../hooks/useExam';
import { useToast } from '../context/ToastContext';
import StatusBadge from '../components/evaluation/StatusBadge';
import Spinner from '../components/ui/Spinner';

const Exams = () => {
  const navigate = useNavigate();
  const { exams, loading, fetchExams } = useExam();
  const { addToast } = useToast();

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  return (
    <div className="min-h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-headline text-on-surface tracking-tight mb-1 sm:mb-2">Examination Materials</h1>
          <p className="text-on-surface-variant text-xs sm:text-sm md:text-base">Manage and review your laboratory and lecture exam papers.</p>
        </div>
        <button 
          onClick={() => navigate('/create-exam')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          New Exam
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl atmospheric-shadow overflow-hidden border border-outline-variant/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[450px]">
              <thead>
                <tr className="bg-surface-container-low/50 text-[10px] font-bold uppercase tracking-widest text-outline">
                  <th className="px-4 sm:px-8 py-3 sm:py-4">Examination Title</th>
                  <th className="px-4 sm:px-8 py-3 sm:py-4 hidden sm:table-cell">Subject</th>
                  <th className="px-4 sm:px-8 py-3 sm:py-4">Marks</th>
                  <th className="px-4 sm:px-8 py-3 sm:py-4">Status</th>
                  <th className="px-4 sm:px-8 py-3 sm:py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {exams.length > 0 ? (
                  exams.map((exam) => (
                    <tr 
                      key={exam.id} 
                      className="hover:bg-surface-container-low transition-colors cursor-pointer group"
                      onClick={() => navigate(`/exams/${exam.id}`)}
                    >
                      <td className="px-4 sm:px-8 py-4 sm:py-6">
                        <div className="flex items-center gap-2 sm:gap-4">
                          <div className="p-1.5 sm:p-2 bg-primary/5 rounded-lg text-primary flex-shrink-0">
                            <span className="material-symbols-outlined text-lg sm:text-2xl">description</span>
                          </div>
                          <span className="font-bold text-on-surface font-headline text-xs sm:text-base truncate max-w-[140px] sm:max-w-none">{exam.name || exam.title}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-8 py-4 sm:py-6 text-sm text-on-surface-variant font-medium hidden sm:table-cell">{exam.subject}</td>
                      <td className="px-4 sm:px-8 py-4 sm:py-6 text-xs sm:text-sm text-outline font-medium">{exam.total_marks}</td>
                      <td className="px-4 sm:px-8 py-4 sm:py-6">
                        <StatusBadge status={exam.status?.toLowerCase() || 'pending'} />
                      </td>
                      <td className="px-4 sm:px-8 py-4 sm:py-6 text-right">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToast('Opening options menu...', 'info');
                          }}
                          className="p-1.5 sm:p-2 hover:bg-white rounded-lg text-outline hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-8 py-20 text-center">
                      <p className="text-on-surface-variant text-sm">No exams found. Create your first one!</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exams;
