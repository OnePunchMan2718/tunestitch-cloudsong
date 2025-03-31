
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Search, 
  ListMusic, 
  Upload, 
  User, 
  Heart,
  Music,
  LogIn
} from 'lucide-react';

interface SidebarProps {
  currentPath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
  const navLinks = [
    { name: 'Home', icon: <Home size={20} />, path: '/' },
    { name: 'Discover', icon: <Search size={20} />, path: '/discover' },
    { name: 'Your Library', icon: <ListMusic size={20} />, path: '/library' },
    { name: 'Liked Songs', icon: <Heart size={20} />, path: '/liked' },
    { name: 'Upload', icon: <Upload size={20} />, path: '/upload' },
    { name: 'Profile', icon: <User size={20} />, path: '/profile' },
  ];

  return (
    <div className="w-full md:w-64 md:fixed md:inset-y-0 bg-music-card/90 border-r border-music-primary/10 flex flex-col z-10">
      <div className="p-5 flex items-center gap-2">
        <Music className="h-8 w-8 text-music-primary" />
        <h1 className="text-2xl font-bold text-music-primary">CloudSong</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={cn(
                  "sidebar-link",
                  currentPath === link.path && "active"
                )}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-music-primary/10">
        <Link to="/login" className="sidebar-link">
          <LogIn size={20} />
          <span>Login / Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
