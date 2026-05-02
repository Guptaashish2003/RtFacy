import { useRef, useEffect } from "react";

export default function CameraView() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  // 1. Setup Camera Stream
  useEffect(() => {
    let stream: MediaStream | null = null;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((mediaStream) => {
        stream = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
        }
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // 2. Sampling Logic (Send Frame to Python)
  useEffect(() => {
    const captureFrame = () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        // Ensure video is actually playing before trying to draw
        if (video.readyState >= 2 && video.videoWidth > 0) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Convert to JPEG Blob and send
            canvas.toBlob(async (blob) => {
              if (blob) {
                const formData = new FormData();
                formData.append('file', blob, 'frame.jpg');

                try {
                  await fetch(`${apiUrl}/api/video/frame`, {
                    method: 'POST',
                    body: formData,
                  });
                } catch (e) {
                  console.error('Error sending frame', e);
                }
              }
            }, 'image/jpeg', 0.7); // 0.7 = 70% quality (faster)
          }
        }
      }
    };

    // FPS Control: 100ms = 10 FPS.
    const intervalId = setInterval(captureFrame, 100);

    return () => clearInterval(intervalId);
  }, [apiUrl]);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      {/* Hidden canvas used for frame extraction */}
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}