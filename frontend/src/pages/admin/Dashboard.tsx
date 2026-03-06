/**
 * Admin Dashboard Home Page
 * Shows key metrics from the backend API, recent leads, and quick actions
 */
import React from 'react';
import { Link } from 'react-router-dom';
import {
    Users,
    Calendar,
    DollarSign,
    TrendingUp,
    Clock,
    AlertCircle,
    ArrowUpRight,
    Plus,
    Inbox,
    CheckCircle,
    Search,
    Mail,
    Building2,
    Loader2,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getDashboardStats, getLeadStats, getLeads } from '@/utils/api';

export default function AdminDashboard() {
    // Fetch dashboard stats from API
    const { data: dashStats, isLoading: dashLoading } = useQuery({
        queryKey: ['dashboardStats'],
        queryFn: getDashboardStats,
        retry: 1,
        staleTime: 60000,
    });

    // Fetch lead stats
    const { data: leadStats, isLoading: leadLoading } = useQuery({
        queryKey: ['leadStats'],
        queryFn: getLeadStats,
        retry: 1,
        staleTime: 60000,
    });

    // Fetch recent leads
    const { data: recentLeads, isLoading: leadsLoading } = useQuery({
        queryKey: ['recentLeads'],
        queryFn: () => getLeads({ limit: 5 }),
        retry: 1,
        staleTime: 60000,
    });

    const isLoading = dashLoading || leadLoading;

    // Build stat cards from API data
    const stats = [
        {
            name: 'Total Leads',
            value: leadStats?.total?.toString() || '0',
            detail: `${leadStats?.by_status?.new || 0} new`,
            icon: Inbox,
            color: 'bg-blue-500',
        },
        {
            name: 'Appointments',
            value: dashStats?.appointments?.total?.toString() || dashStats?.today_appointments?.toString() || '0',
            detail: 'Today',
            icon: Calendar,
            color: 'bg-green-500',
        },
        {
            name: 'Revenue',
            value: dashStats?.revenue?.total ? `$${(dashStats.revenue.total / 1000).toFixed(1)}k` : '$0',
            detail: 'This month',
            icon: DollarSign,
            color: 'bg-emerald-500',
        },
        {
            name: 'Conversion Rate',
            value: leadStats?.conversion_rate ? `${leadStats.conversion_rate}%` : '0%',
            detail: 'Leads → Completed',
            icon: TrendingUp,
            color: 'bg-purple-500',
        },
    ];

    const quickActions = [
        { name: 'Scan for Leads', icon: Search, href: '/admin/lead-scanner', color: 'bg-sky-500 hover:bg-sky-600' },
        { name: 'View Prospects', icon: Building2, href: '/admin/prospects', color: 'bg-emerald-500 hover:bg-emerald-600' },
        { name: 'Send Outreach', icon: Mail, href: '/admin/prospects', color: 'bg-purple-500 hover:bg-purple-600' },
        { name: 'Add Customer', icon: Plus, href: '/admin/customers', color: 'bg-amber-500 hover:bg-amber-600' },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Welcome back! Here's your business overview.</p>
                </div>
                <div className="text-sm text-gray-400">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                            {isLoading && <Loader2 className="w-4 h-4 text-gray-300 animate-spin" />}
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{isLoading ? '—' : stat.value}</div>
                        <div className="text-sm text-gray-500 mt-1">{stat.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{stat.detail}</div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {quickActions.map((action) => (
                        <Link
                            key={action.name}
                            to={action.href}
                            className={`flex items-center gap-3 p-4 ${action.color} rounded-xl text-white transition-colors`}
                        >
                            <action.icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{action.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Leads */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
                        <Link to="/admin/leads" className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1">
                            View all <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="p-4">
                        {leadsLoading ? (
                            <div className="flex justify-center py-6">
                                <Loader2 className="w-6 h-6 text-gray-300 animate-spin" />
                            </div>
                        ) : !recentLeads || recentLeads.length === 0 ? (
                            <div className="text-center py-6 text-gray-400">
                                <Inbox className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                <p className="text-sm">No leads yet</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recentLeads.map((lead: any) => (
                                    <Link key={lead.id} to={`/admin/leads/${lead.id}`} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-sky-50 rounded-full flex items-center justify-center">
                                                <Users className="w-4 h-4 text-sky-600" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                                                <div className="text-xs text-gray-400">{lead.service || lead.source}</div>
                                            </div>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                                                lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                                                    lead.status === 'scheduled' ? 'bg-green-100 text-green-700' :
                                                        'bg-gray-100 text-gray-700'
                                            }`}>
                                            {lead.status}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Lead Pipeline */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="px-5 py-4 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">Lead Pipeline</h2>
                    </div>
                    <div className="p-5">
                        {leadLoading ? (
                            <div className="flex justify-center py-6">
                                <Loader2 className="w-6 h-6 text-gray-300 animate-spin" />
                            </div>
                        ) : !leadStats ? (
                            <div className="text-center py-6 text-gray-400 text-sm">No data yet</div>
                        ) : (
                            <div className="space-y-3">
                                {Object.entries(leadStats.by_status || {}).map(([status, count]) => {
                                    const total = leadStats.total || 1;
                                    const percentage = Math.round(((count as number) / total) * 100);
                                    const colors: Record<string, string> = {
                                        new: 'bg-blue-500',
                                        contacted: 'bg-yellow-500',
                                        quoted: 'bg-purple-500',
                                        scheduled: 'bg-green-500',
                                        completed: 'bg-emerald-500',
                                        cancelled: 'bg-red-400',
                                    };
                                    return (
                                        <div key={status}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600 capitalize">{status}</span>
                                                <span className="text-gray-900 font-medium">{count as number}</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2">
                                                <div className={`${colors[status] || 'bg-gray-400'} h-2 rounded-full transition-all`} style={{ width: `${percentage}%` }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
