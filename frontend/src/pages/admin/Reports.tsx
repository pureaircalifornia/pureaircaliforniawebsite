/**
 * Reports Dashboard Page
 * Business analytics and reporting
 */
import React, { useState } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Calendar,
    DollarSign,
    Users,
    Briefcase,
    Target,
    Clock,
} from 'lucide-react';

interface ReportCard {
    title: string;
    value: string;
    change: string;
    changeType: 'up' | 'down' | 'neutral';
    icon: React.ElementType;
    color: string;
}

const reportCards: ReportCard[] = [
    { title: 'Revenue', value: '$48,250', change: '+12.5%', changeType: 'up', icon: DollarSign, color: 'bg-green-500' },
    { title: 'New Customers', value: '156', change: '+8.3%', changeType: 'up', icon: Users, color: 'bg-blue-500' },
    { title: 'Jobs Completed', value: '89', change: '+15.2%', changeType: 'up', icon: Briefcase, color: 'bg-purple-500' },
    { title: 'Conversion Rate', value: '34.2%', change: '-2.1%', changeType: 'down', icon: Target, color: 'bg-orange-500' },
];

const serviceBreakdown = [
    { service: 'Air Duct Cleaning', count: 45, revenue: 20250, percentage: 42 },
    { service: 'Dryer Vent Cleaning', count: 32, revenue: 5760, percentage: 12 },
    { service: 'HVAC Cleaning', count: 18, revenue: 14400, percentage: 30 },
    { service: 'Inspection', count: 24, revenue: 2400, percentage: 5 },
    { service: 'Other', count: 12, revenue: 5440, percentage: 11 },
];

const technicianPerformance = [
    { name: 'Mike Johnson', jobs: 28, revenue: 14200, rating: 4.9, completion: 96 },
    { name: 'Sarah Wilson', jobs: 24, revenue: 12800, rating: 4.8, completion: 94 },
    { name: 'Tom Davis', jobs: 21, revenue: 11250, rating: 4.7, completion: 92 },
    { name: 'Lisa Chen', jobs: 16, revenue: 10000, rating: 4.9, completion: 98 },
];

export default function ReportsDashboard() {
    const [dateRange, setDateRange] = useState('month');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                    <p className="text-gray-600">Business analytics and performance metrics</p>
                </div>
                <div className="flex gap-2">
                    {['week', 'month', 'quarter', 'year'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setDateRange(range)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${dateRange === range
                                    ? 'bg-sky-600 text-white'
                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {range.charAt(0).toUpperCase() + range.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {reportCards.map((card) => (
                    <div key={card.title} className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg ${card.color}`}>
                                <card.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className={`flex items-center text-sm font-medium ${card.changeType === 'up' ? 'text-green-600' :
                                    card.changeType === 'down' ? 'text-red-600' : 'text-gray-600'
                                }`}>
                                {card.changeType === 'up' && <TrendingUp className="w-4 h-4 mr-1" />}
                                {card.changeType === 'down' && <TrendingDown className="w-4 h-4 mr-1" />}
                                {card.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
                        <p className="text-sm text-gray-600">{card.title}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Service Breakdown */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Breakdown</h3>
                    <div className="space-y-4">
                        {serviceBreakdown.map((item) => (
                            <div key={item.service}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-900">{item.service}</span>
                                    <span className="text-sm text-gray-600">{item.count} jobs • ${item.revenue.toLocaleString()}</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-sky-500 rounded-full"
                                        style={{ width: `${item.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Technician Performance */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Technician Performance</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                                    <th className="pb-3">Technician</th>
                                    <th className="pb-3 text-center">Jobs</th>
                                    <th className="pb-3 text-right">Revenue</th>
                                    <th className="pb-3 text-center">Rating</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {technicianPerformance.map((tech) => (
                                    <tr key={tech.name}>
                                        <td className="py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                    <span className="text-xs font-medium text-gray-600">
                                                        {tech.name.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                                <span className="font-medium text-gray-900">{tech.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 text-center text-gray-600">{tech.jobs}</td>
                                        <td className="py-3 text-right font-medium text-gray-900">${tech.revenue.toLocaleString()}</td>
                                        <td className="py-3 text-center">
                                            <span className="inline-flex items-center gap-1 text-yellow-600">
                                                ★ {tech.rating}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Revenue Chart Placeholder */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <div className="text-center">
                            <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500">Revenue chart visualization</p>
                            <p className="text-sm text-gray-400">Integration with chart library needed</p>
                        </div>
                    </div>
                </div>

                {/* Lead Conversion */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Conversion Funnel</h3>
                    <div className="space-y-4">
                        {[
                            { stage: 'New Leads', count: 245, percentage: 100, color: 'bg-blue-500' },
                            { stage: 'Contacted', count: 198, percentage: 81, color: 'bg-cyan-500' },
                            { stage: 'Qualified', count: 124, percentage: 51, color: 'bg-purple-500' },
                            { stage: 'Estimate Sent', count: 89, percentage: 36, color: 'bg-orange-500' },
                            { stage: 'Converted', count: 52, percentage: 21, color: 'bg-green-500' },
                        ].map((stage) => (
                            <div key={stage.stage} className="flex items-center gap-4">
                                <div className="w-28 text-sm text-gray-600">{stage.stage}</div>
                                <div className="flex-1 h-8 bg-gray-100 rounded overflow-hidden">
                                    <div
                                        className={`h-full ${stage.color} flex items-center justify-end pr-2`}
                                        style={{ width: `${stage.percentage}%` }}
                                    >
                                        <span className="text-xs font-medium text-white">{stage.count}</span>
                                    </div>
                                </div>
                                <div className="w-12 text-right text-sm text-gray-600">{stage.percentage}%</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
