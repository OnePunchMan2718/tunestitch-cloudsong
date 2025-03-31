
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MusicPlayer from './MusicPlayer';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-music-background text-music-text">
      {/* Sidebar with hover functionality */}
      <div 
        className="fixed top-0 bottom-0 left-0 z-20"
        onMouseEnter={() => setSidebarVisible(true)}
        onMouseLeave={() => setSidebarVisible(false)}
      >
        <div className={`h-full transition-all duration-300 ease-in-out ${sidebarVisible ? 'w-64' : 'w-2'}`}>
          {sidebarVisible && (
            <Sidebar currentPath={location.pathname} />
          )}
        </div>
      </div>
      
      <main className="flex-1 p-4 md:p-6 pb-28">
        {children}
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Layout;
