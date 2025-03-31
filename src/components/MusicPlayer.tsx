
import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Repeat, 
  Shuffle,
  Heart 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Toggle } from '@/components/ui/toggle';
import Waveform from './Waveform';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isLiked, setIsLiked] = useState(false);
  
  // Mock song data
  const currentSong = {
    title: "Dreams of Tomorrow",
    artist: "CloudSound",
    coverUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
  };
  
  // Toggle play/pause
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Handle seeking in the track
  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };
  
  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };
  
  // Format time for display
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Mock effect to simulate song progress when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTime, duration]);
  
  // Set mock duration when component mounts
  useEffect(() => {
    setDuration(180); // 3 minutes in seconds
  }, []);
  
  return (
    <div className="audio-player">
      {/* Track progress */}
      <div className="w-full h-1 bg-music-secondary/30 mb-4">
        <div 
          className="h-full bg-music-primary"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        ></div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {/* Song info */}
        <div className="flex items-center gap-3">
          <img 
            src={currentSong.coverUrl} 
            alt={currentSong.title}
            className="h-12 w-12 rounded-md object-cover"
          />
          <div className="overflow-hidden">
            <h4 className="font-medium text-sm truncate">{currentSong.title}</h4>
            <p className="text-xs text-music-muted truncate">{currentSong.artist}</p>
          </div>
        </div>
        
        {/* Player controls */}
        <div className="flex items-center justify-center gap-3">
          <Button variant="ghost" size="icon" className="text-music-muted hover:text-music-text">
            <SkipBack size={18} />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-music-primary text-white hover:bg-music-primary/90"
            onClick={togglePlayback}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </Button>
          
          <Button variant="ghost" size="icon" className="text-music-muted hover:text-music-text">
            <SkipForward size={18} />
          </Button>
        </div>
        
        {/* Volume and additional controls */}
        <div className="flex items-center justify-end gap-3">
          <span className="text-xs text-music-muted">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          
          <Toggle 
            aria-label="Like song" 
            className="text-music-muted data-[state=on]:text-music-primary"
            pressed={isLiked}
            onPressedChange={setIsLiked}
          >
            <Heart size={18} />
          </Toggle>
          
          <div className="hidden sm:flex items-center gap-2">
            <Volume2 size={18} className="text-music-muted" />
            <Slider
              value={[volume]} 
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-20"
            />
          </div>
        </div>
      </div>
      
      {/* Waveform component */}
      <div className="mt-3 hidden sm:block">
        <Waveform isPlaying={isPlaying} progress={currentTime / duration} />
      </div>
    </div>
  );
};

export default MusicPlayer;
