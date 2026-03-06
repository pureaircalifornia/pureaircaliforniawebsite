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

// Lead Scanner & Outreach
export { default as LeadScanner } from './LeadScanner';
export { default as Prospects } from './Prospects';

// Leads / CRM
export { default as LeadList } from './LeadList';
export { default as LeadDetail } from './LeadDetail';
export { default as CustomersList } from './CustomersList';
export { default as CustomerDetail } from './CustomerDetail';
export { default as CustomerForm } from './CustomerForm';
export { default as AppointmentsList } from './AppointmentsList';
export { default as AppointmentForm } from './AppointmentForm';
export { default as InvoicesList } from './InvoicesList';
export { default as InvoiceDetail } from './InvoiceDetail';
export { default as Inbox } from './Inbox';

// Reports
export { default as ReportsDashboard } from './Reports';

// New Pages
export { default as Estimates } from './Estimates';
export { default as EstimateDetail } from './EstimateDetail';
export { default as Payments } from './Payments';
export { default as Documents } from './Documents';
export { default as Team } from './Team';
export { default as Settings } from './Settings';
