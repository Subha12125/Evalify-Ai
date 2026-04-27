import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

const Landing = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  return (
    <div className="min-h-screen bg-background text-on-surface overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-outline-variant/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center ai-glow">
            <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <span className="text-xl font-black font-headline tracking-tight">Evalify AI</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/login')} className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Sign In</button>
          <Button onClick={() => navigate('/login')} size="sm">Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10 opacity-30">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-700" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-8 animate-page-in">
          <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">The Future of Academic Assessment</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter mb-6 max-w-4xl leading-[1.1]">
          Evaluate Exams with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI Precision</span>
        </h1>
        
        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
          The all-in-one platform for educators to scan, grade, and analyze student response sheets using advanced vision models. 
          <span className="font-bold text-primary"> Save 80% of your time.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button onClick={() => navigate('/login')} size="lg" className="flex-1 shadow-2xl">Start Evaluating Free</Button>
          <Button onClick={() => addToast('Opening video player...', 'info')} variant="outline" size="lg" className="flex-1">Watch Demo</Button>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 w-full max-w-5xl rounded-3xl atmospheric-shadow border border-white/20 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
            alt="Dashboard Preview" 
            className="w-full h-auto grayscale-[20%] group-hover:scale-[1.02] transition-transform duration-700"
          />
        </div>
      </header>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">document_scanner</span>
            </div>
            <h3 className="text-xl font-bold font-headline">Fast Batch Upload</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">Simply drag and drop a folder of scanned answer sheets. Our AI handles the splitting and sorting automatically.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-3xl">psychology</span>
            </div>
            <h3 className="text-xl font-bold font-headline">Human-Grade OCR</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">Advanced handwriting recognition tailored for academic contexts, supporting multiple languages and complex notation.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center text-success">
              <span className="material-symbols-outlined text-3xl">insights</span>
            </div>
            <h3 className="text-xl font-bold font-headline">Deep Performance Analytics</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">Get automated insights into batch-wide strengths, weaknesses, and curriculum gaps with visual dashboards.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-outline-variant/10 text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">auto_awesome</span>
          </div>
          <span className="text-lg font-black font-headline tracking-tight">Evalify AI</span>
        </div>
        <p className="text-outline text-xs uppercase tracking-widest font-black">Empowering the academic edge.</p>
      </footer>
    </div>
  );
};

export default Landing;
