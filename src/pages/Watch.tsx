
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface VideoData {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  thumbnail: string;
}

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mock video data
  const [videoData] = useState<VideoData>({
    id: id || '1',
    title: 'Në Kërkim të Dashurisë',
    description: 'Një histori romantike e vendosur në qytetin e bukur të Gjirokastës.',
    duration: 8100, // 2h 15min in seconds
    thumbnail: 'https://images.unsplash.com/photo-1489599388350-e3f95e2d26b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 1, videoData.duration));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, videoData.duration]);

  useEffect(() => {
    let hideTimer: NodeJS.Timeout;
    if (showControls) {
      hideTimer = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    }
    return () => clearTimeout(hideTimer);
  }, [showControls, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
    setShowControls(true);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(value[0] === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setShowControls(true);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const skipTime = (seconds: number) => {
    setCurrentTime(prev => Math.max(0, Math.min(prev + seconds, videoData.duration)));
    setShowControls(true);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / videoData.duration) * 100;

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Video Container */}
      <div 
        className="relative w-full h-full cursor-pointer"
        onClick={() => setShowControls(!showControls)}
        onMouseMove={() => setShowControls(true)}
      >
        {/* Video Placeholder */}
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
          <img
            src={videoData.thumbnail}
            alt={videoData.title}
            className="w-full h-full object-cover"
          />
          
          {/* Play Button Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <Play className="w-8 h-8 text-white ml-1" />
              </button>
            </div>
          )}
        </div>

        {/* Controls Overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="text-white hover:text-red-400 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-white text-xl font-bold">{videoData.title}</h1>
                <p className="text-gray-300 text-sm">{videoData.description}</p>
              </div>
            </div>
          </div>

          {/* Center Controls */}
          <div className="absolute inset-0 flex items-center justify-center space-x-8">
            <button
              onClick={() => skipTime(-10)}
              className="text-white hover:text-red-400 transition-colors"
            >
              <SkipBack className="w-8 h-8" />
            </button>
            
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </button>
            
            <button
              onClick={() => skipTime(10)}
              className="text-white hover:text-red-400 transition-colors"
            >
              <SkipForward className="w-8 h-8" />
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {/* Progress Bar */}
            <div className="mb-4">
              <Slider
                value={[currentTime]}
                max={videoData.duration}
                step={1}
                onValueChange={handleSeek}
                className="w-full"
              />
              <div className="flex items-center justify-between text-white text-sm mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(videoData.duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-red-400 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-red-400 transition-colors"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                  
                  <div className="w-24">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={100}
                      step={1}
                      onValueChange={handleVolumeChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-white text-sm">
                <span>HD</span>
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-red-400 transition-colors"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
