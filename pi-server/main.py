import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from api.routes import router as video_router, get_video_pipeline, get_database
from infrastructure.database import PostgresDatabase
from services.face_detector import FaceRecognitionDetector
from services.image_drawer import PillowImageDrawer
from services.video_pipeline import VideoPipelineService

app = FastAPI(title="Real-Time Face Detection Video Streaming API")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize dependencies
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./vista.db")
db_instance = PostgresDatabase(DATABASE_URL)
detector_instance = FaceRecognitionDetector()
drawer_instance = PillowImageDrawer()
pipeline_instance = VideoPipelineService(detector_instance, drawer_instance, db_instance)

# Dependency overrides for FastAPI
app.dependency_overrides[get_database] = lambda: db_instance
app.dependency_overrides[get_video_pipeline] = lambda: pipeline_instance

# Include routes
app.include_router(video_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)