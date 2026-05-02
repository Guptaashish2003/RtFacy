import { Users } from 'lucide-react';

interface NotificationProps {
  title: string;
  time: string;
  icon?: React.ReactNode;
  className?: string;
}

export function Notification({ title, time, icon, className = '' }: NotificationProps) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#1A1825]/90 backdrop-blur-xl border border-white/10 ${className}`}
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff7a00] to-[#ff006e] flex items-center justify-center flex-shrink-0">
        {icon || <Users className="w-5 h-5 text-white" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{title}</p>
        <p className="text-xs text-white/40 mt-0.5">{time}</p>
      </div>
    </div>
  );
}