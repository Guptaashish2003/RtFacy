import cv2
import requests
import time
import sys

API_URL = "http://localhost:8000/api/video/frame"

def main():
    # Open the default camera
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("Error: Could not open camera.")
        sys.exit(1)
        
    print(f"Streaming video frames to {API_URL}...")
    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                break
                
            # Encode frame as JPEG
            _, buffer = cv2.imencode('.jpg', frame)
            
            # Send frame to the backend API
            try:
                response = requests.post(
                    API_URL, 
                    files={"file": ("frame.jpg", buffer.tobytes(), "image/jpeg")}
                )
            except Exception as e:
                print(f"Connection error: {e}")
                
            time.sleep(0.033) # ~30 FPS
            
    except KeyboardInterrupt:
        print("Stopping streaming...")
    finally:
        cap.release()

if __name__ == "__main__":
    main()
