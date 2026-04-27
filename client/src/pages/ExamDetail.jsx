import React from 'react';

const ExamDetail = () => {
  return (
    <div className="relative min-h-full">
      {/* Header Section */}
      <section className="mb-10 sm:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <nav className="flex flex-wrap mb-4 items-center text-[10px] sm:text-xs text-outline uppercase tracking-widest font-bold gap-2">
            <span>Exams</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="truncate max-w-[100px] sm:max-w-none">Fall 2023 Midterm</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-primary">Detail</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined scale-110 sm:scale-150" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight leading-tight mb-1 font-headline">Elena Rodriguez</h1>
              <p className="text-[10px] sm:text-sm text-on-surface-variant font-medium">ID: #UG-88291 • CS 101</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none bg-surface-container-lowest text-on-surface-variant px-4 sm:px-6 py-3 rounded-lg font-bold shadow-sm flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all border border-outline-variant/10 text-xs">
            <span className="material-symbols-outlined text-sm">mail</span>
            Email
          </button>
          <button className="flex-1 sm:flex-none bg-primary text-on-primary px-4 sm:px-6 py-3 rounded-lg font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:opacity-90 transition-all text-xs">
            <span className="material-symbols-outlined text-sm">download</span>
            PDF
          </button>
        </div>
      </section>

      {/* Bento Grid Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        {/* Overall Score Card */}
        <div className="md:col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-xl p-6 sm:p-8 flex flex-col justify-between atmospheric-shadow border border-outline-variant/10">
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-outline mb-6">Aggregate Performance</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl sm:text-7xl font-black text-primary tracking-tighter font-headline">92</span>
              <span className="text-xl sm:text-2xl font-bold text-outline-variant">/ 100</span>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex justify-between text-xs sm:text-sm font-semibold mb-2">
              <span className="text-on-surface">Percentile</span>
              <span className="text-primary font-bold">Top 5%</span>
            </div>
            <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>
        
        {/* AI Insight Card */}
        <div className="md:col-span-12 lg:col-span-8 bg-primary rounded-xl p-6 sm:p-8 text-on-primary relative overflow-hidden shadow-xl shadow-primary/20 min-h-[200px]">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary-fixed-dim font-headline">AI Summary</h3>
              </div>
              <p className="text-base sm:text-xl font-medium leading-relaxed max-w-2xl text-on-primary font-body">
                "Elena demonstrates exceptional conceptual clarity in algorithm design. Her responses show a sophisticated understanding of time complexity."
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 sm:gap-4">
              <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold border border-white/10">Logic: Advanced</div>
              <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold border border-white/10">Clarity: High</div>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-20 pointer-events-none">
            <span className="material-symbols-outlined text-[150px] sm:text-[200px]" style={{ fontVariationSettings: "'wght' 100" }}>psychology</span>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6 sm:mb-8 font-headline text-on-surface">Assessment Breakdown</h2>
        
        {/* Questions */}
        {[
          { id: '01', title: 'Data Structures & Logic', q: 'Explain the trade-offs between an Array-based list and a Linked List...', a: 'Array lists offer O(1) access but O(n) insertion if resizing is needed...', score: '20/20' },
          { id: '02', title: 'Algorithms', q: 'Provide a pseudo-code implementation of a recursive Binary Search.', a: 'function search(arr, target, low, high) { ... }', score: '18/20' }
        ].map((item) => (
          <div key={item.id} className="bg-surface-container-lowest rounded-xl overflow-hidden atmospheric-shadow border border-outline-variant/10 group">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 sm:p-8 md:w-2/3 border-r border-outline-variant/10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-on-surface text-surface flex items-center justify-center text-xs font-bold font-headline">{item.id}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-outline">{item.title}</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold mb-4 text-on-surface font-headline leading-snug">{item.q}</h4>
                <div className="p-4 bg-surface-container-low rounded-lg italic text-on-surface-variant text-xs sm:text-sm leading-relaxed border-l-4 border-primary/20 font-body">
                  "{item.a}"
                </div>
              </div>
              <div className="p-6 sm:p-8 md:w-1/3 bg-surface-container-low/30 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold text-outline uppercase tracking-widest">Score</span>
                  <span className="text-xl sm:text-2xl font-black text-primary font-headline">{item.score}</span>
                </div>
                <div className="p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-secondary text-sm">auto_awesome</span>
                    <span className="text-[10px] font-bold text-on-surface font-headline">AI Feedback</span>
                  </div>
                  <p className="text-[10px] sm:text-xs leading-relaxed text-on-surface-variant">Perfect identification of Big O notation and memory overhead.</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamDetail;
