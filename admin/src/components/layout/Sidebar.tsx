import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Target,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
  Radar,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/leads', icon: Target, label: 'Leads' },
  { to: '/scanner', icon: Radar, label: 'Lead Scanner' },
  { to: '/customers', icon: Users, label: 'Customers' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 flex flex-col
        ${collapsed ? 'w-20' : 'w-72'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        glass`}
    >
      {/* Logo area */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-surface-700/50">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-500/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-sm font-bold gradient-text whitespace-nowrap">Lead Maker</h1>
              <p className="text-[10px] text-surface-400 whitespace-nowrap">Pure Air California</p>
            </div>
          )}
        </div>

        {/* Mobile close */}
        <button
          onClick={onMobileClose}
          className="lg:hidden p-1.5 rounded-lg hover:bg-surface-700/50 text-surface-400"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Desktop collapse */}
        <button
          onClick={onToggle}
          className="hidden lg:flex p-1.5 rounded-lg hover:bg-surface-700/50 text-surface-400
                     transition-colors duration-200"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.end
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onMobileClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                group relative overflow-hidden
                ${
                  isActive
                    ? 'bg-brand-600/15 text-brand-400'
                    : 'text-surface-400 hover:text-white hover:bg-surface-700/40'
                }
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-500 rounded-r-full" />
              )}
              <item.icon
                className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${
                  isActive ? 'text-brand-400' : 'text-surface-500 group-hover:text-white'
                }`}
              />
              {!collapsed && (
                <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-surface-700/50">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">
            {user?.first_name?.[0] || 'U'}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-[11px] text-surface-400 truncate">{user?.email}</p>
            </div>
          )}
        </div>
        <button
          onClick={logout}
          className={`mt-3 w-full text-sm text-surface-400 hover:text-red-400 py-2 rounded-lg
                     hover:bg-red-500/10 transition-all duration-200
                     ${collapsed ? 'px-2' : 'px-3 text-left'}`}
        >
          {collapsed ? '⏻' : 'Sign Out'}
        </button>
      </div>
    </aside>
  );
}
