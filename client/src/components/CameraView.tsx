import { useRef, useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { API_URL } from '../config';

export default function CameraView() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const apiUrl = API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:8000' : window.location.origin.replace('5173', '8000'));
  const [error, setError] = useState<string | null>(null);

  const overlayRef = useRef<HTMLCanvasElement>(null);

  // Refs for smoothing interpolation
  const targetROIRef = useRef<any>(null);
  const currentROIRef = useRef<any>(null);

  // 1. Setup Camera Stream
  useEffect(() => {
    let stream: MediaStream | null = null;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const isSecureContext = window.isSecureContext;
      if (!isSecureContext) {
        setError("Camera access requires a secure context (HTTPS or localhost). Please check your connection.");
      } else {
        setError("Camera API not supported in this browser.");
      }
      return;
    }

    const constraints = {
      video: {
        facingMode: "user",
        width: { ideal: 1280 },
        height: { ideal: 720 },
        aspectRatio: { ideal: 9 / 16 },
        // @ts-ignore
        orientation: { ideal: "portrait" }
      },
      audio: false
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        stream = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
        setError("Could not access camera. Please ensure you have given permission.");
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // 2. Continuous Drawing Loop (60 FPS Smoothing)
  useEffect(() => {
    let animationId: number;

    const drawLoop = () => {
      if (overlayRef.current && videoRef.current) {
        const overlay = overlayRef.current;
        const overlayCtx = overlay.getContext('2d');
        const video = videoRef.current;

        if (overlayCtx && video.readyState >= 2) {
          // Sync sizes
          if (overlay.width !== video.videoWidth) {
            overlay.width = video.videoWidth;
            overlay.height = video.videoHeight;
          }

          overlayCtx.clearRect(0, 0, overlay.width, overlay.height);

          if (targetROIRef.current) {
            // Initialize currentROI if null
            if (!currentROIRef.current) {
              currentROIRef.current = { ...targetROIRef.current };
            }

            // Interpolate (Lerp) for smooth movement
            // 0.15 = smoothing factor. Lower is smoother/slower.
            const lerp = (start: number, end: number) => start + (end - start) * 0.15;

            currentROIRef.current = {
              x_min: lerp(currentROIRef.current.x_min, targetROIRef.current.x_min),
              y_min: lerp(currentROIRef.current.y_min, targetROIRef.current.y_min),
              width: lerp(currentROIRef.current.width, targetROIRef.current.width),
              height: lerp(currentROIRef.current.height, targetROIRef.current.height),
            };

            const { x_min, y_min, width, height } = currentROIRef.current;

            // Draw bounding box
            overlayCtx.strokeStyle = "#ff006e";
            overlayCtx.lineWidth = 4;
            overlayCtx.strokeRect(x_min, y_min, width, height);

            // Professional Glow
            overlayCtx.shadowBlur = 20;
            overlayCtx.shadowColor = "#ff006e";
            overlayCtx.strokeRect(x_min, y_min, width, height);
            overlayCtx.shadowBlur = 0;

            // Corner details for professional look
            const cornerSize = 20;
            overlayCtx.lineWidth = 6;
            // Top Left
            overlayCtx.beginPath();
            overlayCtx.moveTo(x_min, y_min + cornerSize);
            overlayCtx.lineTo(x_min, y_min);
            overlayCtx.lineTo(x_min + cornerSize, y_min);
            overlayCtx.stroke();
            // Bottom Right
            overlayCtx.beginPath();
            overlayCtx.moveTo(x_min + width - cornerSize, y_min + height);
            overlayCtx.lineTo(x_min + width, y_min + height);
            overlayCtx.lineTo(x_min + width, y_min + height - cornerSize);
            overlayCtx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(drawLoop);
    };

    animationId = requestAnimationFrame(drawLoop);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // 3. AI Sampling Logic (10 FPS)
  useEffect(() => {
    const captureFrame = () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video.readyState >= 2 && video.videoWidth > 0) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');

          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(async (blob) => {
              if (blob) {
                const formData = new FormData();
                formData.append('file', blob, 'frame.jpg');

                try {
                  const response = await fetch(`${apiUrl}/api/video/frame`, {
                    method: 'POST',
                    body: formData,
                    headers: { 'X-Tunnel-Skip-Preview': 'true' }
                  });
                  const data = await response.json();
                  // Update target position
                  targetROIRef.current = data.roi;
                } catch (e) {
                  console.error('Error sending frame', e);
                }
              }
            }, 'image/jpeg', 0.6);
          }
        }
      }
    };

    const intervalId = setInterval(captureFrame, 100);
    return () => clearInterval(intervalId);
  }, [apiUrl]);

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1A1825] p-8 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
        <h3 className="text-xl font-bold text-white mb-2">Camera Error</h3>
        <p className="text-white/70 max-w-md">{error}</p>
        {!window.isSecureContext && (
          <div className="mt-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm max-w-lg text-left">
            <p className="font-bold mb-2">🔒 Security Restriction:</p>
            <p className="mb-2">Mobile browsers block cameras on <strong>HTTP</strong> connections. To fix this on your phone:</p>
            <ol className="list-decimal ml-4 space-y-1 opacity-90">
              <li>Open Chrome on your phone</li>
              <li>Go to: <code className="bg-black/30 px-1 rounded">chrome://flags/#unsafely-treat-insecure-origin-as-secure</code></li>
              <li><strong>Enable</strong> the flag</li>
              <li>Add <code className="bg-black/30 px-1 rounded">http://192.168.1.106:5173</code> to the list</li>
              <li>Relaunch Chrome</li>
            </ol>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover scale-x-[-1]"
      />
      <canvas
        ref={overlayRef}
        className="absolute inset-0 w-full h-full object-cover scale-x-[-1] pointer-events-none"
      />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

