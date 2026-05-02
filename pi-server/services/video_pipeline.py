import asyncio
from typing import Optional
from core.interfaces import IFaceDetector, IImageDrawer, IDatabase
from core.domain import ROI

class VideoPipelineService:
    def __init__(self, detector: IFaceDetector, drawer: IImageDrawer, db: IDatabase):
        self.detector = detector
        self.drawer = drawer
        self.db = db
        self.latest_frame: Optional[bytes] = None
        self.frame_condition = asyncio.Condition()

    async def process_frame(self, frame_bytes: bytes) -> Optional[ROI]:
        """Processes a single frame: detects face, saves to DB, draws ROI, and stores the latest frame."""
        roi = self.detector.detect(frame_bytes)
        
        if roi:
            self.db.save_roi(roi)
            processed_bytes = self.drawer.draw_roi(frame_bytes, roi)
        else:
            processed_bytes = frame_bytes
            
        async with self.frame_condition:
            self.latest_frame = processed_bytes
            self.frame_condition.notify_all()
            
        return roi

    async def get_frame_generator(self):
        """Yields the latest processed frames for streaming."""
        while True:
            async with self.frame_condition:
                await self.frame_condition.wait()
                if self.latest_frame:
                    yield (b'--frame\r\n'
                           b'Content-Type: image/jpeg\r\n\r\n' + self.latest_frame + b'\r\n')
