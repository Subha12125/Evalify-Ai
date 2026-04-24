import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate('/dashboard'), 800);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-surface">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[100px]"></div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#2036bd 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
        />
      </div>

      <main className="w-full max-w-md px-6 z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center mb-6 ai-glow">
            <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Evalify AI</h1>
          <p className="text-on-surface-variant font-medium text-sm">Empowering the Academic Edge</p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-2xl atmospheric-shadow">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-on-surface mb-1 font-headline">Welcome back</h2>
            <p className="text-on-surface-variant text-sm">Enter your faculty credentials.</p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-on-surface uppercase tracking-widest" htmlFor="email">Email</label>
              <input
                className="w-full px-4 py-3 bg-surface-container-high/50 rounded-lg focus:ring-2 focus:ring-primary/40 text-on-surface placeholder:text-outline text-sm transition-all border-none"
                id="email"
                placeholder="professor@university.edu"
                type="email"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-bold text-on-surface uppercase tracking-widest" htmlFor="password">Password</label>
                <a className="text-[10px] font-bold text-primary hover:underline" href="#">Forgot?</a>
              </div>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 pr-12 bg-surface-container-high/50 rounded-lg focus:ring-2 focus:ring-primary/40 text-on-surface placeholder:text-outline text-sm transition-all border-none"
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary bg-surface-container-highest" id="remember" type="checkbox" />
              <label className="ml-2 text-sm text-on-surface-variant" htmlFor="remember">Keep me authenticated</label>
            </div>

            <button
              className={`w-full py-3.5 bg-primary text-on-primary font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 ${loading ? 'opacity-70 pointer-events-none' : 'hover:opacity-90 active:scale-[0.98]'}`}
              type="submit"
            >
              {loading ? (
                <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-outline-variant/10">
            <p className="text-center text-[10px] font-bold text-outline uppercase tracking-widest mb-5">Or continue with</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={handleLogin} className="flex items-center justify-center gap-2 py-2.5 px-4 bg-surface-container-low hover:bg-surface-container-high rounded-xl text-sm font-medium text-on-surface transition-colors">
                <img alt="Google" className="w-4 h-4" src="https://www.google.com/favicon.ico" />
                <span>Google SSO</span>
              </button>
              <button onClick={handleLogin} className="flex items-center justify-center gap-2 py-2.5 px-4 bg-surface-container-low hover:bg-surface-container-high rounded-xl text-sm font-medium text-on-surface transition-colors">
                <span className="material-symbols-outlined text-lg">account_balance</span>
                <span>LMS</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-on-surface-variant">
            New to Evalify? <a className="text-primary font-bold hover:underline" href="#">Request Access</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
