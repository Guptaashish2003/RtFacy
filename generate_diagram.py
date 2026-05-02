from diagrams import Diagram, Cluster, Edge
from diagrams.onprem.client import Client
from diagrams.onprem.database import PostgreSQL
from diagrams.onprem.network import Nginx
from diagrams.programming.framework import React, FastAPI
from diagrams.programming.language import Python

with Diagram("Real-Time Face Detection Architecture", show=False, filename="architecture", direction="LR"):
    client = Client("Browser / User")

    with Cluster("Docker Compose Environment"):
        with Cluster("Frontend Container"):
            react_app = React("Vite + React\n(Port 5173)")
            
        with Cluster("Backend Container"):
            fastapi_app = FastAPI("FastAPI\n(Port 8000)")
            face_detector = Python("MediaPipe\nFace Detector")
            drawer = Python("Pillow\nImage Drawer")
            
            fastapi_app - face_detector
            fastapi_app - drawer

        with Cluster("Database Container"):
            db = PostgreSQL("PostgreSQL\n(Port 5432)")

    # Connections
    client >> Edge(label="HTTP GET / stream") >> react_app
    react_app >> Edge(label="GET /api/video/stream\nGET /api/roi") >> fastapi_app
    
    mock_camera = Client("Mock Camera / Client")
    mock_camera >> Edge(label="POST /api/video/frame\n(JPEG)") >> fastapi_app
    
    fastapi_app >> Edge(label="Read/Write ROIs") >> db
