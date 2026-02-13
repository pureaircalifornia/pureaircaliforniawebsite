/**
 * API Utility Module
 * Centralized API client for Pure Air California backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Lead types matching backend models
export type LeadStatus = 'new' | 'contacted' | 'quoted' | 'scheduled' | 'completed' | 'cancelled';
export type LeadSource = 'contact_form' | 'quote_form' | 'phone' | 'referral' | 'other';

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

/**
 * Create a new lead from form submission
 */
export async function createLead(leadData: LeadCreate): Promise<Lead> {
    const response = await fetch(`${API_BASE_URL}/leads`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
    });

    if (!response.ok) {
        const error: ApiError = await response.json().catch(() => ({ detail: 'Network error' }));
        throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
}

/**
 * Get all leads with optional filtering
 * Requires admin authentication
 */
export async function getLeads(
    adminSecret: string,
    params?: {
        status?: LeadStatus;
        source?: LeadSource;
        limit?: number;
        skip?: number;
    }
): Promise<Lead[]> {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set('status', params.status);
    if (params?.source) searchParams.set('source', params.source);
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.skip) searchParams.set('skip', params.skip.toString());

    const url = `${API_BASE_URL}/leads${searchParams.toString() ? `?${searchParams}` : ''}`;
    const response = await fetch(url, {
        headers: {
            'x-admin-secret': adminSecret,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

/**
 * Get a specific lead by ID
 */
export async function getLead(leadId: string, adminSecret: string): Promise<Lead> {
    const response = await fetch(`${API_BASE_URL}/leads/${leadId}`, {
        headers: {
            'x-admin-secret': adminSecret,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

/**
 * Update a lead's status or notes
 */
export async function updateLead(
    leadId: string,
    adminSecret: string,
    updates: Partial<Lead>
): Promise<Lead> {
    const response = await fetch(`${API_BASE_URL}/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-admin-secret': adminSecret,
        },
        body: JSON.stringify(updates),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

/**
 * Delete a lead
 */
export async function deleteLead(leadId: string, adminSecret: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/leads/${leadId}`, {
        method: 'DELETE',
        headers: {
            'x-admin-secret': adminSecret,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

/**
 * Check if the backend API is available
 */
export async function checkApiHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/`, {
            method: 'GET',
            signal: AbortSignal.timeout(3000), // 3 second timeout
        });
        return response.ok;
    } catch {
        return false;
    }
}

/**
 * Submit a form with backend fallback
 * Attempts to save to backend, even if EmailJS is used for notifications
 */
export async function submitFormWithBackend(
    formData: LeadCreate,
    options?: { silent?: boolean }
): Promise<{ success: boolean; lead?: Lead; error?: string }> {
    try {
        const lead = await createLead(formData);
        return { success: true, lead };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        if (!options?.silent) {
            console.warn('Backend submission failed:', errorMessage);
        }
        return { success: false, error: errorMessage };
    }
}
