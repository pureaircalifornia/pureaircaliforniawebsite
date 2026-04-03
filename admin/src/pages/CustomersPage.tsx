import { useQuery } from '@tanstack/react-query';
import { Users, Search, Phone, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import api from '../api/client';

interface Customer {
  id?: string;
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address?: { street?: string; city?: string; state?: string; zip?: string };
  created_at?: string;
}

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const { data: customers = [], isLoading } = useQuery<Customer[]>({
    queryKey: ['customers'],
    queryFn: () => api.get('/customers?limit=100'),
  });

  const filtered = customers.filter((c) =>
    `${c.first_name} ${c.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Customers</h1>
        <p className="text-sm text-surface-400 mt-0.5">Your customer directory</p>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search customers..." className="input-field pl-10" />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card p-5 animate-pulse">
              <div className="h-6 bg-surface-700 rounded-lg w-2/3 mb-3" />
              <div className="h-4 bg-surface-700 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <Users className="w-12 h-12 mx-auto mb-3 text-surface-600" />
          <p className="text-surface-400">No customers found</p>
          <p className="text-surface-500 text-sm mt-1">Customers are created from completed leads</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c, i) => (
            <div key={c.id || c._id || i} className="glass-card p-5 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">
                  {c.first_name?.[0]}{c.last_name?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{c.first_name} {c.last_name}</h3>
                  <div className="space-y-1 mt-2 text-sm text-surface-300">
                    <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-surface-500" /><span className="truncate">{c.email}</span></div>
                    <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-surface-500" />{c.phone}</div>
                    {c.address?.city && <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-surface-500" />{c.address.city}, {c.address.state}</div>}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-3 border-t border-surface-700/50">
                <a href={`tel:${c.phone}`} className="btn-secondary text-xs flex-1 flex items-center justify-center gap-1.5 py-2"><Phone className="w-3.5 h-3.5" />Call</a>
                <a href={`mailto:${c.email}`} className="btn-primary text-xs flex-1 flex items-center justify-center gap-1.5 py-2"><Mail className="w-3.5 h-3.5" />Email</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
