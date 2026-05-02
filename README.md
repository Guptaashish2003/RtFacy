# Vista Vision: Real-Time Face Detection System

Vista Vision is a full-stack, container-ready application designed for real-time face detection and video streaming. It features a high-performance FastAPI backend that processes video frames using OpenCV and Pillow, and a modern React frontend for real-time visualization.

## 🚀 Key Features

- **Real-Time Detection**: Efficient face detection using **Face-Recognition (Dlib)**, ensuring high accuracy without using OpenCV.
- **Custom Rendering**: Bounding boxes (ROI) are drawn using **Pillow (PIL)**, adhering to strict "no-OpenCV-drawing" requirements.
- **Live Streaming**: Low-latency MJPEG streaming from backend to frontend.
- **Data Persistence**: Automatic storage of detection metadata (coordinates and timestamps) in a SQLite/PostgreSQL database.
- **Premium UI**: A sleek, dark-mode dashboard built with React, Vite, Tailwind CSS, and Shadcn/UI.

---

## 🏗️ Architecture

- **Backend (`pi-server`)**: 
  - Framework: FastAPI
  - Computer Vision: **Face-Recognition / Dlib** (for detection), **Pillow** (for decoding and drawing)
  - Database: SQLAlchemy with SQLite/PostgreSQL
  - Pattern: SOLID / Clean Architecture (Modular layers for core, infrastructure, and api)
- **Frontend (`client`)**:
  - Framework: React 19 + Vite
  - Styling: Tailwind CSS 4
  - Icons: Lucide React
  - Routing: React Router Dom

---

## 🛠️ Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- Webcam access

### 1. Setup Backend (pi-server)

```bash
cd pi-server
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python main.py
```
The server will start at `http://localhost:8000`.

### 2. Setup Frontend (client)

```bash
cd client
npm install
npm run dev
```
The dashboard will be available at `http://localhost:5173`.

---

## 📖 Usage

1. Open the dashboard in your browser.
2. Click **"GET STARTED"** on the landing page.
3. On the Vista page, click **"Launch AI Vision"**.
4. Grant camera permissions when prompted.
5. The system will start capturing frames, sending them to the server, and displaying the processed AI stream with face detection boxes.

---

## 📡 API Endpoints

- `POST /api/video/frame`: Ingests raw JPEG frames from the client.
- `GET /api/video/stream`: Serves the MJPEG processed stream.
- `GET /api/roi`: Returns the history of detected regions of interest (JSON).

## 🔍 Deep-Dive Architecture

The system is designed with **Clean Architecture** and **SOLID** principles, ensuring that each component has a single responsibility and is easily swappable.

### 1. Data Flow: From Lens to Database
1.  **Ingestion**: The React client captures a frame using the browser's MediaStream API. It samples this at ~10 FPS and sends a JPEG blob via a `POST` request to the backend.
2.  **Detection Layer**: The `VideoPipelineService` receives the bytes and passes them to the `IFaceDetector` (implemented using `FaceRecognitionDetector`). It uses the HOG-based Dlib model to find precise face coordinates.
3.  **Drawing Layer**: If a face is found, the coordinates are passed to `IImageDrawer` (implemented using `PillowImageDrawer`). This layer decodes the image and renders the bounding box using **Pillow**, ensuring **zero reliance on OpenCV**.
4.  **Persistence Layer**: Simultaneously, the detection data (ROI) is passed to the `IDatabase` layer.
5.  **Streaming**: The processed image is pushed into a shared frame buffer, which the MJPEG stream endpoint (`/api/video/stream`) reads from and sends to the frontend.

### 2. Database Integration: More Than Just SQL
We use **SQLAlchemy**, the industry-standard Python ORM (Object-Relational Mapper), to interact with the database. This means we don't write raw SQL strings; instead, we interact with Python objects.

-   **PostgreSQL Support**: The system is fully compatible with PostgreSQL. In a production/Docker environment, simply set the `DATABASE_URL` environment variable:
    `DATABASE_URL=postgresql://user:password@localhost:5432/vistadb`
-   **The ORM Breakthrough**: 
    -   We define a `ROIRecord` class in `infrastructure/models.py` which inherits from SQLAlchemy's `Base`.
    -   The `PostgresDatabase` class in `infrastructure/database.py` manages the session lifecycle (`SessionLocal`).
    -   Saving data is as simple as `db.add(db_record)` and `db.commit()`.

### 3. How to Read the PostgreSQL Data
There are two ways to access the stored face detection data:

#### A. Via the API (Recommended)
The backend exposes a REST endpoint that queries the database using the ORM:
-   **Endpoint**: `GET /api/roi`
-   **Logic**: `db.query(ROIRecord).order_by(ROIRecord.timestamp.desc()).limit(10).all()`
-   **Format**: Returns a clean JSON array of the latest face detections.

#### B. Directly from the Database
If you are connected to the PostgreSQL instance via a tool like `psql` or `pgAdmin`, you can run:
```sql
SELECT * FROM roi_records ORDER BY timestamp DESC LIMIT 20;
```

---

## 🛠️ Technology Attestation

This project was developed with the assistance of **Antigravity**, an agentic AI coding assistant by Google DeepMind. AI was used for architectural planning, component generation, and troubleshooting environment-specific dependency issues.
