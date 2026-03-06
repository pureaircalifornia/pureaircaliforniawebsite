import React, { useState, useEffect } from 'react';
import { getLeads, Lead, LeadStatus } from '@/utils/api';
import { format } from 'date-fns';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, RefreshCw, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LeadList = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<LeadStatus | 'all'>('all');
    const navigate = useNavigate();

    const fetchLeads = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = filterStatus !== 'all' ? { status: filterStatus } : undefined;
            const data = await getLeads(params);
            setLeads(data);
        } catch (err) {
            setError('Failed to load leads. Please check your authentication.');
            if (err instanceof Error && err.message.includes('401')) {
                navigate('/admin/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [filterStatus]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-800';
            case 'contacted': return 'bg-yellow-100 text-yellow-800';
            case 'quoted': return 'bg-purple-100 text-purple-800';
            case 'scheduled': return 'bg-green-100 text-green-800';
            case 'completed': return 'bg-gray-100 text-gray-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Leads</h1>
                <Button onClick={fetchLeads} variant="outline" size="sm" className="gap-2">
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border shadow-sm">
                <div className="w-48">
                    <Select
                        value={filterStatus}
                        onValueChange={(val) => setFilterStatus(val as LeadStatus | 'all')}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="quoted">Quoted</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    <div className="flex justify-center items-center gap-2 text-gray-500">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Loading leads...
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : leads.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                                    No leads found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            leads.map((lead) => (
                                <TableRow key={lead.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/admin/leads/${lead.id}`)}>
                                    <TableCell className="font-medium text-gray-600">
                                        {format(new Date(lead.created_at), 'MMM d, yyyy h:mm a')}
                                    </TableCell>
                                    <TableCell className="font-bold text-gray-900">{lead.name}</TableCell>
                                    <TableCell>{lead.service || lead.message?.slice(0, 30)}</TableCell>
                                    <TableCell className="capitalize text-gray-500">{lead.source?.replace('_', ' ')}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`${getStatusColor(lead.status)} border-0`}>
                                            {lead.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); navigate(`/admin/leads/${lead.id}`); }}>
                                            <Eye className="h-4 w-4 text-gray-400 hover:text-blue-600" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default LeadList;
