
import React from 'react';
import { cn } from '@/lib/utils';

interface WaveformProps {
  isPlaying: boolean;
  progress: number;
}

const Waveform: React.FC<WaveformProps> = ({ isPlaying, progress }) => {
  // Create an array of random heights for the waveform bars
  const numBars = 80;
  const bars = Array.from({ length: numBars }, () => 
    Math.random() * 0.8 + 0.2
  );
  
  return (
    <div className="waveform-container">
      {bars.map((height, index) => {
        const isPlayed = index / numBars <= progress;
        
        return (
          <div
            key={index}
            className={cn(
              "waveform-bar",
              isPlaying && "animate-waveform-bar",
              isPlayed ? "bg-music-primary" : "bg-music-muted/40"
            )}
            style={{ 
              height: `${height * 100}%`,
              width: `${100 / numBars}%`,
              maxWidth: '4px',
              '--bar-index': index
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
};

export default Waveform;
