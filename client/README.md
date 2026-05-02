# Vista Vision Client

A high-performance React frontend for the Vista Vision face detection system.

## 🚀 Technologies

- **React 19**
- **Vite** (Build Tool)
- **Tailwind CSS 4** (Styling)
- **Lucide React** (Iconography)
- **Shadcn/UI** (Components)

## 🛠️ Setup

```bash
npm install
```

## 🏃‍♂️ Development

```bash
npm run dev
```

The app will start at `http://localhost:5173`.

## 📡 Features

- **Direct Camera Access**: Uses `navigator.mediaDevices.getUserMedia` to capture frames directly in the browser.
- **REST Streaming**: Efficiently sends frames to the backend and receives a live processed MJPEG stream.
- **Modern UI**: Features an "AI Vision" dashboard with real-time status indicators and detection logs.
