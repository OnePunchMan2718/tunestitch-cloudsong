
import React from 'react';
import { Heart, Play, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface Track {
  id: string;
  title: string;
  artist: string;
  coverUrl?: string;
  duration: number;
  plays: number;
  isLiked?: boolean;
}

interface TrackCardProps {
  track: Track;
  onClick?: () => void;
  className?: string;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, onClick, className }) => {
  // Format time for display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Format play count
  const formatPlays = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };
  
  return (
    <motion.div 
      className={cn("track-card", className)}
      onClick={onClick}
      whileHover={{ 
        scale: 1.03, 
        boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)" 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      <div className="relative">
        {track.coverUrl ? (
          <img 
            src={track.coverUrl} 
            alt={track.title}
            className="track-card-image"
          />
        ) : (
          <div className="track-card-image bg-music-card flex items-center justify-center">
            <Music size={48} className="text-music-primary opacity-40" />
          </div>
        )}
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="rounded-full p-3 bg-music-primary/80 hover:bg-music-primary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={24} className="text-white" />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold truncate">{track.title}</h3>
        <p className="text-sm text-music-muted">{track.artist}</p>
        
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-music-muted">
            {formatPlays(track.plays)} plays • {formatTime(track.duration)}
          </span>
          
          <motion.div whileTap={{ scale: 0.9 }}>
            <Heart 
              size={16} 
              className={cn(
                "cursor-pointer transition-colors",
                track.isLiked ? "text-music-primary fill-music-primary" : "text-music-muted"
              )}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrackCard;
