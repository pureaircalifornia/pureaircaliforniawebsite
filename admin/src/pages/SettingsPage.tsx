import { useAuth } from '../contexts/AuthContext';
import { User, Shield, Building } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-surface-400 mt-0.5">Manage your account</p>
      </div>

      {/* Profile */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-brand-400" />
          <h2 className="text-lg font-semibold text-white">Profile</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-brand-500/20">
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{user?.first_name} {user?.last_name}</h3>
              <p className="text-sm text-surface-400">{user?.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-surface-700/50">
            <div>
              <label className="text-sm text-surface-500">Role</label>
              <p className="text-white capitalize mt-1 flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-400" />
                {user?.role?.replace('_', ' ')}
              </p>
            </div>
            <div>
              <label className="text-sm text-surface-500">Status</label>
              <p className="text-emerald-400 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Active
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Company */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Building className="w-5 h-5 text-brand-400" />
          <h2 className="text-lg font-semibold text-white">Company</h2>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-surface-400">Company</span><span className="text-white">Pure Air California</span></div>
          <div className="flex justify-between"><span className="text-surface-400">Website</span><a href="https://pureaircalifornia.com" className="text-brand-400 hover:text-brand-300">pureaircalifornia.com</a></div>
          <div className="flex justify-between"><span className="text-surface-400">Dashboard</span><span className="text-surface-300">admin.pureaircalifornia.com</span></div>
        </div>
      </div>

      {/* API Info */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">System Info</h2>
        <div className="space-y-2 text-sm font-mono">
          <div className="flex justify-between"><span className="text-surface-400">API</span><span className="text-surface-300 text-xs">{import.meta.env.VITE_API_URL}</span></div>
          <div className="flex justify-between"><span className="text-surface-400">Version</span><span className="text-surface-300">1.0.0</span></div>
        </div>
      </div>
    </div>
  );
}
