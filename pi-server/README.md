# Vista Vision Backend (pi-server)

The backend service for Vista Vision, built with FastAPI. It handles video frame ingestion, face detection, image processing, and data persistence.

## 📁 Structure

- `api/`: FastAPI route definitions.
- `core/`: Domain models and interface definitions (SOLID).
- `infrastructure/`: Concrete implementations (Database, Image Processing).
- `services/`: Business logic and orchestration (Video Pipeline).
- `main.py`: Entry point and dependency injection setup.

## 🛠️ Installation

```bash
python -m venv .venv
source .venv/bin/activate # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## 🚀 Running

```bash
python main.py
```

## ⚙️ Configuration

The server runs on `0.0.0.0:8000` by default. It uses a local SQLite database (`vista.db`) to store ROI data.

## 🧪 Face Detection & Processing

The system is strictly **OpenCV-free**. It uses the following stack for visual intelligence:
- **Face-Recognition (Dlib)**: Handles high-accuracy face detection and coordinate extraction using Histogram of Oriented Gradients (HOG).
- **Pillow (PIL)**: Handles image decoding from bytes and rendering of the Axis-Aligned Bounding Box (ROI).
- **NumPy**: Facilitates efficient data conversion between the detection and drawing layers.
