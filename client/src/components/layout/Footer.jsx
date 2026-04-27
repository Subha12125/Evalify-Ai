import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-8 px-8 border-t border-outline-variant/10 bg-white/50 backdrop-blur-md">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">auto_awesome</span>
          </div>
          <span className="font-headline font-black text-on-surface tracking-tight">Evalify AI</span>
        </div>
        
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-outline">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Help Center</a>
          <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
        </div>
        
        <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest">
          © {currentYear} Evalify AI. All Academic Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
