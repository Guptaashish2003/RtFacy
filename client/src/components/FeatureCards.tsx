import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBgColor: string;
  borderGradient: string;
}

export function FeatureCard({ title, description, icon: Icon, iconBgColor, borderGradient }: FeatureCardProps) {
  return (
    <div className="group relative">
      <div
        className={cn(
          'relative h-full p-6 sm:p-8 rounded-3xl bg-[#1A1825]/40 backdrop-blur-sm',
          'border transition-all duration-500',
          'hover:bg-[#1A1825]/60 hover:scale-[1.02]',
          'overflow-hidden'
        )}
        style={{
          borderImage: `linear-gradient(135deg, ${borderGradient}) 1`,
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
      >
        {/* Gradient overlay on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${borderGradient.split(',')[0]}10, transparent)`,
          }}
        />

        <div className="relative z-10">
          {/* Icon */}
          <div
            className={cn(
              'w-12 h-12 rounded-2xl flex items-center justify-center mb-6',
              'transition-transform duration-500 group-hover:scale-110'
            )}
            style={{ backgroundColor: iconBgColor }}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            {title}
          </h3>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-6">
            {description}
          </p>

          {/* CTA */}
          <button className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors group/btn">
            <span className="tracking-wider">EXPLORE MORE</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>

        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-3xl transition-opacity group-hover:opacity-30"
          style={{
            background: `radial-gradient(circle, ${borderGradient.split(',')[0]}, transparent)`,
          }}
        />
      </div>
    </div>
  );
}