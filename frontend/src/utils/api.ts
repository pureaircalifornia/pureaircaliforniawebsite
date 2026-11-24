/**
 * API Utility Module
 * Centralized API client for Pure Air California backend
 * Uses JWT Bearer token authentication for admin operations
 */

// Auto-detect: always use relative /api on localhost (goes through Vite proxy),
// only use the full URL in production
const isLocalhost = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
);
export const API_BASE_URL = isLocalhost ? '/api' : (import.meta.env.VITE_API_BASE_URL || '/api');

// ── Types ────────────────────────────────────────────────────────────

export type LeadStatus = 'new' | 'contacted' | 'quoted' | 'scheduled' | 'completed' | 'cancelled';
export type LeadSource = 'contact_form' | 'quote_form' | 'phone' | 'referral' | 'google_maps' | 'outreach' | 'other';

export interface LeadCreate {
    name: string;
    email: string;
    phone: string;
    message?: string;
    service?: string;
    property_type?: string;
    square_footage?: string;
    address?: string;
    preferred_date?: string;
    source?: LeadSource;
    estimated_price?: number;
}

export interface Lead extends LeadCreate {
    id: string;
    status: LeadStatus;
    created_at: string;
    updated_at: string;
    notes?: string;
    estimated_price?: number;
}

export interface ApiError {
    detail: string;
}

// ── Auth Helper ──────────────────────────────────────────────────────

function getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('accessToken');
    if (token) {
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    }
    return {
        'Content-Type': 'application/json',
    };
}

export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const headers = { ...getAuthHeaders(), ...options.headers as Record<string, string> };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
        // Try refreshing the token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            try {
                const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${refreshToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (refreshResponse.ok) {
                    const data = await refreshResponse.json();
                    localStorage.setItem('accessToken', data.access_token);
                    if (data.refresh_token) {
                        localStorage.setItem('refreshToken', data.refresh_token);
                    }
                    // Retry original request with new token
                    const newHeaders = { ...getAuthHeaders(), ...options.headers as Record<string, string> };
                    return fetch(url, { ...options, headers: newHeaders });
                }
            } catch {
                // Refresh failed
            }
        }
        // If refresh failed, redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/admin/login';
    }

    return response;
}

// ── Auth Endpoints ───────────────────────────────────────────────────

export async function loginUser(email: string, password: string): Promise<{ access_token: string; refresh_token: string; token_type: string; user: any }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Login failed' }));
        throw new Error(error.detail || 'Invalid credentials');
    }

    return response.json();
}

export async function registerUser(data: { email: string; password: string; first_name: string; last_name: string }): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Registration failed' }));
        throw new Error(error.detail || 'Registration failed');
    }

    return response.json();
}

// ── Lead Endpoints ───────────────────────────────────────────────────

/**
 * Create a new lead from form submission (PUBLIC — no auth required)
 */
