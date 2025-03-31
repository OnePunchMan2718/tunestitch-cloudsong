
import React from 'react';
import Sidebar from './Sidebar';
import MusicPlayer from './MusicPlayer';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-music-background text-music-text">
      <Sidebar currentPath={location.pathname} />
      <main className="flex-1 p-4 md:p-6 pb-28 md:ml-64">
        {children}
      </main>
      <MusicPlayer />
    </div>
  );
};

export default Layout;
