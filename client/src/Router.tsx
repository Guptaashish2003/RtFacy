import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Home from "./Pages/Home";
import Vista from "./Pages/Vista";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // navbar + layout
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "vista",
        element: <Vista />,
      },
    ],
  },
]);
