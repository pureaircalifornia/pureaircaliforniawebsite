/**
 * Admin Dashboard Home Page
 * Shows key metrics, recent activity, and quick actions
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
    ArrowDownRight,
    Plus,
    Inbox,
    CheckCircle,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface StatCard {
    name: string;
    value: string;
    change: string;
    changeType: 'increase' | 'decrease' | 'neutral';
    icon: React.ElementType;
    color: string;
}

const stats: StatCard[] = [
    {
        name: 'Total Customers',
        value: '2,847',
        change: '+12.5%',
        changeType: 'increase',
        icon: Users,
        color: 'bg-blue-500',
    },
    {
        name: 'Appointments Today',
        value: '12',
        change: '3 pending',
        changeType: 'neutral',
        icon: Calendar,
        color: 'bg-green-500',
    },
    {
        name: 'Revenue This Month',
        value: '$48,250',
        change: '+8.2%',
        changeType: 'increase',
        icon: DollarSign,
        color: 'bg-emerald-500',
    },
    {
        name: 'Outstanding',
        value: '$12,430',
        change: '15 invoices',
        changeType: 'neutral',
        icon: TrendingUp,
        color: 'bg-orange-500',
    },
];

const recentAppointments = [
    { id: 1, customer: 'John Smith', service: 'Air Duct Cleaning', time: '9:00 AM', status: 'completed' },
    { id: 2, customer: 'Maria Garcia', service: 'Dryer Vent Cleaning', time: '11:00 AM', status: 'in_progress' },
    { id: 3, customer: 'David Chen', service: 'HVAC Inspection', time: '1:00 PM', status: 'scheduled' },
    { id: 4, customer: 'Sarah Johnson', service: 'Air Duct Cleaning', time: '3:00 PM', status: 'scheduled' },
];

const alerts = [
    { id: 1, type: 'warning', message: '3 invoices overdue', link: '/admin/invoices?filter=overdue' },
    { id: 2, type: 'info', message: '2 documents expiring soon', link: '/admin/documents?filter=expiring' },
    { id: 3, type: 'success', message: '5 new leads this week', link: '/admin/customers?filter=new' },
];

export default function AdminDashboard() {
    // Fetch Lead Stats
    const { data: leadStats, isLoading: isLoadingStats } = useQuery({
        queryKey: ['leadStatsSummary'],
        queryFn: async () => {
            // Using relative URL; Vite proxy will handle localhost/api resolution in dev
            const res = await fetch('/api/leads/stats/summary');
            if (!res.ok) throw new Error('Failed to fetch lead stats');
            return res.json();
        }
    });

    // Fetch Recent Leads
    const { data: recentLeads, isLoading: isLoadingLeads } = useQuery({
        queryKey: ['recentLeadsDashboard'],
        queryFn: async () => {
            const res = await fetch('/api/leads?limit=5');
            if (!res.ok) throw new Error('Failed to fetch recent leads');
            return res.json();
        }
    });

    const dynamicStats: StatCard[] = [
        {
            name: 'Total Leads Caught',
            value: leadStats ? leadStats.total.toString() : '...',
            change: 'All time',
            changeType: 'neutral',
            icon: Users,
            color: 'bg-blue-500',
        },
        {
            name: 'New / Untouched Leads',
            value: leadStats ? leadStats.by_status.new.toString() : '...',
            change: 'Requires Attention',
            changeType: 'neutral',
            icon: Inbox,
            color: 'bg-amber-500',
        },
        {
            name: 'Completed Jobs',
            value: leadStats ? leadStats.by_status.completed.toString() : '...',
            change: 'Successfully Closed',
            changeType: 'neutral',
            icon: CheckCircle,
            color: 'bg-emerald-500',
        },
        {
            name: 'Scheduled Service',
            value: leadStats ? leadStats.by_status.scheduled.toString() : '...',
            change: 'Upcoming Jobs',
            changeType: 'neutral',
            icon: Calendar,
            color: 'bg-sky-500',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Live Insights Dashboard</h1>
                    <p className="text-gray-600">Overview of website leads and Housecall Pro sync status.</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        to="/admin/customers/new"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Customer
                    </Link>
                    <Link
                        to="/admin/appointments/new"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 rounded-lg text-sm font-medium text-white hover:bg-sky-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        New Appointment
                    </Link>
                </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {dynamicStats.map((stat) => (
                    <div
                        key={stat.name}
                        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div className={`p-2 rounded-lg ${stat.color}`}>
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                            <span
                                className={`inline-flex items-center text-sm font-medium ${stat.changeType === 'increase'
                                    ? 'text-green-600'
                                    : stat.changeType === 'decrease'
                                        ? 'text-red-600'
                                        : 'text-gray-600'
                                    }`}
                            >
                                {stat.changeType === 'increase' && <ArrowUpRight className="w-4 h-4 mr-1" />}
                                {stat.changeType === 'decrease' && <ArrowDownRight className="w-4 h-4 mr-1" />}
                                {stat.change}
                            </span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            <p className="text-sm text-gray-600">{stat.name}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Leads */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Website Leads</h2>
                            <Link
                                to="/admin/leads"
                                className="text-sm text-sky-600 hover:text-sky-700 font-medium"
                            >
                                View all leads
                            </Link>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {isLoadingLeads ? (
                            <div className="p-8 text-center text-gray-500">Loading leads...</div>
                        ) : !recentLeads || recentLeads.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">No leads captured yet.</div>
                        ) : recentLeads.map((lead: any) => (
                            <div key={lead.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 bg-sky-50 rounded-lg">
                                            <Users className="w-5 h-5 text-sky-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{lead.name}</p>
                                            <p className="text-sm text-gray-600">{lead.service || lead.source}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">{new Date(lead.created_at).toLocaleDateString()}</p>
                                        <span
                                            className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${lead.status === 'completed'
                                                ? 'bg-green-100 text-green-700'
                                                : lead.status === 'new'
                                                    ? 'bg-amber-100 text-amber-700'
                                                    : 'bg-blue-100 text-blue-700'
                                                }`}
                                        >
                                            {lead.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Alerts and notifications */}
                <div className="bg-white rounded-xl border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Alerts</h2>
                    </div>
                    <div className="p-4 space-y-3">
                        {alerts.map((alert) => (
                            <Link
                                key={alert.id}
                                to={alert.link}
                                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${alert.type === 'warning'
                                    ? 'bg-amber-50 hover:bg-amber-100'
                                    : alert.type === 'info'
                                        ? 'bg-blue-50 hover:bg-blue-100'
                                        : 'bg-green-50 hover:bg-green-100'
                                    }`}
                            >
                                <AlertCircle
                                    className={`w-5 h-5 ${alert.type === 'warning'
                                        ? 'text-amber-600'
                                        : alert.type === 'info'
                                            ? 'text-blue-600'
                                            : 'text-green-600'
                                        }`}
                                />
                                <span className="text-sm font-medium text-gray-900">{alert.message}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Quick actions */}
                    <div className="p-6 border-t border-gray-200">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <Link
                                to="/admin/estimates/new"
                                className="p-3 text-center text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Create Estimate
                            </Link>
                            <Link
                                to="/admin/invoices/new"
                                className="p-3 text-center text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Create Invoice
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
