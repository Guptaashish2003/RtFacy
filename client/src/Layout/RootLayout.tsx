import { Outlet } from "react-router-dom";
import { Navbar } from "./NavBar";
import { FloatingOrbs } from "../components/design/FloatOrbitals";

export default function RootLayout() {
  return (
    <div className="relative min-h-screen bg-[#0E0C15] overflow-hidden">
      {/* Animated Background */}
      <FloatingOrbs />

      {/* Global Vertical Grid Lines */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <div className="absolute top-0 bottom-0 left-0 w-px bg-white/5" />
        <div className="absolute top-0 bottom-0 right-0 w-px bg-white/5" />
      </div>

      {/* Navbar stays mounted */}
      <Navbar />

      {/* Page content changes here */}
      <main className="relative z-10 pt-20">
        <Outlet />
      </main>

      {/* Gradient overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-[#0E0C15] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-[#0E0C15] via-transparent to-transparent" />
      </div>
    </div>
  );
}
