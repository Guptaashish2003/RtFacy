import { Code2, Home, Search, Plus } from 'lucide-react';
import { Notification } from '../components/ui/Notification';
import { GridLines } from '../components/design/GridLines';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Grid Lines Container - starts below navbar */}
      <div className="absolute inset-x-0 top-3 bottom-0">
        <GridLines />
      </div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10 px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center mb-16 space-y-6">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="block mb-2">Explore the Possibilities</span>
            <span className="block bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              of AI Chatting With{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Brainwave</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-[#ac6aff] to-[#00d4ff] opacity-30 blur-sm" />
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Unleash the power of AI with Brainwave. Upgrade your productivity with
            Brainwave, the open AI chat app.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <a 
              href="/vista"
              className="inline-block px-8 py-4 rounded-full bg-white text-[#0E0C15] font-medium text-sm tracking-wider hover:bg-white/90 transition-all hover:scale-105 shadow-2xl shadow-white/20"
            >
              GET STARTED
            </a>
          </div>
        </div>

        {/* Hero Image/Robot */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#1A1825]/60 to-[#0E0C15]/60 backdrop-blur-sm">
            {/* Robot Image Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-2xl mx-auto">
                {/* Robot face silhouette */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80">
                  {/* Eyes */}
                  <div className="absolute top-1/4 left-1/4 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#ff7a00] to-[#ff006e] blur-sm" />
                  <div className="absolute top-1/4 right-1/4 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#ff7a00] to-[#ff006e] blur-sm" />
                  
                  {/* Glow effect */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-3xl" />
                </div>
              </div>
            </div>

            {/* Floating UI Elements */}
            <div className="absolute bottom-6 left-6 animate-float" style={{ animationDelay: '0s' }}>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A1825]/90 backdrop-blur-xl border border-white/10">
                <Home className="w-4 h-4 text-white/60" />
                <Search className="w-4 h-4 text-white/60" />
                <Plus className="w-4 h-4 text-white/60" />
              </div>
            </div>

            {/* Notification */}
            <div 
              className="absolute bottom-8 right-8 w-64 animate-float"
              style={{ animationDelay: '0.5s' }}
            >
              <Notification
                title="Code generation"
                time="1m ago"
                icon={<Code2 className="w-5 h-5 text-white" />}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}