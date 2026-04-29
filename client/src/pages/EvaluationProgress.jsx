import React from 'react';

const EvaluationProgress = () => {
  return (
    <section className="relative overflow-hidden min-h-full">
      {/* Background AI Theme Elements */}
      <div className="absolute top-0 right-0 -z-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-secondary/5 rounded-full blur-[80px] sm:blur-[120px]"></div>
      
      <div className="max-w-4xl mx-auto sm:mt-12">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold tracking-widest uppercase rounded-full">AI Evaluation Phase</span>
          <h1 className="text-2xl sm:text-4xl font-black mt-4 text-on-surface tracking-tight font-headline">Processing Batch #882</h1>
          <p className="text-on-surface-variant mt-2 text-xs sm:text-sm max-w-md mx-auto px-4">Neural grading engines are scanning student submissions for semantic accuracy and logic coherence.</p>
        </div>

        {/* Central Progress Card */}
        <div className="bg-surface-container-lowest p-6 sm:p-12 rounded-[1.5rem] sm:rounded-[2rem] atmospheric-shadow relative overflow-hidden border border-outline-variant/10">
          <div className="absolute top-0 left-0 w-full h-1 bg-surface-container-high">
            <div className="h-full bg-gradient-to-r from-primary to-secondary w-[68%] transition-all duration-1000"></div>
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
                  strokeDasharray="100 100" 
                  strokeDashoffset="32" 
                  strokeLinecap="round" 
                  strokeWidth="8"
                  style={{ strokeDasharray: '283', strokeDashoffset: '90' }}
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl sm:text-5xl font-black text-on-surface">68<span className="text-xl sm:text-2xl text-primary">%</span></span>
                <span className="text-[10px] sm:text-xs font-bold text-outline-variant mt-1 uppercase tracking-tighter">Evaluation</span>
              </div>
              <div className="absolute inset-0 rounded-full bg-secondary/10 scale-110 opacity-30 animate-pulse"></div>
            </div>
            
            {/* Status Indicators */}
            <div className="space-y-4 text-center">
              <div className="flex items-center gap-2 justify-center">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                <span className="text-base sm:text-lg font-bold text-on-surface">AI evaluating responses...</span>
              </div>
              <p className="text-outline text-[10px] sm:text-sm animate-pulse px-4">Processing answer sheets for "Advanced Microeconomics"...</p>
            </div>
          </div>
        </div>

        {/* Stepper - scrollable on mobile */}
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
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-xs sm:text-sm">check</span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-on-surface">Processing</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-container text-primary flex items-center justify-center border-4 border-surface ring-4 ring-primary/20">
                <span className="material-symbols-outlined text-xs sm:text-sm animate-spin">cyclone</span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-primary">Evaluation</span>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center gap-3 opacity-30">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-xs sm:text-sm">done_all</span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-on-surface-variant">Completed</span>
            </div>
          </div>
        </div>

        {/* Logs & Insights */}
        <div className="mt-12 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 border-l-4 border-primary atmospheric-shadow border border-outline-variant/10">
            <h3 className="text-[10px] sm:text-sm font-black uppercase tracking-widest text-primary mb-6 font-headline">Engine Activity</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="text-sm font-bold text-on-surface">Semantic Verification</p>
                  <p className="text-[10px] sm:text-xs text-on-surface-variant">Cross-referencing curriculum v4.2</p>
                </div>
                <span className="text-[8px] sm:text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold uppercase">Active</span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="text-sm font-bold text-on-surface">Logic Check</p>
                  <p className="text-[10px] sm:text-xs text-on-surface-variant">Validating deductive steps</p>
                </div>
                <span className="text-[8px] sm:text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold uppercase">Active</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest/70 backdrop-blur-xl rounded-xl p-6 sm:p-8 border border-outline-variant/10 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <h3 className="text-[10px] sm:text-sm font-black uppercase tracking-widest text-secondary font-headline text-xs sm:text-sm">Real-time Insights</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-surface/40 p-4 rounded-lg">
                <p className="text-[10px] font-bold text-secondary mb-1 uppercase tracking-wider">Observation</p>
                <p className="text-xs italic text-on-surface-variant">"Student group #4 shows high correlation in logic errors on Question 3."</p>
              </div>
              <div className="bg-surface/40 p-4 rounded-lg">
                <p className="text-[10px] font-bold text-secondary mb-1 uppercase tracking-wider">Performance</p>
                <p className="text-xs text-on-surface-variant">Avg. completion score trending 12% higher than previous semester.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EvaluationProgress;
