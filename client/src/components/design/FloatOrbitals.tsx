import { useEffect, useRef } from 'react';

interface Orb {
  x: number;
  y: number;
  size: number;
  color: string;
  velocityX: number;
  velocityY: number;
  baseX: number;
  baseY: number;
}

export function FloatingOrbs() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const colors = [
      'rgba(172, 106, 255, 0.6)', // purple
      'rgba(0, 212, 255, 0.6)',   // cyan
      'rgba(255, 122, 0, 0.6)',   // orange
      'rgba(0, 255, 136, 0.6)',   // green
      'rgba(255, 0, 110, 0.6)',   // pink
    ];

    // Initialize orbs
    orbsRef.current = Array.from({ length: 8 }, () => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 200 + 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocityX: (Math.random() - 0.5) * 0.5,
        velocityY: (Math.random() - 0.5) * 0.5,
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const container = canvasRef.current;
      if (!container) return;

      // Clear previous orbs
      container.innerHTML = '';

      orbsRef.current.forEach((orb) => {
        // Calculate distance from mouse
        const dx = mouseRef.current.x - orb.x;
        const dy = mouseRef.current.y - orb.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 300;

        // Mouse influence
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          orb.x -= dx * force * 0.02;
          orb.y -= dy * force * 0.02;
        }

        // Move towards base position
        orb.x += (orb.baseX - orb.x) * 0.01;
        orb.y += (orb.baseY - orb.y) * 0.01;

        // Add natural floating movement
        orb.x += orb.velocityX;
        orb.y += orb.velocityY;

        // Boundary check
        if (orb.x < -orb.size || orb.x > window.innerWidth + orb.size) {
          orb.baseX = Math.random() * window.innerWidth;
        }
        if (orb.y < -orb.size || orb.y > window.innerHeight + orb.size) {
          orb.baseY = Math.random() * window.innerHeight;
        }

        // Create orb element
        const orbElement = document.createElement('div');
        orbElement.style.position = 'absolute';
        orbElement.style.left = `${orb.x}px`;
        orbElement.style.top = `${orb.y}px`;
        orbElement.style.width = `${orb.size}px`;
        orbElement.style.height = `${orb.size}px`;
        orbElement.style.borderRadius = '50%';
        orbElement.style.background = `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`;
        orbElement.style.filter = 'blur(40px)';
        orbElement.style.pointerEvents = 'none';
        orbElement.style.transform = 'translate(-50%, -50%)';

        container.appendChild(orbElement);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}