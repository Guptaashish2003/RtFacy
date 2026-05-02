import { MessageCircle, Sparkles, Zap, Users, Lightbulb, Camera } from 'lucide-react';
import { FeatureCard } from '../components/FeatureCards';
import { GridLines } from '../components/design/GridLines';

const features = [
  {
    title: 'Ask anything',
    description: 'Lets users quickly find answers to their questions without having to search through multiple sources.',
    icon: MessageCircle,
    iconBgColor: '#8b5cf6',
    borderGradient: '#ac6aff, #00d4ff',
  },
  {
    title: 'Improve everyday',
    description: 'The app uses natural language processing to understand user queries and provide accurate and relevant responses.',
    icon: Sparkles,
    iconBgColor: '#f59e0b',
    borderGradient: '#ff7a00, #ff006e',
  },
  {
    title: 'Connect everywhere',
    description: 'Connect with the AI chatbot from anywhere, on any device, making it more accessible and convenient.',
    icon: Zap,
    iconBgColor: '#10b981',
    borderGradient: '#00ff88, #00d4ff',
  },
  {
    title: 'Fast responding',
    description: 'Lets users quickly find answers to their questions without having to search through multiple sources.',
    icon: Users,
    iconBgColor: '#ef4444',
    borderGradient: '#ff006e, #ac6aff',
  },
  {
    title: 'Ask anything',
    description: 'Lets users quickly find answers to their questions without having to search through multiple sources.',
    icon: Lightbulb,
    iconBgColor: '#8b5cf6',
    borderGradient: '#ac6aff, #ff7a00',
  },
  {
    title: 'Improve everyday',
    description: 'The app uses natural language processing to understand user queries and provide accurate and relevant responses.',
    icon: Camera,
    iconBgColor: '#f59e0b',
    borderGradient: '#ff7a00, #00ff88',
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-20 px-4 sm:px-6 lg:px-8">
      {/* Grid Lines Container */}
      <GridLines />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Chat Smarter, Not Harder
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Experience the future of communication with our intelligent AI chatbot
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              iconBgColor={feature.iconBgColor}
              borderGradient={feature.borderGradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
}