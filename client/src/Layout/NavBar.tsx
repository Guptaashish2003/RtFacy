import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import logo from '../assets/logo.svg';

const navItems = [
  { name: 'FEATURES', href: '#features' },
  { name: 'SERVICES', href: '#services' },
  { name: 'TOOLS', href: '#tools' },
  { name: 'PRICING', href: '#pricing' },
  { name: 'ROADMAP', href: '#roadmap' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-[#0E0C15]/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      )}
    >
      <div className="max-w-[98%] mx-auto px-2 sm:px-6 lg:px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
             <img src={logo} alt="Vista Logo" className="h-10 w-auto" />     
            <span className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Brainwave
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors tracking-wider"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="text-sm font-medium text-white/60 hover:text-white transition-colors tracking-wider">
              NEW ACCOUNT
            </button>
            <button className="px-6 py-2.5 rounded-full border border-white/20 hover:border-white/40 text-sm font-medium text-white transition-all tracking-wider hover:bg-white/5">
              SIGN IN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0E0C15]/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-medium text-white/60 hover:text-white transition-colors tracking-wider"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-3 border-t border-white/10">
              <button className="w-full text-sm font-medium text-white/60 hover:text-white transition-colors tracking-wider text-left">
                NEW ACCOUNT
              </button>
              <button className="w-full px-6 py-2.5 rounded-full border border-white/20 hover:border-white/40 text-sm font-medium text-white transition-all tracking-wider hover:bg-white/5">
                SIGN IN
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}