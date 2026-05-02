import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Activity, Database, Server, Video } from 'lucide-react';

interface ROI {
  x_min: number;
  y_min: number;
  width: number;
  height: number;
  timestamp: string;
}

function App() {
  const [rois, setRois] = useState<ROI[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    // Fetch ROI data periodically
    const fetchROI = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/roi`);
        if (response.ok) {
          const data = await response.json();
          setRois(data);
        }
      } catch (error) {
        console.error('Failed to fetch ROI data:', error);
      }
    };

    const intervalId = setInterval(fetchROI, 1000);
    return () => clearInterval(intervalId);
  }, [apiUrl]);

  const handleStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for metadata to be loaded so we have video dimensions
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().then(() => {
            setHasStarted(true);
            setIsStreaming(true);
          }).catch(e => console.error("Video play failed:", e));
        };
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Could not access camera. Please ensure permissions are granted and you are using HTTPS or localhost.');
    }
  };

  useEffect(() => {
    if (hasStarted && isStreaming) {
      // Send frames to backend every 100ms (~10 FPS)
      streamIntervalRef.current = setInterval(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        
        if (video && canvas && video.readyState >= 2) { // HAVE_CURRENT_DATA
          const context = canvas.getContext('2d');

          if (context && video.videoWidth > 0) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(async (blob) => {
              if (blob) {
                const formData = new FormData();
                formData.append('file', blob, 'frame.jpg');

                try {
                  const response = await fetch(`${apiUrl}/api/video/frame`, {
                    method: 'POST',
                    body: formData,
                  });
                  if (!response.ok) {
                    console.warn('Backend rejected frame', response.status);
                  }
                } catch (e) {
                  console.error('Network error sending frame', e);
                }
              }
            }, 'image/jpeg', 0.7);
          }
        }
      }, 100);
    }

    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, [hasStarted, isStreaming, apiUrl]);

  // Cleanup camera tracks on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 p-6 md:p-12 font-sans selection:bg-blue-500/30">
      <header className="mb-10 flex items-center gap-4">
        <div className="p-3 bg-blue-500/10 rounded-2xl ring-1 ring-blue-500/30">
          <Activity className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Vista Vision
          </h1>
          <p className="text-neutral-400 text-sm mt-1">Real-Time Face Detection & Tracking</p>
        </div>
      </header>

      {/* Hidden elements for capturing frames */}
      <video ref={videoRef} className="hidden" muted playsInline />
      <canvas ref={canvasRef} className="hidden" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-neutral-900 border-neutral-800 overflow-hidden shadow-2xl">
            <CardHeader className="border-b border-neutral-800 bg-neutral-900/50 flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-neutral-200">
                <Camera className="w-5 h-5 text-blue-400" />
                Processed Stream (From Backend)
              </CardTitle>
              {isStreaming && (
                 <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400">
                   <Video className="w-3 h-3" /> Camera Active
                 </div>
              )}
            </CardHeader>
            <CardContent className="p-0 relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              {!hasStarted ? (
                <div className="flex flex-col items-center justify-center gap-6 text-center p-12">
                  <div className="p-6 bg-blue-500/10 rounded-full border border-blue-500/20">
                    <Video className="w-12 h-12 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Camera Access Required</h3>
                    <p className="text-neutral-400 max-w-sm">
                      Enable your camera to start real-time face detection and tracking.
                    </p>
                  </div>
                  <button 
                    onClick={handleStart}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                  >
                    Get Started
                  </button>
                </div>
              ) : (
                <>
                  <img
                    src={`${apiUrl}/api/video/stream`}
                    alt="Live Video Stream"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-medium text-white shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    LIVE SERVER STREAM
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-neutral-900 border-neutral-800 shadow-xl h-[500px] flex flex-col">
            <CardHeader className="border-b border-neutral-800 shrink-0">
              <CardTitle className="flex items-center gap-2 text-neutral-200">
                <Database className="w-5 h-5 text-indigo-400" />
                Latest Detections
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto grow custom-scrollbar">
              <div className="divide-y divide-neutral-800/50">
                {rois.length > 0 ? (
                  rois.map((roi, idx) => (
                    <div key={idx} className="p-4 hover:bg-white/5 transition-colors group">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-mono text-neutral-500">
                          {new Date(roi.timestamp).toLocaleTimeString([], { hour12: false, fractionalSecondDigits: 3 })}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          Face
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex flex-col">
                          <span className="text-neutral-500 text-xs uppercase">Position</span>
                          <span className="font-mono text-neutral-300">X: {roi.x_min}, Y: {roi.y_min}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-neutral-500 text-xs uppercase">Size</span>
                          <span className="font-mono text-neutral-300">{roi.width} × {roi.height}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-neutral-500 flex flex-col items-center">
                    <Server className="w-8 h-8 mb-3 opacity-20" />
                    <p>No detection data available</p>
                    <p className="text-xs mt-1 opacity-60">Waiting for stream...</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
