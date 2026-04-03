import { useQuery } from '@tanstack/react-query';
import {
  Target, Users, CalendarCheck, TrendingUp, ArrowUpRight, ArrowDownRight,
  Clock, DollarSign, Zap, Radar, Send, Building2, ArrowRight,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import api from '../api/client';

interface LeadStats {
  total: number;
  by_status: {
    new: number;
    contacted: number;
    quoted: number;
    scheduled: number;
    completed: number;
    cancelled: number;
  };
  conversion_rate: number;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  service?: string;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: '#3b82f6',
  contacted: '#f59e0b',
  quoted: '#8b5cf6',
  scheduled: '#06b6d4',
  completed: '#10b981',
  cancelled: '#ef4444',
};

const CHART_COLORS = ['#3b82f6', '#f59e0b', '#8b5cf6', '#06b6d4', '#10b981', '#ef4444'];

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useQuery<LeadStats>({
    queryKey: ['lead-stats'],
    queryFn: () => api.get('/leads/stats'),
    refetchInterval: 30_000,
  });

  const { data: recentLeads } = useQuery<Lead[]>({
    queryKey: ['recent-leads'],
    queryFn: () => api.get('/leads?limit=8'),
    refetchInterval: 30_000,
  });

  const { data: outreachHistory = [] } = useQuery<Array<{
    id: string;
    to_email: string;
    subject: string;
    sent_at: string;
    status: string;
  }>>({
    queryKey: ['recent-outreach'],
    queryFn: () => api.get('/lead-scanner/outreach/history?limit=5'),
    refetchInterval: 60_000,
  });

  const { data: prospectsList = [] } = useQuery<Array<{ id: string }>>({
    queryKey: ['prospect-count'],
    queryFn: () => api.get('/lead-scanner/prospects?limit=1'),
    refetchInterval: 60_000,
  });

  const pieData = stats
    ? Object.entries(stats.by_status)
        .filter(([, v]) => v > 0)
        .map(([key, value]) => ({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          value,
          color: STATUS_COLORS[key],
        }))
    : [];

  // Generate mock trend data from stats
  const trendData = (() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const total = stats?.total || 0;
    return days.map((day, i) => ({
      day,
      leads: Math.max(0, Math.floor(total / 7 + (Math.sin(i) * total) / 14)),
    }));
  })();

  const statCards = [
    {
      label: 'Total Leads',
      value: stats?.total || 0,
      icon: Target,
      change: '+12%',
      changeUp: true,
      gradient: 'from-blue-500/20 to-blue-600/10',
      iconColor: 'text-blue-400',
    },
    {
      label: 'New Leads',
      value: stats?.by_status.new || 0,
      icon: Zap,
      change: '+5',
      changeUp: true,
      gradient: 'from-emerald-500/20 to-emerald-600/10',
      iconColor: 'text-emerald-400',
    },
    {
      label: 'Scheduled',
      value: stats?.by_status.scheduled || 0,
      icon: CalendarCheck,
      change: stats?.by_status.scheduled ? `${stats.by_status.scheduled} upcoming` : '0',
      changeUp: true,
      gradient: 'from-cyan-500/20 to-cyan-600/10',
      iconColor: 'text-cyan-400',
    },
    {
      label: 'Conversion Rate',
      value: `${stats?.conversion_rate || 0}%`,
      icon: TrendingUp,
      change: 'This month',
      changeUp: (stats?.conversion_rate || 0) > 0,
      gradient: 'from-purple-500/20 to-purple-600/10',
      iconColor: 'text-purple-400',
    },
  ];

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    } catch {
      return dateStr;
    }
  };

  const getStatusBadge = (status: string) => {
    const classes: Record<string, string> = {
      new: 'badge-new',
      contacted: 'badge-contacted',
      quoted: 'badge-quoted',
      scheduled: 'badge-scheduled',
      completed: 'badge-completed',
      cancelled: 'badge-cancelled',
    };
    return `badge ${classes[status] || 'badge-new'}`;
  };

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <div
            key={stat.label}
            className="glass-card p-5 stat-glow animate-slide-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-surface-400 font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {statsLoading ? (
                    <span className="inline-block w-16 h-8 bg-surface-700 rounded-lg animate-pulse" />
                  ) : (
                    stat.value
                  )}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {stat.changeUp ? (
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />
              )}
              <span className={`text-xs font-medium ${stat.changeUp ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Lead Trend Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-base font-semibold text-white mb-4">Lead Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2e79ff" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#2e79ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(51,65,85,0.3)" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15,23,42,0.9)',
                    border: '1px solid rgba(51,65,85,0.5)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(12px)',
                    color: '#fff',
                    fontSize: '13px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="#2e79ff"
                  strokeWidth={2.5}
                  fill="url(#leadGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline Distribution */}
        <div className="glass-card p-6">
          <h3 className="text-base font-semibold text-white mb-4">Pipeline</h3>
          {pieData.length > 0 ? (
            <>
              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(15,23,42,0.9)',
                        border: '1px solid rgba(51,65,85,0.5)',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '13px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {pieData.map((entry) => (
                  <div key={entry.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-surface-300">{entry.name}</span>
                    </div>
                    <span className="font-semibold text-white">{entry.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-48 flex items-center justify-center text-surface-500">
              <p>No lead data yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions + Outreach Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Lead Scanner Quick Action */}
        <a
          href="/scanner"
          className="glass-card p-6 flex items-center gap-5 hover:border-brand-500/30 border border-transparent transition-all group"
        >
          <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-500/20 to-purple-600/20 group-hover:from-brand-500/30 group-hover:to-purple-600/30 transition-all">
            <Radar className="w-7 h-7 text-brand-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white">Lead Scanner</h3>
            <p className="text-sm text-surface-400 mt-0.5">Search Google Maps for prospects & send outreach emails</p>
          </div>
          <ArrowRight className="w-5 h-5 text-surface-500 group-hover:text-brand-400 transition-colors" />
        </a>

        {/* Recent Outreach */}
        <div className="glass-card overflow-hidden">
          <div className="p-4 border-b border-surface-700/50 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-brand-400" /> Recent Outreach
            </h3>
            <a href="/scanner" className="text-xs text-brand-400 hover:text-brand-300">View all</a>
          </div>
          <div className="divide-y divide-surface-800/50">
            {outreachHistory.length === 0 ? (
              <div className="p-8 text-center text-surface-500 text-sm">No emails sent yet</div>
            ) : (
              outreachHistory.map((entry) => (
                <div key={entry.id} className="px-4 py-3 hover:bg-surface-800/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white truncate">{entry.to_email}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium
                      ${entry.status === 'sent' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {entry.status}
                    </span>
                  </div>
                  <p className="text-xs text-surface-500 truncate mt-0.5">{entry.subject}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-surface-700/50 flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">Recent Leads</h3>
          <a href="/leads" className="text-sm text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1">
            View all <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-700/30">
                <th className="text-left text-xs font-medium text-surface-400 uppercase tracking-wider px-6 py-3">Name</th>
                <th className="text-left text-xs font-medium text-surface-400 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">Contact</th>
                <th className="text-left text-xs font-medium text-surface-400 uppercase tracking-wider px-6 py-3 hidden md:table-cell">Source</th>
                <th className="text-left text-xs font-medium text-surface-400 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-surface-400 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-800/50">
              {recentLeads?.map((lead) => (
                <tr key={lead.id} className="hover:bg-surface-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-white">{lead.name}</p>
                    <p className="text-xs text-surface-500 sm:hidden">{lead.phone}</p>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <p className="text-sm text-surface-300">{lead.email}</p>
                    <p className="text-xs text-surface-500">{lead.phone}</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-sm text-surface-400">{lead.source?.replace('_', ' ')}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(lead.status)}>{lead.status}</span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-surface-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs">{formatDate(lead.created_at)}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {(!recentLeads || recentLeads.length === 0) && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-surface-500">
                    <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No leads yet. They'll appear here as they come in.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
