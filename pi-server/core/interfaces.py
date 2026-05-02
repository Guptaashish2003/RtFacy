from abc import ABC, abstractmethod
from typing import List, Optional
from core.domain import ROI

class IFaceDetector(ABC):
    @abstractmethod
    def detect(self, image_bytes: bytes) -> Optional[ROI]:
        """Detects a face in the image and returns its ROI."""
        pass

class IImageDrawer(ABC):
    @abstractmethod
    def draw_roi(self, image_bytes: bytes, roi: ROI) -> bytes:
        """Draws the ROI on the image and returns the new image bytes."""
        pass

class IDatabase(ABC):
    @abstractmethod
    def save_roi(self, roi: ROI) -> None:
        """Saves ROI data to the database."""
        pass

    @abstractmethod
    def get_latest_rois(self, limit: int = 10) -> List[ROI]:
        """Retrieves the latest ROIs from the database."""
        pass
