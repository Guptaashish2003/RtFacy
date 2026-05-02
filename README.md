# Vista Vision: Real-Time Face Detection System

Vista Vision is a high-performance, containerized AI vision system designed for smooth real-time face detection across devices. It uses a hybrid architecture that combines a 60 FPS live video feed with an efficient 10 FPS AI detection pipeline, resulting in a professional, zero-lag experience.

## 🚀 Key Features

- **60 FPS Smooth Tracking**: Live video remains buttery smooth, while bounding boxes use **Lerp (Linear Interpolation)** to glide perfectly with face movements.
- **Coordinates-Only Architecture**: Instead of streaming heavy video back from the server, the backend sends only JSON coordinates. This reduces bandwidth by **90%**.
- **Cross-Network Support**: Designed to work over local networks (WiFi) or VS Code Dev Tunnels.
- **Docker-Ready**: Orchestrated with Docker Compose for one-click deployment of the Frontend, Backend, and PostgreSQL database.
- **Privacy-First Detection**: Face detection is handled by **Dlib (HOG)** and **MediaPipe** compliance (no OpenCV drawing) with persistent ROI logging.

---

## 🏗️ Architecture

- **Backend (`pi-server`)**: 
  - Framework: **FastAPI**
  - Computer Vision: **Face-Recognition / Dlib**
  - Data Flow: Returns JSON ROI (Region of Interest) coordinates for local frontend rendering.
  - Database: **PostgreSQL** with SQLAlchemy ORM.
- **Frontend (`client`)**:
  - Framework: **React 19 + Vite**
  - UI: Tailwind CSS 4 + Lucide Icons.
  - Rendering: **Dual-Canvas System** (one for video, one for AI overlay).

---

## 🛠️ Quick Start (Docker)

The fastest way to run the entire stack:

1.  **Configure Environment**:
    Open the root `.env` and set your local IP:
    ```env
    VITE_API_URL=http://192.168.x.x:8000
    ```

2.  **Launch**:
    ```bash
    docker compose up -d --build
    ```

3.  **Access**:
    - **Desktop**: [http://localhost:5173](http://localhost:5173)
    - **Mobile**: `http://192.168.x.x:5173`

---

## 📱 Mobile Camera Setup (Crucial)

Modern browsers block cameras on non-HTTPS connections. To use the app on your phone over local WiFi:

1.  Open Chrome on your phone.
2.  Go to: `chrome://flags/#unsafely-treat-insecure-origin-as-secure`
3.  Set the flag to **Enabled**.
4.  Enter your app URL: `http://192.168.x.x:5173`
5.  Tap **Relaunch**.

---

## 📡 API Endpoints

- `POST /api/video/frame`: Receives JPEG frames and returns detected ROI as JSON.
- `GET /api/roi`: Returns the history of detected regions from the PostgreSQL database.
- `GET /api/video/stream`: (Legacy/Debug) Serves a processed MJPEG stream.

---

## 🔍 Technology Deep-Dive

### Smooth Interpolation (The "Lerp" Effect)
To solve the "choppy" 10 FPS box problem, we implemented a client-side smoothing loop. When the server sends a new face position, the frontend doesn't "jump" to it. Instead, it uses a Linear Interpolation (Lerp) algorithm to move the box towards the new target at 60 frames per second.

### Clean Architecture & SOLID
The backend is structured into modular layers:
- **Core**: Domain models (ROI) and interfaces.
- **Services**: Business logic (Video Pipeline).
- **Infrastructure**: Implementations (Dlib Detector, Postgres Database).
- **API**: FastAPI routes and dependency injection.

---

## 🛠️ Technology Attestation

Developed with **Antigravity**, a powerful agentic AI coding assistant by Google DeepMind. Architectural planning, 60fps smoothing logic, and Docker orchestration were implemented in collaboration with AI.
