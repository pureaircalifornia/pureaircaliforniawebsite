import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Target, Plus, Search, Filter, ChevronDown, X, Edit3,
  Trash2, Phone, Mail, MapPin, Calendar, DollarSign,
  ChevronLeft, ChevronRight, Eye,
} from 'lucide-react';
import api from '../api/client';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  service?: string;
  property_type?: string;
  square_footage?: string;
  address?: string;
  preferred_date?: string;
  source: string;
  status: string;
  created_at: string;
  updated_at: string;
  notes?: string;
  estimated_price?: number;
}

const STATUSES = ['new', 'contacted', 'quoted', 'scheduled', 'completed', 'cancelled'] as const;
const SOURCES = ['contact_form', 'quote_form', 'phone', 'referral', 'other'] as const;

const statusColors: Record<string, string> = {
  new: 'badge-new',
  contacted: 'badge-contacted',
  quoted: 'badge-quoted',
  scheduled: 'badge-scheduled',
  completed: 'badge-completed',
  cancelled: 'badge-cancelled',
};

export default function LeadsPage() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const limit = 20;

  const { data: leads = [], isLoading } = useQuery<Lead[]>({
    queryKey: ['leads', statusFilter, page],
    queryFn: () => {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      params.set('limit', String(limit));
      params.set('skip', String(page * limit));
      return api.get(`/leads?${params.toString()}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      api.patch(`/leads/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead-stats'] });
      toast.success('Lead updated successfully');
      setEditingLead(null);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/leads/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead-stats'] });
      toast.success('Lead deleted');
      setSelectedLead(null);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const createMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      api.post('/leads', data, { skipAuth: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead-stats'] });
      toast.success('Lead created successfully');
      setShowCreateForm(false);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const filteredLeads = leads.filter(
    (l) =>
      l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone?.includes(searchTerm)
  );

  const formatDate = (d: string) => {
    try {
      return new Date(d).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch {
      return d;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-sm text-surface-400 mt-0.5">
            Manage and track your sales pipeline
          </p>
        </div>
        <button onClick={() => setShowCreateForm(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Lead
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or phone..."
            className="input-field pl-10"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}
            className="input-field appearance-none pr-10 cursor-pointer min-w-[160px]"
          >
            <option value="">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500 pointer-events-none" />
        </div>
      </div>

      {/* Pipeline Quick Stats */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {STATUSES.map((s) => {
          const count = leads.filter((l) => l.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(statusFilter === s ? '' : s)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all
                ${statusFilter === s
                  ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30'
                  : 'bg-surface-800/50 text-surface-400 border border-surface-700/50 hover:border-surface-600'
                }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
              {count > 0 && (
                <span className="px-1.5 py-0.5 rounded-md bg-surface-700 text-xs">{count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-700/30">
                <th className="text-left text-xs font-medium text-surface-400 uppercase px-6 py-3">Name</th>
                <th className="text-left text-xs font-medium text-surface-400 uppercase px-6 py-3 hidden sm:table-cell">Contact</th>
                <th className="text-left text-xs font-medium text-surface-400 uppercase px-6 py-3 hidden md:table-cell">Service</th>
                <th className="text-left text-xs font-medium text-surface-400 uppercase px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-surface-400 uppercase px-6 py-3 hidden lg:table-cell">Date</th>
                <th className="text-right text-xs font-medium text-surface-400 uppercase px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-800/50">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={6} className="px-6 py-4">
                      <div className="h-6 bg-surface-800 rounded-lg animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-surface-500">
                    <Target className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p className="text-base">No leads found</p>
                    <p className="text-sm mt-1">Adjust your filters or create a new lead</p>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-surface-800/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white">{lead.name}</p>
                      <p className="text-xs text-surface-500 sm:hidden">{lead.phone}</p>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div className="flex items-center gap-1.5 text-sm text-surface-300">
                        <Mail className="w-3.5 h-3.5 text-surface-500" />
                        {lead.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-surface-500 mt-0.5">
                        <Phone className="w-3 h-3" />
                        {lead.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-sm text-surface-400">{lead.service || '—'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${statusColors[lead.status] || 'badge-new'}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell text-xs text-surface-400">
                      {formatDate(lead.created_at)}
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditingLead(lead)}
                          className="p-2 rounded-lg hover:bg-surface-700 text-surface-400 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete this lead?')) deleteMutation.mutate(lead.id);
                          }}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-surface-400 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-surface-700/30">
          <p className="text-sm text-surface-500">{filteredLeads.length} leads</p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="btn-secondary px-3 py-1.5 text-sm disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="flex items-center px-3 text-sm text-surface-400">Page {page + 1}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={leads.length < limit}
              className="btn-secondary px-3 py-1.5 text-sm disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedLead(null)}>
          <div className="glass-card w-full max-w-lg p-6 animate-slide-up max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Lead Details</h3>
              <button onClick={() => setSelectedLead(null)} className="p-2 rounded-lg hover:bg-surface-700 text-surface-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">{selectedLead.name}</span>
                <span className={`badge ${statusColors[selectedLead.status]}`}>{selectedLead.status}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-surface-300">
                  <Mail className="w-4 h-4 text-surface-500" />
                  <a href={`mailto:${selectedLead.email}`} className="hover:text-brand-400 transition-colors text-sm">{selectedLead.email}</a>
                </div>
                <div className="flex items-center gap-2 text-surface-300">
                  <Phone className="w-4 h-4 text-surface-500" />
                  <a href={`tel:${selectedLead.phone}`} className="hover:text-brand-400 transition-colors text-sm">{selectedLead.phone}</a>
                </div>
                {selectedLead.address && (
                  <div className="flex items-center gap-2 text-surface-300 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-surface-500" />
                    <span className="text-sm">{selectedLead.address}</span>
                  </div>
                )}
                {selectedLead.service && (
                  <div className="text-sm">
                    <span className="text-surface-500">Service:</span>
                    <span className="text-white ml-2">{selectedLead.service}</span>
                  </div>
                )}
                {selectedLead.property_type && (
                  <div className="text-sm">
                    <span className="text-surface-500">Property:</span>
                    <span className="text-white ml-2">{selectedLead.property_type}</span>
                  </div>
                )}
                {selectedLead.square_footage && (
                  <div className="text-sm">
                    <span className="text-surface-500">Sq Ft:</span>
                    <span className="text-white ml-2">{selectedLead.square_footage}</span>
                  </div>
                )}
                {selectedLead.estimated_price && (
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">${selectedLead.estimated_price}</span>
                  </div>
                )}
              </div>
              {selectedLead.message && (
                <div className="p-4 rounded-xl bg-surface-800/50 border border-surface-700/50">
                  <p className="text-xs text-surface-500 mb-1">Message</p>
                  <p className="text-sm text-surface-300">{selectedLead.message}</p>
                </div>
              )}
              {selectedLead.notes && (
                <div className="p-4 rounded-xl bg-surface-800/50 border border-surface-700/50">
                  <p className="text-xs text-surface-500 mb-1">Internal Notes</p>
                  <p className="text-sm text-surface-300">{selectedLead.notes}</p>
                </div>
              )}
              <div className="text-xs text-surface-500 flex items-center gap-4">
                <span>Created: {formatDate(selectedLead.created_at)}</span>
                <span>Updated: {formatDate(selectedLead.updated_at)}</span>
              </div>
              {/* Quick Actions */}
              <div className="flex gap-2 pt-2 border-t border-surface-700/50">
                <button onClick={() => { setEditingLead(selectedLead); setSelectedLead(null); }} className="btn-secondary flex-1 flex items-center justify-center gap-2">
                  <Edit3 className="w-4 h-4" /> Edit
                </button>
                <a href={`tel:${selectedLead.phone}`} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> Call
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Lead Modal */}
      {editingLead && (
        <EditLeadModal
          lead={editingLead}
          onClose={() => setEditingLead(null)}
          onSave={(data) => updateMutation.mutate({ id: editingLead.id, data })}
          saving={updateMutation.isPending}
        />
      )}

      {/* Create Lead Modal */}
      {showCreateForm && (
        <CreateLeadModal
          onClose={() => setShowCreateForm(false)}
          onSave={(data) => createMutation.mutate(data)}
          saving={createMutation.isPending}
        />
      )}
    </div>
  );
}

/* Edit Lead Modal Component */
function EditLeadModal({
  lead,
  onClose,
  onSave,
  saving,
}: {
  lead: Lead;
  onClose: () => void;
  onSave: (data: Record<string, unknown>) => void;
  saving: boolean;
}) {
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes || '');
  const [price, setPrice] = useState(lead.estimated_price?.toString() || '');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-card w-full max-w-md p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Edit Lead</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-700 text-surface-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-300 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input-field"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-300 mb-2">Estimated Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input-field"
              placeholder="349.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-300 mb-2">Internal Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input-field min-h-[100px] resize-none"
              placeholder="Add notes about this lead..."
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
            <button
              onClick={() =>
                onSave({
                  status,
                  notes: notes || undefined,
                  estimated_price: price ? parseFloat(price) : undefined,
                })
              }
              disabled={saving}
              className="btn-primary flex-1"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Create Lead Modal Component */
function CreateLeadModal({
  onClose,
  onSave,
  saving,
}: {
  onClose: () => void;
  onSave: (data: Record<string, unknown>) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    source: 'phone' as string,
    address: '',
    property_type: '',
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-card w-full max-w-lg p-6 animate-slide-up max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">New Lead</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-700 text-surface-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-surface-300 mb-2">Full Name *</label>
              <input value={form.name} onChange={(e) => update('name', e.target.value)} className="input-field" placeholder="John Smith" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-2">Email *</label>
              <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="input-field" placeholder="john@example.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-2">Phone *</label>
              <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="input-field" placeholder="(555) 123-4567" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-2">Service</label>
              <select value={form.service} onChange={(e) => update('service', e.target.value)} className="input-field">
                <option value="">Select service</option>
                <option value="Air Duct Cleaning">Air Duct Cleaning</option>
                <option value="Dryer Vent Cleaning">Dryer Vent Cleaning</option>
                <option value="HVAC Cleaning">HVAC Cleaning</option>
                <option value="Commercial Cleaning">Commercial Cleaning</option>
                <option value="Chimney Sweep">Chimney Sweep</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-2">Source</label>
              <select value={form.source} onChange={(e) => update('source', e.target.value)} className="input-field">
                {SOURCES.map((s) => (
                  <option key={s} value={s}>{s.replace('_', ' ')}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-surface-300 mb-2">Address</label>
              <input value={form.address} onChange={(e) => update('address', e.target.value)} className="input-field" placeholder="123 Main St, Los Angeles, CA" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-surface-300 mb-2">Message</label>
              <textarea value={form.message} onChange={(e) => update('message', e.target.value)} className="input-field min-h-[80px] resize-none" placeholder="Additional details..." />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
            <button
              onClick={() => {
                if (!form.name || !form.email || !form.phone) {
                  toast.error('Name, email, and phone are required');
                  return;
                }
                onSave(form);
              }}
              disabled={saving}
              className="btn-primary flex-1"
            >
              {saving ? 'Creating...' : 'Create Lead'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
