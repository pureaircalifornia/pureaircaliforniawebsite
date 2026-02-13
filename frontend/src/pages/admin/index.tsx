/**
 * Admin Routes Index
 * Re-exports all admin page components
 */

// Layout
export { default as AdminLayout } from './AdminLayout';

// Authentication
export { default as AdminLogin } from './Login';

// Dashboard
export { default as AdminDashboard } from './Dashboard';

// Leads / CRM
export { default as LeadList } from './LeadList';
export { default as LeadDetail } from './LeadDetail';
export { default as CustomersList } from './CustomersList';
export { default as CustomerDetail } from './CustomerDetail';

// Scheduling
export { default as AppointmentsList } from './AppointmentsList';

// Billing
export { default as InvoicesList } from './InvoicesList';

// Reports
export { default as ReportsDashboard } from './Reports';
