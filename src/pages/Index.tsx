
import React from 'react';
import Layout from '@/components/Layout';
import TrackCard, { Track } from '@/components/TrackCard';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Mock featured tracks
  const featuredTracks: Track[] = [
    {
      id: '1',
      title: 'Summer Breeze',
      artist: 'Melodic Dreams',
      coverUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
      duration: 187,
      plays: 1542876,
      isLiked: true
    },
    {
      id: '2',
      title: 'Night Drive',
      artist: 'Synthwave Collective',
      coverUrl: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
      duration: 210,
      plays: 982340,
      isLiked: false
    },
    {
      id: '3',
      title: 'Rainy Days',
      artist: 'Ambient Moods',
      coverUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
      duration: 164,
      plays: 452803,
      isLiked: false
    },
    {
      id: '4',
      title: 'Digital Dreams',
      artist: 'Electronic Vibes',
      duration: 195,
      plays: 328945,
      isLiked: true
    }
  ];
  
  // Mock recent tracks
  const recentTracks: Track[] = [
    {
      id: '5',
      title: 'Mountain Echo',
      artist: 'Nature Sounds',
      coverUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
      duration: 230,
      plays: 78420,
      isLiked: false
    },
    {
      id: '6',
      title: 'Urban Jungle',
      artist: 'City Beats',
      duration: 178,
      plays: 42380,
      isLiked: true
    },
    {
      id: '7',
      title: 'Ocean Waves',
      artist: 'Relaxation Masters',
      coverUrl: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
      duration: 204,
      plays: 98234,
      isLiked: false
    },
    {
      id: '8',
      title: 'Starlight',
      artist: 'Cosmic Dreams',
      coverUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
      duration: 190,
      plays: 124567,
      isLiked: true
    }
  ];
  
  return (
    <Layout>
      <section className="mb-10">
        <div className="relative rounded-2xl overflow-hidden h-80 mb-8">
          <img 
            src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
            alt="Welcome to CloudSong"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-music-background/90 to-music-background/50 flex flex-col justify-center px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover & Share</h1>
            <p className="text-xl md:text-2xl text-music-muted mb-6 max-w-md">
              Upload, stream, and collaborate on music and vocal synthesis projects.
            </p>
            <div className="flex gap-4">
              <Button className="bg-music-primary hover:bg-music-primary/90">
                Start Listening
              </Button>
              <Button variant="outline" className="border-music-primary text-music-primary">
                Upload Music
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Featured Tracks</h2>
            <Button variant="link" className="text-music-primary">
              See all
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredTracks.map(track => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recently Played</h2>
            <Button variant="link" className="text-music-primary">
              See all
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentTracks.map(track => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
