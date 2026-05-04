import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 sm:py-8 px-4 sm:px-8 border-t border-outline-variant/10 bg-white/50 backdrop-blur-md">
      <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">auto_awesome</span>
          </div>
          <span className="font-headline font-black text-on-surface tracking-tight">Evalify AI</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[10px] font-bold uppercase tracking-widest text-outline">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Help Center</a>
          <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
        </div>
        
        <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest text-center">
          © {currentYear} Evalify AI. All Academic Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
