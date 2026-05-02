import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Home from "./Pages/Home";
import Vista from "./Pages/Vista";
import ErrorPage from "./Pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // navbar + layout
    errorElement: <ErrorPage />,
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
