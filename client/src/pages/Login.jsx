import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate authentication
    navigate('/dashboard');
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Subtle Academic/AI-Themed Background */}
      <div className="absolute inset-0 -z-10 bg-surface">
        {/* Soft Gradient Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[100px]"></div>
        {/* Subtle Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'radial-gradient(#2036bd 0.5px, transparent 0.5px)', 
            backgroundSize: '24px 24px' 
          }}
        ></div>
      </div>

      {/* Main Content Canvas */}
      <main className="w-full max-w-md px-6 z-10">
        {/* Brand Identity */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center mb-6 ai-glow">
            <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Evalify AI</h1>
          <p className="text-on-surface-variant font-medium text-sm">Empowering the Academic Edge</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container-lowest p-10 rounded-xl atmospheric-shadow">
          <div className="mb-8 font-headline">
            <h2 className="text-xl font-bold text-on-surface mb-1">Welcome back</h2>
            <p className="text-on-surface-variant text-sm">Please enter your faculty credentials.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="space-y-2">
              <label 
                className="block text-xs font-semibold text-on-surface uppercase tracking-wider" 
                htmlFor="email"
              >
                Institutional Email
              </label>
              <div className="relative">
                <input 
                  className="w-full px-4 py-3 bg-surface-container-highest border-none rounded-lg focus:ring-2 focus:ring-primary/40 text-on-surface placeholder:text-outline text-sm transition-all" 
                  id="email" 
                  placeholder="professor@university.edu" 
                  type="email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label 
                  className="block text-xs font-semibold text-on-surface uppercase tracking-wider" 
                  htmlFor="password"
                >
                  Password
                </label>
                <a className="text-xs font-semibold text-primary hover:text-primary-container transition-colors" href="#">
                  Forgot Access?
                </a>
              </div>
              <div className="relative">
                <input 
                  className="w-full px-4 py-3 bg-surface-container-highest border-none rounded-lg focus:ring-2 focus:ring-primary/40 text-on-surface placeholder:text-outline text-sm transition-all" 
                  id="password" 
                  placeholder="••••••••" 
                  type="password"
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input 
                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-0 bg-surface-container-highest" 
                id="remember" 
                type="checkbox"
              />
              <label className="ml-2 text-sm text-on-surface-variant" htmlFor="remember">
                Keep me authenticated
              </label>
            </div>

            {/* Login Button */}
            <button 
              className="w-full py-3.5 bg-primary hover:bg-primary-container text-on-primary font-bold rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-primary/20" 
              type="submit"
            >
              <span>Login</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </form>

          {/* SSO Options */}
          <div className="mt-8 pt-8 border-t border-outline-variant/10">
            <p className="text-center text-[10px] font-bold text-outline uppercase tracking-widest mb-6"> Or authenticate via </p>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleLogin}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-surface-container-low hover:bg-surface-container-high rounded-lg text-sm font-medium text-on-surface transition-colors"
              >
                <img 
                  alt="Google Logo" 
                  className="w-4 h-4" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoX_E2SYF1Di32FCTXN2EwUkjnCiQ5Msaz3kyjtKWzI12gSGY77zuJxMdQ7UBM9gTPSV3H9whR8FoXtJBPtvtwCOtaSI-iifXV1LI7qbfBSOX2wG9axEZBaQoIxEXeVIy6qGJA5fcPguabByUuwGs0-SsOkgFQMXLDSAcQV4HhOIOq5DxBdj2uNvBKOYKQa4FPY4emc46kf5kE27nYhK2NWACLRP4t6aBFoZWo4nm5N991-b4Prf3W-vQXniOL2iJqwOyMP2mtFSlZ"
                />
                <span>SSO</span>
              </button>
              <button 
                onClick={handleLogin}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-surface-container-low hover:bg-surface-container-high rounded-lg text-sm font-medium text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-lg">account_balance</span>
                <span>LMS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Help */}
        <div className="mt-8 text-center">
          <p className="text-xs sm:text-sm text-on-surface-variant">
            New to Evalify? <a className="text-primary font-bold hover:underline decoration-2 underline-offset-4" href="#">Request Faculty Access</a>
          </p>
        </div>
      </main>

      {/* Decorative Corner Element */}
      <div className="fixed bottom-0 right-0 p-12 opacity-10 pointer-events-none hidden lg:block">
        <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'wght' 100" }}>
          school
        </span>
      </div>
    </div>
  );
};

export default Login;
