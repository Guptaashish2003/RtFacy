import { useState } from 'react';
import { Camera, Mic, MicOff, VideoOff, Sparkles, X } from 'lucide-react';
import CameraView from '../components/CameraView';
import { API_URL } from '../config';

const Vista = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const apiUrl =  API_URL || 
    (window.location.hostname === 'localhost' ? 'http://localhost:8000' : window.location.origin.replace('5173', '8000'));
  const [overlayError, setOverlayError] = useState(false);

  const handleLaunch = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      {isActive && (
        <div className="fixed inset-0 z-50 bg-[#0E0C15]/95 backdrop-blur-sm flex items-center justify-center">
          <div className="relative w-full max-w-6xl aspect-[3/4] md:aspect-video rounded-3xl overflow-hidden border-2 border-[#ac6aff]/50 shadow-2xl shadow-[#ac6aff]/20">
            
            {/* 1. Live Camera Feed (Draws bounding boxes locally) */}
            <CameraView />

            {/* Overlay UI */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top Bar */}
              <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/60 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 bg-[#1A1825]/80 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10 pointer-events-auto">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm font-medium text-white">
                        AI Vision Active
                    </span>
                  </div>

                  <button
                    onClick={handleLaunch}
                    className="w-10 h-10 rounded-full bg-[#1A1825]/80 backdrop-blur-xl border border-white/10 hover:border-white/30 flex items-center justify-center transition-all hover:scale-110 pointer-events-auto"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Bottom Area */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="max-w-4xl mx-auto space-y-4">
                  <div className="bg-[#1A1825]/90 backdrop-blur-xl border border-[#ac6aff]/30 rounded-2xl p-4 pointer-events-auto">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ac6aff] to-[#00d4ff] flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-white animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white mb-1">AI Vision Assistant</p>
                        <p className="text-sm text-white/70">
                          Processing video stream...
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <Mic className="w-4 h-4 text-[#00ff88]" />
                    {/* Audio visualizer bars... */}
                    <div className="flex gap-1">
                        {[0, 0.1, 0.2, 0.3, 0.4].map((delay) => (
                            <div key={delay} className="w-1 h-4 bg-[#00ff88] rounded-full animate-pulse" style={{ animationDelay: `${delay}s` }} />
                        ))}
                    </div>
                    <span className="text-xs text-white/50">Listening...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            <button className="w-14 h-14 rounded-full bg-[#1A1825]/80 backdrop-blur-xl border border-white/10 hover:border-white/30 flex items-center justify-center transition-all hover:scale-110 group">
              <MicOff className="w-6 h-6 text-white/60 group-hover:text-white" />
            </button>
            <button className="w-14 h-14 rounded-full bg-[#1A1825]/80 backdrop-blur-xl border border-white/10 hover:border-white/30 flex items-center justify-center transition-all hover:scale-110 group">
              <VideoOff className="w-6 h-6 text-white/60 group-hover:text-white" />
            </button>
            <button 
              onClick={handleLaunch}
              className="px-8 h-14 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 flex items-center justify-center transition-all hover:scale-105 shadow-lg shadow-red-500/30"
            >
              <span className="text-sm font-semibold text-white">End Session</span>
            </button>
          </div>
        </div>
      )}

      {!isActive && (
        <div className="relative">
          <div 
            className={`absolute inset-0 rounded-full bg-gradient-to-r from-[#ac6aff] via-[#00d4ff] to-[#00ff88] blur-3xl transition-opacity duration-500 ${
              isHovering ? 'opacity-30' : 'opacity-0'
            }`}
          />
          <button
            onClick={handleLaunch}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="relative group"
          >
            <div className="relative flex flex-col items-center gap-6 px-12 py-10 rounded-3xl transition-all duration-500 bg-[#1A1825]/60 backdrop-blur-xl border border-white/10 hover:border-white/30">
              <div className="relative">
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 bg-gradient-to-br from-[#ac6aff]/80 to-[#5e00ff]/80 group-hover:scale-110">
                  <Camera className="w-12 h-12 text-white transition-transform group-hover:scale-110" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2 justify-center">
                  Launch AI Vision
                </h3>
              </div>
            </div>
          </button>
        </div>
      )}
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Vista;