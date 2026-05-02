import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useExam } from '../hooks/useExam';
import { useEvaluation } from '../hooks/useEvaluation';
import { resultsService } from '../services/results.service';
import Spinner from '../components/ui/Spinner';

const ExamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { currentExam, loading: examLoading, fetchExamById } = useExam();
  const { evaluations, fetchResults } = useEvaluation();
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState(null);
  const [resultsLoading, setResultsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchExamById(id);
      fetchResults(id);
      
      // Fetch results
      resultsService.getExamResults(id)
        .then(data => {
          setResults(data.results || []);
          setStats(data.stats || null);
        })
        .catch(() => {})
        .finally(() => setResultsLoading(false));
    }
  }, [id, fetchExamById, fetchResults]);

  const exam = currentExam;

  const handleExport = async (format) => {
    try {
      addToast(`Exporting ${format.toUpperCase()}...`, 'info');
      const data = await resultsService.exportResults(id, format);
      
      if (format === 'csv') {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `results-${id}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }
      addToast('Export downloaded!', 'success');
    } catch (err) {
      addToast('Export failed', 'error');
    }
  };

  if (examLoading || !exam) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  const statusColors = {
    completed: 'text-emerald-700 bg-emerald-100',
    evaluating: 'text-amber-700 bg-amber-100',
    processing: 'text-amber-700 bg-amber-100',
    pending: 'text-blue-700 bg-blue-100',
    failed: 'text-red-700 bg-red-100',
  };

  return (
    <div className="relative min-h-full">
      {/* Header Section */}
      <section className="mb-10 sm:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <nav className="flex flex-wrap mb-4 items-center text-[10px] sm:text-xs text-outline uppercase tracking-widest font-bold gap-2">
            <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/exams')}>Exams</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-primary truncate max-w-[200px]">{exam.title}</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined scale-110 sm:scale-150" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight leading-tight mb-1 font-headline">{exam.title}</h1>
              <p className="text-[10px] sm:text-sm text-on-surface-variant font-medium">
                Subject: {exam.subject} • Total Marks: {exam.total_marks}
                <span className={`ml-3 px-2 py-0.5 rounded text-[9px] font-bold uppercase ${statusColors[exam.status] || 'text-gray-600 bg-gray-100'}`}>
                  {exam.status}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          <button onClick={() => handleExport('csv')} className="flex-1 sm:flex-none bg-surface-container-lowest text-on-surface-variant px-4 sm:px-6 py-3 rounded-lg font-bold shadow-sm flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all border border-outline-variant/10 text-xs">
            <span className="material-symbols-outlined text-sm">download</span>
            CSV
          </button>
          <button 
            onClick={() => {
              if (exam.status !== 'completed') {
                navigate('/create-exam');
              } else {
                handleExport('pdf');
              }
            }}
            className="flex-1 sm:flex-none bg-primary text-on-primary px-4 sm:px-6 py-3 rounded-lg font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:opacity-90 transition-all text-xs"
          >
            <span className="material-symbols-outlined text-sm">{exam.status === 'completed' ? 'download' : 'replay'}</span>
            {exam.status === 'completed' ? 'PDF' : 'Re-evaluate'}
          </button>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        <div className="md:col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-xl p-6 sm:p-8 flex flex-col justify-between atmospheric-shadow border border-outline-variant/10">
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-outline mb-6">Exam Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-on-surface-variant">Subject</span>
                <span className="text-sm font-bold text-on-surface">{exam.subject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-on-surface-variant">Total Marks</span>
                <span className="text-sm font-bold text-on-surface">{exam.total_marks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-on-surface-variant">Status</span>
                <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${statusColors[exam.status] || 'text-gray-600 bg-gray-100'}`}>{exam.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-on-surface-variant">Created</span>
                <span className="text-sm font-bold text-on-surface">{new Date(exam.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Insight Card */}
        <div className="md:col-span-12 lg:col-span-8 bg-primary rounded-xl p-6 sm:p-8 text-on-primary relative overflow-hidden shadow-xl shadow-primary/20 min-h-[200px]">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary-fixed-dim font-headline">Evaluation Summary</h3>
              </div>
              <p className="text-base sm:text-xl font-medium leading-relaxed max-w-2xl text-on-primary font-body">
                {exam.status === 'completed' 
                  ? `Evaluation completed for "${exam.title}". ${results.length} student(s) evaluated with AI-powered grading.`
                  : exam.status === 'failed'
                  ? `Evaluation failed for "${exam.title}". You can re-try from the Create Exam page.`
                  : exam.status === 'evaluating'
                  ? `AI is currently evaluating "${exam.title}". Check back shortly for results.`
                  : `Exam "${exam.title}" is ready for evaluation. Upload answer sheets to begin.`
                }
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 sm:gap-4">
              <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold border border-white/10">Subject: {exam.subject}</div>
              <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold border border-white/10">Max: {exam.total_marks} marks</div>
              {results.length > 0 && (
                <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold border border-white/10">Students: {results.length}</div>
              )}
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-20 pointer-events-none">
            <span className="material-symbols-outlined text-[150px] sm:text-[200px]" style={{ fontVariationSettings: "'wght' 100" }}>psychology</span>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6 sm:mb-8 font-headline text-on-surface">
          {results.length > 0 ? 'Student Results' : 'Assessment Details'}
        </h2>
        
        {resultsLoading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : results.length > 0 ? (
          <div className="bg-white rounded-xl overflow-hidden atmospheric-shadow border border-outline-variant/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-surface-container-low/50 text-[10px] uppercase tracking-widest font-bold text-outline">
                    <th className="px-6 py-3.5">Student</th>
                    <th className="px-6 py-3.5">Marks</th>
                    <th className="px-6 py-3.5">Feedback</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {results.map((result, idx) => (
                    <tr key={result.id || idx} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                            {(result.students?.name || 'S')[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{result.students?.name || 'Student'}</p>
                            <p className="text-[10px] text-outline">{result.students?.roll_number || ''}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-black text-primary">{result.total_marks_awarded}</span>
                        <span className="text-sm text-outline">/{result.total_max_marks || exam.total_marks}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant max-w-xs truncate">{result.overall_feedback || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-xl p-12 text-center atmospheric-shadow border border-outline-variant/10">
            <span className="material-symbols-outlined text-outline text-4xl mb-3 block">assignment</span>
            <p className="text-sm text-on-surface-variant mb-2">No results available yet</p>
            <p className="text-xs text-outline">
              {exam.status === 'pending' 
                ? 'Upload answer sheets from the Create Exam page to start evaluation.'
                : exam.status === 'failed'
                ? 'The evaluation failed. Please try again.'
                : 'Results will appear here once evaluation is complete.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamDetail;
