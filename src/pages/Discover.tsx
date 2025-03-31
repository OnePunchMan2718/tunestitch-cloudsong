
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import TrackCard, { Track } from '@/components/TrackCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter } from 'lucide-react';

// Generate some mock tracks with variety
const generateMockTracks = (count: number): Track[] => {
  const genres = ['Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 'Ambient'];
  const artists = ['Melodic Dreams', 'Synthwave Collective', 'Ambient Moods', 'Electronic Vibes', 'Nature Sounds'];
  const imageUrls = [
    'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
  ];
  
  return Array.from({ length: count }, (_, index) => ({
    id: (index + 10).toString(),
    title: `${genres[Math.floor(Math.random() * genres.length)]} Track ${index + 1}`,
    artist: artists[Math.floor(Math.random() * artists.length)],
    coverUrl: Math.random() > 0.3 ? imageUrls[Math.floor(Math.random() * imageUrls.length)] : undefined,
    duration: Math.floor(Math.random() * 180) + 120, // 2-5 minutes
    plays: Math.floor(Math.random() * 1000000),
    isLiked: Math.random() > 0.7
  }));
};

const DiscoverPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock tracks data
  const allTracks = generateMockTracks(20);
  const trendingTracks = allTracks.slice(0, 12).sort((a, b) => b.plays - a.plays);
  const newTracks = allTracks.slice(8, 16);
  const forYouTracks = allTracks.slice(4, 20);
  
  // Filter tracks based on search query
  const filterTracks = (tracks: Track[]) => {
    if (!searchQuery) return tracks;
    
    return tracks.filter(track => 
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-6">Discover</h1>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-music-muted" size={20} />
          <Input
            placeholder="Search tracks, artists..."
            className="pl-10 bg-music-card border-music-primary/10 focus-visible:ring-music-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="trending" className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-music-card">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="for-you">For You</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm" className="gap-2 border-music-primary/20">
            <Filter size={16} />
            <span>Filters</span>
          </Button>
        </div>
        
        <TabsContent value="trending" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filterTracks(trendingTracks).map(track => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
          
          {filterTracks(trendingTracks).length === 0 && (
            <div className="text-center py-10 text-music-muted">
              <p>No tracks found. Try a different search.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="new" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filterTracks(newTracks).map(track => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
          
          {filterTracks(newTracks).length === 0 && (
            <div className="text-center py-10 text-music-muted">
              <p>No tracks found. Try a different search.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="for-you" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filterTracks(forYouTracks).map(track => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
          
          {filterTracks(forYouTracks).length === 0 && (
            <div className="text-center py-10 text-music-muted">
              <p>No tracks found. Try a different search.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default DiscoverPage;
