import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-background text-on-surface flex min-h-screen relative overflow-x-hidden">
      {/* Sidebar - responsive behavior */}
      <div className={`fixed inset-0 z-50 bg-black/50 transition-opacity lg:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)}></div>
      
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <main className="lg:ml-64 flex-1 min-h-screen relative transition-all duration-300">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <div className="pt-24 px-4 sm:px-8 pb-12 w-full overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
