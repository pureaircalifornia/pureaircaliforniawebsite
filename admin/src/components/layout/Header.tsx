import { Menu, Bell, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onMobileMenuClick: () => void;
}

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/leads': 'Lead Management',
  '/customers': 'Customers',
  '/settings': 'Settings',
};

export default function Header({ onMobileMenuClick }: HeaderProps) {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 lg:px-8 border-b border-surface-800/50 bg-surface-950/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMobileMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-surface-800 text-surface-400 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="text-xs text-surface-500 hidden sm:block">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-800/50 border border-surface-700/50 w-64">
          <Search className="w-4 h-4 text-surface-500" />
          <input
            type="text"
            placeholder="Search leads..."
            className="bg-transparent text-sm text-white placeholder:text-surface-500 outline-none w-full"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl hover:bg-surface-800 text-surface-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-brand-500 rounded-full border-2 border-surface-950 animate-pulse-soft" />
        </button>
      </div>
    </header>
  );
}
