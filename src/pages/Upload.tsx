
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Music, 
  Upload as UploadIcon, 
  Image, 
  File, 
  AudioWaveform 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const UploadPage = () => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [trackTitle, setTrackTitle] = useState('');
  const [trackDescription, setTrackDescription] = useState('');
  
  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  // Handle the file
  const handleFile = (file: File) => {
    const validAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/mp3'];
    const validUstTypes = ['application/octet-stream', 'text/plain']; // .ust files
    const validSvpTypes = ['application/octet-stream', 'application/xml']; // .svp files
    
    // Check file type
    if (validAudioTypes.includes(file.type) || 
        file.name.endsWith('.ust') || file.name.endsWith('.svp') ||
        validUstTypes.includes(file.type) || validSvpTypes.includes(file.type)) {
      setUploadedFile(file);
      toast({
        title: "File uploaded",
        description: `Successfully uploaded ${file.name}`,
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an audio file (MP3, WAV) or a project file (UST, SVP)",
        variant: "destructive"
      });
    }
  };
  
  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      
      if (validImageTypes.includes(file.type)) {
        setUploadedImage(file);
      } else {
        toast({
          title: "Invalid image type",
          description: "Please upload a JPEG, PNG or GIF image",
          variant: "destructive"
        });
      }
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadedFile) {
      toast({
        title: "Missing file",
        description: "Please upload an audio or project file",
        variant: "destructive"
      });
      return;
    }
    
    if (!trackTitle.trim()) {
      toast({
        title: "Missing title",
        description: "Please add a title for your track",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would send the file to the server
    toast({
      title: "Upload successful!",
      description: `${trackTitle} has been uploaded`,
    });
    
    // Reset form
    setUploadedFile(null);
    setUploadedImage(null);
    setTrackTitle('');
    setTrackDescription('');
  };
  
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Upload Your Music</h1>
      
      <Tabs defaultValue="music" className="mb-10">
        <TabsList className="bg-music-card mb-6">
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="utau">UTAU Project</TabsTrigger>
          <TabsTrigger value="synthv">SynthV Project</TabsTrigger>
        </TabsList>
        
        <TabsContent value="music" className="mt-0">
          <form onSubmit={handleSubmit} className="max-w-3xl">
            <div 
              className={`p-10 mb-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
                dragActive 
                  ? 'border-music-primary bg-music-primary/10' 
                  : 'border-music-primary/30 hover:border-music-primary/70'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".mp3,.wav"
                onChange={handleFileChange}
              />
              
              {uploadedFile ? (
                <div className="text-center">
                  <AudioWaveform size={48} className="mx-auto mb-4 text-music-primary" />
                  <p className="font-medium mb-1">{uploadedFile.name}</p>
                  <p className="text-sm text-music-muted">
                    {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <Button
                    variant="link"
                    className="text-music-primary mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedFile(null);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <>
                  <Music size={48} className="mb-4 text-music-primary" />
                  <h3 className="text-xl font-medium mb-2">Drag & drop or click to upload</h3>
                  <p className="text-sm text-music-muted text-center max-w-md">
                    Upload MP3 or WAV files up to 50MB
                  </p>
                </>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="title">Track Title</Label>
                <Input
                  id="title"
                  placeholder="Enter track title"
                  className="bg-music-card border-music-primary/10"
                  value={trackTitle}
                  onChange={(e) => setTrackTitle(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="cover-image">Cover Image</Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2 border-music-primary/20"
                    onClick={() => document.getElementById('cover-upload')?.click()}
                  >
                    <Image size={16} />
                    <span>Choose Image</span>
                  </Button>
                  <input
                    id="cover-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {uploadedImage && (
                    <span className="text-sm text-music-muted">{uploadedImage.name}</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell us about your track..."
                className="bg-music-card border-music-primary/10 min-h-[100px]"
                value={trackDescription}
                onChange={(e) => setTrackDescription(e.target.value)}
              />
            </div>
            
            <Button 
              type="submit" 
              className="bg-music-primary hover:bg-music-primary/90 gap-2"
            >
              <UploadIcon size={16} />
              <span>Upload Track</span>
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="utau" className="mt-0">
          <form onSubmit={handleSubmit} className="max-w-3xl">
            <div 
              className={`p-10 mb-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
                dragActive 
                  ? 'border-music-primary bg-music-primary/10' 
                  : 'border-music-primary/30 hover:border-music-primary/70'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('utau-upload')?.click()}
            >
              <input
                id="utau-upload"
                type="file"
                className="hidden"
                accept=".ust"
                onChange={handleFileChange}
              />
              
              {uploadedFile ? (
                <div className="text-center">
                  <File size={48} className="mx-auto mb-4 text-music-primary" />
                  <p className="font-medium mb-1">{uploadedFile.name}</p>
                  <p className="text-sm text-music-muted">
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </p>
                  <Button
                    variant="link"
                    className="text-music-primary mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedFile(null);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <>
                  <File size={48} className="mb-4 text-music-primary" />
                  <h3 className="text-xl font-medium mb-2">Upload UTAU Project File</h3>
                  <p className="text-sm text-music-muted text-center max-w-md">
                    Share .ust files for collaboration
                  </p>
                </>
              )}
            </div>
            
            {/* Form fields similar to music tab */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="title-utau">Project Title</Label>
                <Input
                  id="title-utau"
                  placeholder="Enter project title"
                  className="bg-music-card border-music-primary/10"
                  value={trackTitle}
                  onChange={(e) => setTrackTitle(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="cover-image-utau">Cover Image</Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2 border-music-primary/20"
                    onClick={() => document.getElementById('cover-upload-utau')?.click()}
                  >
                    <Image size={16} />
                    <span>Choose Image</span>
                  </Button>
                  <input
                    id="cover-upload-utau"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {uploadedImage && (
                    <span className="text-sm text-music-muted">{uploadedImage.name}</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <Label htmlFor="description-utau">Description</Label>
              <Textarea
                id="description-utau"
                placeholder="Tell us about your UTAU project..."
                className="bg-music-card border-music-primary/10 min-h-[100px]"
                value={trackDescription}
                onChange={(e) => setTrackDescription(e.target.value)}
              />
            </div>
            
            <Button 
              type="submit" 
              className="bg-music-primary hover:bg-music-primary/90 gap-2"
            >
              <UploadIcon size={16} />
              <span>Upload UTAU Project</span>
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="synthv" className="mt-0">
          <form onSubmit={handleSubmit} className="max-w-3xl">
            <div 
              className={`p-10 mb-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
                dragActive 
                  ? 'border-music-primary bg-music-primary/10' 
                  : 'border-music-primary/30 hover:border-music-primary/70'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('synthv-upload')?.click()}
            >
              <input
                id="synthv-upload"
                type="file"
                className="hidden"
                accept=".svp"
                onChange={handleFileChange}
              />
              
              {uploadedFile ? (
                <div className="text-center">
                  <File size={48} className="mx-auto mb-4 text-music-primary" />
                  <p className="font-medium mb-1">{uploadedFile.name}</p>
                  <p className="text-sm text-music-muted">
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </p>
                  <Button
                    variant="link"
                    className="text-music-primary mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedFile(null);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <>
                  <File size={48} className="mb-4 text-music-primary" />
                  <h3 className="text-xl font-medium mb-2">Upload SynthV Project File</h3>
                  <p className="text-sm text-music-muted text-center max-w-md">
                    Share .svp files for collaboration
                  </p>
                </>
              )}
            </div>
            
            {/* Form fields similar to other tabs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="title-synthv">Project Title</Label>
                <Input
                  id="title-synthv"
                  placeholder="Enter project title"
                  className="bg-music-card border-music-primary/10"
                  value={trackTitle}
                  onChange={(e) => setTrackTitle(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="cover-image-synthv">Cover Image</Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2 border-music-primary/20"
                    onClick={() => document.getElementById('cover-upload-synthv')?.click()}
                  >
                    <Image size={16} />
                    <span>Choose Image</span>
                  </Button>
                  <input
                    id="cover-upload-synthv"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {uploadedImage && (
                    <span className="text-sm text-music-muted">{uploadedImage.name}</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <Label htmlFor="description-synthv">Description</Label>
              <Textarea
                id="description-synthv"
                placeholder="Tell us about your SynthV project..."
                className="bg-music-card border-music-primary/10 min-h-[100px]"
                value={trackDescription}
                onChange={(e) => setTrackDescription(e.target.value)}
              />
            </div>
            
            <Button 
              type="submit" 
              className="bg-music-primary hover:bg-music-primary/90 gap-2"
            >
              <UploadIcon size={16} />
              <span>Upload SynthV Project</span>
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default UploadPage;
