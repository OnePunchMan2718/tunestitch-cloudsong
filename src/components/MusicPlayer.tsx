
import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Repeat, 
  Shuffle,
  Heart,
  BarChart // replacing Waveform with BarChart which is available in lucide-react
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Toggle } from '@/components/ui/toggle';
import Waveform from './Waveform';
import { motion, AnimatePresence } from 'framer-motion';
import { extractDominantColor, generateColorPalette } from '@/utils/colorExtractor';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isLiked, setIsLiked] = useState(false);
  const [showWaveform, setShowWaveform] = useState(false);
  const [dominantColor, setDominantColor] = useState('#8B5CF6'); // Default music-primary color
  const [colorPalette, setColorPalette] = useState({
    primary: '#8B5CF6',
    secondary: '#7E69AB',
    accent: '#E4DDFF',
    text: '#F6F6F7',
    background: '#1A1F2C',
    isLight: false
  });
  
  // Mock song data
  const currentSong = {
    title: "Dreams of Tomorrow",
    artist: "CloudSound",
    coverUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
  };
  
  // Extract colors when the song changes
  useEffect(() => {
    if (currentSong.coverUrl) {
      const extractColors = async () => {
        try {
          // Show animation by resetting color first
          setDominantColor('#8B5CF6');
          
          // Extract the dominant color
          const extractedColor = await extractDominantColor(currentSong.coverUrl);
          setDominantColor(extractedColor);
          
          // Generate a palette from the dominant color
          const palette = generateColorPalette(extractedColor);
          setColorPalette(palette);
        } catch (error) {
          console.error('Failed to extract colors:', error);
          // Fallback to default color
          setDominantColor('#8B5CF6');
        }
      };
      
      extractColors();
    }
  }, [currentSong.coverUrl]);
  
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
  
  // Dynamic CSS variables for colors based on extracted palette
  const dynamicColorStyle = {
    "--dynamic-primary": colorPalette.primary,
    "--dynamic-secondary": colorPalette.secondary,
    "--dynamic-accent": colorPalette.accent,
    "--dynamic-text": colorPalette.text,
    "--dynamic-background": colorPalette.background,
  } as React.CSSProperties;
  
  return (
    <motion.div 
      className="audio-player"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={dynamicColorStyle}
    >
      {/* Track progress */}
      <div className="w-full h-1 bg-music-secondary/30 mb-4">
        <motion.div 
          className="h-full"
          style={{ 
            background: dominantColor,
            width: `${(currentTime / duration) * 100}%` 
          }}
          initial={{ width: 0 }}
          animate={{ width: `${(currentTime / duration) * 100}%` }}
          transition={{ duration: 0.1 }}
        ></motion.div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {/* Song info with fade-in animation */}
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img 
            src={currentSong.coverUrl} 
            alt={currentSong.title}
            className="h-12 w-12 rounded-md object-cover"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="overflow-hidden">
            <h4 className="font-medium text-sm truncate">{currentSong.title}</h4>
            <p className="text-xs text-music-muted truncate">{currentSong.artist}</p>
          </div>
        </motion.div>
        
        {/* Player controls */}
        <div className="flex items-center justify-center gap-3">
          <Button variant="ghost" size="icon" className="text-music-muted hover:text-music-text">
            <SkipBack size={18} />
          </Button>
          
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full hover:bg-music-primary/90"
              onClick={togglePlayback}
              style={{ 
                background: dominantColor,
                color: colorPalette.isLight ? '#1A1F2C' : '#F6F6F7'
              }}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </Button>
          </motion.div>
          
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
            style={{ color: isLiked ? dominantColor : undefined }}
          >
            <Heart size={18} />
          </Toggle>
          
          <Toggle
            aria-label="Toggle waveform" 
            className="text-music-muted data-[state=on]:text-music-primary"
            pressed={showWaveform}
            onPressedChange={setShowWaveform}
            style={{ color: showWaveform ? dominantColor : undefined }}
          >
            <BarChart size={18} />
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
      
      {/* Optional Waveform component with animation */}
      <AnimatePresence>
        {showWaveform && (
          <motion.div 
            className="mt-3 hidden sm:block"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Waveform 
              isPlaying={isPlaying} 
              progress={currentTime / duration} 
              dominantColor={dominantColor}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MusicPlayer;
