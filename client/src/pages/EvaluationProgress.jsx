import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEvaluation } from '../hooks/useEvaluation';
import { useExam } from '../hooks/useExam';

const EvaluationProgress = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const examId = searchParams.get('examId');
  
  const { evaluations, progress, fetchStatus } = useEvaluation();
  const { exams, fetchExams } = useExam();
  const [polling, setPolling] = useState(true);

  // Fetch exams to find the latest evaluating one if no examId param
  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  // Determine which exam to track
  const targetExamId = examId || exams.find(e => e.status === 'evaluating' || e.status === 'processing')?.id;

  // Poll for evaluation status
  useEffect(() => {
    if (!targetExamId) return;

    const poll = async () => {
      const data = await fetchStatus(targetExamId);
      if (data?.counts?.completed === data?.total || data?.counts?.failed === data?.total) {
        setPolling(false);
      }
    };

    poll();
    const interval = polling ? setInterval(poll, 5000) : null;
    return () => { if (interval) clearInterval(interval); };
  }, [targetExamId, polling, fetchStatus]);

  const currentExam = exams.find(e => e.id === targetExamId);
  const isComplete = progress >= 100;

  return (
    <section className="relative overflow-hidden min-h-full">
      {/* Background AI Theme Elements */}
      <div className="absolute top-0 right-0 -z-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-secondary/5 rounded-full blur-[80px] sm:blur-[120px]"></div>
      
      <div className="max-w-4xl mx-auto sm:mt-12">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold tracking-widest uppercase rounded-full">AI Evaluation Phase</span>
          <h1 className="text-2xl sm:text-4xl font-black mt-4 text-on-surface tracking-tight font-headline">
            {currentExam ? `Processing: ${currentExam.title}` : 'Evaluation Progress'}
          </h1>
          <p className="text-on-surface-variant mt-2 text-xs sm:text-sm max-w-md mx-auto px-4">
            {currentExam 
              ? `Evaluating ${currentExam.subject} • ${currentExam.total_marks} marks`
              : 'AI grading engines are processing student submissions.'}
          </p>
        </div>

        {/* Central Progress Card */}
        <div className="bg-surface-container-lowest p-6 sm:p-12 rounded-[1.5rem] sm:rounded-[2rem] atmospheric-shadow relative overflow-hidden border border-outline-variant/10">
          <div className="absolute top-0 left-0 w-full h-1 bg-surface-container-high">
            <div className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {/* The Animated Progress Ring */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-8 sm:mb-10">
              <div className="absolute inset-0 rounded-full border-[8px] sm:border-[12px] border-surface-container-low"></div>
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  className="text-primary" 
                  cx="50%" cy="50%" fill="transparent" r="45%" 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeWidth="8"
                  style={{ 
                    strokeDasharray: '283', 
                    strokeDashoffset: `${283 - (283 * progress / 100)}`,
                    transition: 'stroke-dashoffset 1s ease'
                  }}
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl sm:text-5xl font-black text-on-surface">{progress}<span className="text-xl sm:text-2xl text-primary">%</span></span>
                <span className="text-[10px] sm:text-xs font-bold text-outline-variant mt-1 uppercase tracking-tighter">
                  {isComplete ? 'Complete' : 'Evaluating'}
                </span>
              </div>
              {!isComplete && <div className="absolute inset-0 rounded-full bg-secondary/10 scale-110 opacity-30 animate-pulse"></div>}
            </div>
            
            {/* Status Indicators */}
            <div className="space-y-4 text-center">
              <div className="flex items-center gap-2 justify-center">
                {isComplete ? (
                  <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                )}
                <span className="text-base sm:text-lg font-bold text-on-surface">
                  {isComplete ? 'Evaluation Complete!' : 'AI evaluating responses...'}
                </span>
              </div>
              <p className="text-outline text-[10px] sm:text-sm px-4">
                {isComplete 
                  ? 'All answer sheets have been evaluated. View results below.'
                  : currentExam 
                    ? `Processing answer sheets for "${currentExam.title}"...`
                    : 'Processing answer sheets...'}
              </p>
              {isComplete && (
                <button 
                  onClick={() => navigate(targetExamId ? `/exams/${targetExamId}` : '/results')}
                  className="mt-4 px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
                >
                  View Results
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div className="mt-12 sm:mt-16 overflow-x-auto no-scrollbar pb-4">
          <div className="flex justify-between relative px-4 min-w-[500px]">
            <div className="absolute top-5 left-12 right-12 h-[2px] bg-surface-container-high -z-10"></div>
            
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-xs sm:text-sm">check</span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-on-surface">Upload</span>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md ${progress > 0 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                <span className="material-symbols-outlined text-xs sm:text-sm">{progress > 0 ? 'check' : 'hourglass_top'}</span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-on-surface">Processing</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                isComplete ? 'bg-primary text-on-primary shadow-md' : 
                progress > 0 ? 'bg-primary-container text-primary border-4 border-surface ring-4 ring-primary/20' : 
                'bg-surface-container-high text-on-surface-variant'
              }`}>
                <span className={`material-symbols-outlined text-xs sm:text-sm ${!isComplete && progress > 0 ? 'animate-spin' : ''}`}>
                  {isComplete ? 'check' : 'cyclone'}
                </span>
              </div>
              <span className={`text-[10px] sm:text-xs font-bold ${progress > 0 && !isComplete ? 'text-primary' : 'text-on-surface'}`}>Evaluation</span>
            </div>

            {/* Step 4 */}
            <div className={`flex flex-col items-center gap-3 ${isComplete ? '' : 'opacity-30'}`}>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${isComplete ? 'bg-emerald-500 text-white shadow-md' : 'bg-surface-container-high text-on-surface-variant'}`}>
                <span className="material-symbols-outlined text-xs sm:text-sm">done_all</span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-on-surface-variant">Completed</span>
            </div>
          </div>
        </div>

        {/* Evaluated Students List */}
        {evaluations.length > 0 && (
          <div className="mt-12 sm:mt-20">
            <div className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 border-l-4 border-primary atmospheric-shadow border border-outline-variant/10">
              <h3 className="text-[10px] sm:text-sm font-black uppercase tracking-widest text-primary mb-6 font-headline">
                Evaluated Students ({evaluations.length})
              </h3>
              <div className="space-y-4">
                {evaluations.map((ev, idx) => (
                  <div key={ev.id || idx} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {(ev.studentName || 'S')[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">{ev.studentName}</p>
                        <p className="text-[10px] text-outline">{ev.rollNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {ev.marksAwarded !== undefined && (
                        <span className="text-sm font-bold text-primary">{ev.marksAwarded} marks</span>
                      )}
                      <span className={`text-[8px] sm:text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        ev.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                        ev.status === 'failed' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {ev.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* No exam found state */}
        {!targetExamId && !polling && (
          <div className="mt-12 text-center bg-surface-container-lowest rounded-xl p-12 atmospheric-shadow">
            <span className="material-symbols-outlined text-outline text-4xl mb-3 block">info</span>
            <p className="text-sm text-on-surface-variant mb-4">No active evaluations found</p>
            <button 
              onClick={() => navigate('/create-exam')}
              className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Start New Evaluation
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EvaluationProgress;
