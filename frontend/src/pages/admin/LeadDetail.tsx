import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLead, updateLead, deleteLead, syncLeadToHousecallPro, Lead, LeadStatus } from '@/utils/api';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Calendar, Mail, Phone, MapPin, Trash2, Save, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const LeadDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [lead, setLead] = useState<Lead | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notes, setNotes] = useState('');
    const [status, setStatus] = useState<LeadStatus>('new');
    const [syncing, setSyncing] = useState(false);


    useEffect(() => {
        const fetchLead = async () => {
            if (!id) return;
            try {
                const data = await getLead(id);
                setLead(data);
                setNotes(data.notes || '');
                setStatus(data.status);
            } catch (err) {
                toast({
                    title: "Error fetching lead",
                    description: "Could not load lead details.",
                    variant: "destructive"
                });
                navigate('/admin');
            } finally {
                setLoading(false);
            }
        };
        fetchLead();
    }, [id, navigate, toast]);

    const handleSave = async () => {
        if (!id || !lead) return;
        setSaving(true);
        try {
            await updateLead(id, '', { status, notes });
            toast({
                title: "Saved",
                description: "Lead updated successfully.",
            });
            setLead({ ...lead, status, notes });
        } catch (err) {
            toast({
                title: "Error saving",
                description: "Failed to update lead.",
                variant: "destructive"
            });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!id || !confirm('Are you sure you want to delete this lead? This cannot be undone.')) return;
        try {
            await deleteLead(id);
            toast({
                title: "Deleted",
                description: "Lead deleted successfully.",
            });
            navigate('/admin');
        } catch (err) {
            toast({
                title: "Error deleting",
                description: "Failed to delete lead.",
                variant: "destructive"
            });
        }
    };

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-gray-400" /></div>;
    if (!lead) return <div>Lead not found</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <Button variant="ghost" className="pl-0 gap-2 text-gray-500 hover:text-gray-900" onClick={() => navigate('/admin')}>
                <ArrowLeft className="h-4 w-4" /> Back to Leads
            </Button>

            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{lead.name}</h1>
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                        <Badge variant="secondary" className="font-normal capitalize">{lead.source?.replace('_', ' ')}</Badge>
                        <span>Created {format(new Date(lead.created_at), 'MMMM d, yyyy h:mm a')}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="destructive" size="icon" onClick={handleDelete} title="Delete Lead">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-50 p-2 rounded-full"><Mail className="h-4 w-4 text-blue-600" /></div>
                                    <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">{lead.email}</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-50 p-2 rounded-full"><Phone className="h-4 w-4 text-green-600" /></div>
                                    <a href={`tel:${lead.phone}`} className="text-gray-900">{lead.phone}</a>
                                </div>
                            </div>
                            {lead.address && (
                                <div className="flex items-center gap-3 pt-2">
                                    <div className="bg-gray-50 p-2 rounded-full"><MapPin className="h-4 w-4 text-gray-600" /></div>
                                    <span className="text-gray-700">{lead.address}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Request Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {lead.service && (
                                <div className="grid grid-cols-3 gap-4 border-b pb-4 last:border-0 last:pb-0">
                                    <div className="text-sm font-medium text-gray-500">Service</div>
                                    <div className="col-span-2 font-medium">{lead.service}</div>
                                </div>
                            )}
                            {lead.property_type && (
                                <div className="grid grid-cols-3 gap-4 border-b pb-4 last:border-0 last:pb-0">
                                    <div className="text-sm font-medium text-gray-500">Property Type</div>
                                    <div className="col-span-2">{lead.property_type}</div>
                                </div>
                            )}
                            {lead.square_footage && (
                                <div className="grid grid-cols-3 gap-4 border-b pb-4 last:border-0 last:pb-0">
                                    <div className="text-sm font-medium text-gray-500">Square Footage</div>
                                    <div className="col-span-2">{lead.square_footage}</div>
                                </div>
                            )}
                            {lead.preferred_date && (
                                <div className="grid grid-cols-3 gap-4 border-b pb-4 last:border-0 last:pb-0">
                                    <div className="text-sm font-medium text-gray-500">Preferred Date</div>
                                    <div className="col-span-2 flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        {lead.preferred_date}
                                    </div>
                                </div>
                            )}
                            {lead.message && (
                                <div className="pt-4 border-t mt-4">
                                    <div className="text-sm font-medium text-gray-500 mb-2">Message</div>
                                    <div className="bg-gray-50 p-4 rounded-md text-gray-700 italic">
                                        "{lead.message}"
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Management</CardTitle>
                            <CardDescription>Update lead status and internal notes</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Status</label>
                                <Select value={status} onValueChange={(val) => setStatus(val as LeadStatus)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="new">New</SelectItem>
                                        <SelectItem value="contacted">Contacted</SelectItem>
                                        <SelectItem value="quoted">Quoted</SelectItem>
                                        <SelectItem value="scheduled">Scheduled</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Internal Notes</label>
                                <Textarea
                                    placeholder="Add notes about this lead..."
                                    className="min-h-[150px]"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Button onClick={handleSave} disabled={saving || syncing} className="w-full">
                                    {saving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>

                                <Button
                                    onClick={async () => {
                                        if (!id) return;
                                        setSyncing(true);
                                        try {
                                            await syncLeadToHousecallPro(id);
                                            toast({
                                                title: "Success",
                                                description: "Lead manually synced to Housecall Pro",
                                            });
                                        } catch (e) {
                                            toast({
                                                title: "Sync Failed",
                                                description: e instanceof Error ? e.message : "Failed to sync to Housecall Pro",
                                                variant: "destructive"
                                            });
                                        } finally {
                                            setSyncing(false);
                                        }
                                    }}
                                    variant="outline"
                                    disabled={saving || syncing}
                                    className="w-full text-brand-700 border-brand-200 hover:bg-brand-50"
                                >
                                    {syncing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Syncing to Housecall Pro...
                                        </>
                                    ) : (
                                        <>
                                            Push to Housecall Pro
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LeadDetail;