export async function createLead(leadData: LeadCreate): Promise<Lead> {
    const response = await fetch(`${API_BASE_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
    });

    if (!response.ok) {
        const error: ApiError = await response.json().catch(() => ({ detail: 'Network error' }));
        throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
}

/**
 * Get all leads with optional filtering (AUTH REQUIRED)
 */
export async function getLeads(
    _adminSecretOrParams?: string | { status?: LeadStatus; source?: LeadSource; limit?: number; skip?: number },
    params?: { status?: LeadStatus; source?: LeadSource; limit?: number; skip?: number }
): Promise<Lead[]> {
    // Support both old signature (adminSecret, params) and new (params only)
    const actualParams = typeof _adminSecretOrParams === 'object' ? _adminSecretOrParams : params;

    const searchParams = new URLSearchParams();
    if (actualParams?.status) searchParams.set('status', actualParams.status);
    if (actualParams?.source) searchParams.set('source', actualParams.source);
    if (actualParams?.limit) searchParams.set('limit', actualParams.limit.toString());
    if (actualParams?.skip) searchParams.set('skip', actualParams.skip.toString());

    const url = `${API_BASE_URL}/leads${searchParams.toString() ? `?${searchParams}` : ''}`;
    const response = await authFetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function getLead(leadId: string, _adminSecret?: string): Promise<Lead> {
    const response = await authFetch(`${API_BASE_URL}/leads/${leadId}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function updateLead(leadId: string, _adminSecret: string, updates: Partial<Lead>): Promise<Lead> {
    const response = await authFetch(`${API_BASE_URL}/leads/${leadId}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function deleteLead(leadId: string, _adminSecret?: string): Promise<void> {
    const response = await authFetch(`${API_BASE_URL}/leads/${leadId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

export async function getLeadStats(): Promise<any> {
    const response = await authFetch(`${API_BASE_URL}/leads/stats`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function getCustomers(params?: Record<string, any>): Promise<any[]> {
    const searchParams = new URLSearchParams();
    if (params) {
        Object.entries(params).forEach(([k, v]) => { if (v !== undefined) searchParams.set(k, String(v)); });
    }
    const url = `${API_BASE_URL}/customers${searchParams.toString() ? `?${searchParams}` : ''}`;
    const response = await authFetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function getCustomer(id: string): Promise<any> {
    const response = await authFetch(`${API_BASE_URL}/customers/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function createCustomer(data: any): Promise<any> {
    const response = await authFetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function updateCustomer(id: string, data: any): Promise<any> {
    const response = await authFetch(`${API_BASE_URL}/customers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function deleteCustomer(id: string): Promise<void> {
    const response = await authFetch(`${API_BASE_URL}/customers/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
}

export async function getCustomerHistory(id: string): Promise<any> {
    const response = await authFetch(`${API_BASE_URL}/customers/${id}/history`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

// ── Appointments ─────────────────────────────────────────────────────
export async function getAppointments(params?: Record<string, any>): Promise<any[]> {
    const searchParams = new URLSearchParams();
    if (params) {
        Object.entries(params).forEach(([k, v]) => { if (v !== undefined) searchParams.set(k, String(v)); });
    }
    const url = `${API_BASE_URL}/appointments${searchParams.toString() ? `?${searchParams}` : ''}`;
    const response = await authFetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function getAppointment(id: string): Promise<any> {
    const response = await authFetch(`${API_BASE_URL}/appointments/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function createAppointment(data: any): Promise<any> {
    const response = await authFetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function updateAppointment(id: string, data: any): Promise<any> {
    const response = await authFetch(`${API_BASE_URL}/appointments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function createCheckoutSession(invoiceId: string): Promise<{ url: string; session_id: string }> {
    const response = await authFetch(`${API_BASE_URL}/payments/checkout-session?invoice_id=${invoiceId}`, {
        method: 'POST',
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}
// ── Dashboard / Reports ──────────────────────────────────────────────

export async function getDashboardStats(): Promise<any> {
    const response = await authFetch(`${API_BASE_URL}/reports/dashboard`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

// Lead Scanner and outreach endpoints live in ./outreachApi.ts

// ── Housecall Pro Sync ───────────────────────────────────────────────

export async function syncLeadToHousecallPro(leadId: string, _adminSecret?: string): Promise<any> {
    const response = await authFetch(`${API_BASE_URL}/leads/${leadId}/sync`, {
        method: 'POST',
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Failed to sync' }));
        throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// ── Health Check ─────────────────────────────────────────────────────

export async function checkApiHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/health`, {
            method: 'GET',
            signal: AbortSignal.timeout(3000),
        });
        return response.ok;
    } catch {
        return false;
    }
}

// ── Form Submission ──────────────────────────────────────────────────

export async function submitFormWithBackend(
    formData: LeadCreate,
    options?: { silent?: boolean }
): Promise<{ success: boolean; lead?: Lead; error?: string }> {
    try {
        let lead: Lead | undefined;
        let emailDelivered = false;
        try {
            lead = await createLead(formData);
        } catch (dbError) {
            console.warn('Backend DB submission failed:', dbError);
        }

        // FormSubmit fallback for email notifications
        try {
            const emailResponse = await fetch('https://formsubmit.co/ajax/lou@pureaircalifornia.com', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Name: formData.name,
                    Email: formData.email,
                    Phone: formData.phone,
                    Service: formData.service || 'Not specified',
                    Property_Type: formData.property_type || 'Not specified',
                    Square_Footage: formData.square_footage || 'Not specified',
                    Estimated_Price: formData.estimated_price ? `$${formData.estimated_price.toFixed(2)}` : 'Not generated yet',
                    Address: formData.address || 'Not specified',
                    Preferred_Date: formData.preferred_date || 'Not specified',
                    Message: formData.message || 'No message provided',
                    Source: formData.source || 'Website Form',
                    _subject: `[Pure Air] New Lead: ${formData.source || 'Form'} - ${formData.name}`,
                    _template: "table",
                    _replyto: formData.email,
                    _captcha: "false"
                })
            });
            const emailResult = await emailResponse.json().catch(() => null);
            emailDelivered = emailResponse.ok && (emailResult?.success === true || emailResult?.success === 'true');
        } catch (emailErr) {
            console.warn('FormSubmit notification failed:', emailErr);
        }

        if (!lead && !emailDelivered) {
            return { success: false, error: 'Your request could not be delivered. Please try again or call us.' };
        }
        return { success: true, lead };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        if (!options?.silent) {
            console.warn('Backend submission failed:', errorMessage);
        }
        return { success: false, error: errorMessage };
    }
}

// ── Estimates ────────────────────────────────────────────────────────
export async function getEstimates(params?: Record<string, any>): Promise<any[]> {
    const searchParams = new URLSearchParams(params as any);
    const response = await authFetch(`${API_BASE_URL}/estimates${searchParams.toString() ? `?${searchParams}` : ''}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function getEstimate(id: string): Promise<any> {
    const response = await authFetch(`${API_BASE_URL}/estimates/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function createEstimate(data: any): Promise<any> {
    const response = await authFetch(`${API_BASE_URL}/estimates`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function updateEstimate(id: string, data: any): Promise<any> {
    const response = await authFetch(`${API_BASE_URL}/estimates/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function deleteEstimate(id: string): Promise<void> {
    const response = await authFetch(`${API_BASE_URL}/estimates/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
}

// ── Invoices & Payments ──────────────────────────────────────────────
export async function getInvoices(params?: Record<string, any>): Promise<any[]> {
    const searchParams = new URLSearchParams(params as any);
    const response = await authFetch(`${API_BASE_URL}/invoices${searchParams.toString() ? `?${searchParams}` : ''}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function getInvoice(id: string): Promise<any> {
    const response = await authFetch(`${API_BASE_URL}/invoices/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function getPayments(params?: Record<string, any>): Promise<any[]> {
    const searchParams = new URLSearchParams(params as any);
    const response = await authFetch(`${API_BASE_URL}/payments${searchParams.toString() ? `?${searchParams}` : ''}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

// ── Documents ────────────────────────────────────────────────────────
export async function getDocuments(params?: Record<string, any>): Promise<any[]> {
    const searchParams = new URLSearchParams(params as any);
    const response = await authFetch(`${API_BASE_URL}/documents${searchParams.toString() ? `?${searchParams}` : ''}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function uploadDocument(file: File, metadata: Record<string, string>): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    Object.keys(metadata).forEach(key => formData.append(key, metadata[key]));

    const response = await fetch(`${API_BASE_URL}/documents/upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: formData,
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

// ── Settings ─────────────────────────────────────────────────────────
export async function getCompanySettings(): Promise<any> {
    const response = await authFetch(`${API_BASE_URL}/settings`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function updateCompanySettings(data: any): Promise<any> {
    const response = await authFetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

// ── Team (Users) ─────────────────────────────────────────────────────
export async function getUsers(): Promise<any[]> {
    const response = await authFetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

export async function createUser(data: any): Promise<any> {
    const response = await authFetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}
