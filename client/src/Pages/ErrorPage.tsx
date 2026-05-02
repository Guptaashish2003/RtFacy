import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import { AlertTriangle, Home, RefreshCw, ChevronLeft } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage = "An unexpected error occurred.";
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || errorMessage;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen w-full bg-[#0E0C15] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 max-w-2xl w-full">
        <div className="gradient-border rounded-3xl p-8 md:p-12 backdrop-blur-xl bg-[#1A1825]/40 border border-white/5 shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full animate-pulse" />
              <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center border border-red-500/30">
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Oops! <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">System Error</span>
              </h1>
              <p className="text-xl text-white/60 font-medium">
                Error {errorStatus}: {errorMessage}
              </p>
              <p className="text-white/40 max-w-md mx-auto leading-relaxed">
                Something went wrong while processing your request. Our AI sensors detect a glitch in the matrix.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                Go Back
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#ac6aff] to-[#00d4ff] text-white font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#ac6aff]/20 group"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                Try Again
              </button>
            </div>

            <button
              onClick={() => navigate('/')}
              className="text-white/40 hover:text-white/80 transition-colors flex items-center gap-2 text-sm"
            >
              <Home className="w-4 h-4" />
              Return to Control Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
