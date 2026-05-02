from fastapi import APIRouter, UploadFile, File, Depends
from fastapi.responses import StreamingResponse
from typing import List

from core.domain import ROI
from core.interfaces import IDatabase
from services.video_pipeline import VideoPipelineService

# Create a router
router = APIRouter()

# Dependency placeholders
def get_video_pipeline() -> VideoPipelineService:
    pass

def get_database() -> IDatabase:
    pass

@router.post("/api/video/frame")
async def receive_frame(
    file: UploadFile = File(...),
    pipeline: VideoPipelineService = Depends(get_video_pipeline)
):
    """Endpoint to receive a single video frame."""
    frame_bytes = await file.read()
    await pipeline.process_frame(frame_bytes)
    return {"status": "success"}

@router.get("/api/video/stream")
async def stream_video(pipeline: VideoPipelineService = Depends(get_video_pipeline)):
    """Endpoint to serve the processed video feed as MJPEG."""
    return StreamingResponse(
        pipeline.get_frame_generator(), 
        media_type="multipart/x-mixed-replace; boundary=frame"
    )

@router.get("/api/roi", response_model=List[ROI])
async def get_roi_data(db: IDatabase = Depends(get_database)):
    """Endpoint to serve the latest ROI data."""
    # Convert dataclass to dict for FastAPI response serialization
    rois = db.get_latest_rois(limit=20)
    return rois
