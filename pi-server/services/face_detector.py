import face_recognition
import numpy as np
from PIL import Image
import io
from typing import Optional
from core.interfaces import IFaceDetector
from core.domain import ROI

class FaceRecognitionDetector(IFaceDetector):
    def __init__(self):
        # face_recognition doesn't need explicit initialization for the basic detector
        pass

    def detect(self, image_bytes: bytes) -> Optional[ROI]:
        try:
            # Use Pillow to decode image bytes (Zero OpenCV)
            img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
            frame = np.array(img)
            
            # Detect faces using the HOG-based model (fast, CPU-friendly, No OpenCV)
            face_locations = face_recognition.face_locations(frame)
            
            if face_locations:
                # face_locations returns (top, right, bottom, left)
                # We assume only one face (the first one detected)
                top, right, bottom, left = face_locations[0]
                
                x = left
                y = top
                w = right - left
                h = bottom - top
                
                return ROI(x_min=x, y_min=y, width=w, height=h)
            
            return None
        except Exception as e:
            print(f"Error in face-recognition detection: {e}")
            return None
