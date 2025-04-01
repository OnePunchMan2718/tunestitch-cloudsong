
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MusicPlayer from './MusicPlayer';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-music-background text-music-text">
      {/* Sidebar with improved animation */}
      <motion.div 
        className="fixed top-0 bottom-0 left-0 z-20"
        onMouseEnter={() => setSidebarVisible(true)}
        onMouseLeave={() => setSidebarVisible(false)}
      >
        <motion.div 
          className="h-full bg-music-card/90"
          animate={{
            width: sidebarVisible ? '16rem' : '0.5rem',
            opacity: sidebarVisible ? 1 : 0.7,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <AnimatePresence>
            {sidebarVisible && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Sidebar currentPath={location.pathname} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      
      <main className="flex-1 p-4 md:p-6 pb-28">
        {children}
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Layout;
