/**
 * Form validation schemas and instant input helpers
 * Provides client-side validation and clean US/LA phone formatting for quote and contact forms
 */

import { z } from 'zod';

// Phone number validation regex (US format)
const phoneRegex = /^(\+1)?[\s.-]?\(?[0-9]{3}\)?[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/;

/**
 * Formats US/LA phone input progressively as (213) 792-4145 without interfering with backspace.
 */
export function formatPhoneInput(raw: string): string {
  const digitsOnly = raw.replace(/\D/g, '');
  if (!digitsOnly) return '';
  const digits = digitsOnly.length === 11 && digitsOnly.startsWith('1')
    ? digitsOnly.slice(1)
    : digitsOnly.slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

export function isValidUSPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function isValidZip(value: string): boolean {
  return /^\d{5}$/.test(value.trim());
}

// Quote form validation schema
export const quoteFormSchema = z.object({
    service: z.string().min(1, 'Please select a service'),
    propertyType: z.string().min(1, 'Please select a property type'),
    squareFootage: z.string()
        .min(1, 'Please enter square footage')
        .regex(/^\d+$/, 'Square footage must be a number')
        .refine((val) => parseInt(val) > 0, 'Square footage must be greater than 0')
        .refine((val) => parseInt(val) <= 100000, 'Square footage seems too large'),
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name is too long')
        .regex(/^[a-zA-Z\s\-']+$/, 'Name contains invalid characters'),
    email: z.string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    phone: z.string()
        .min(1, 'Phone number is required')
        .regex(phoneRegex, 'Please enter a valid phone number'),
    address: z.string()
        .min(5, 'Please enter a valid address')
        .max(200, 'Address is too long'),
    message: z.string()
        .max(1000, 'Message is too long')
        .optional()
        .default(''),
    preferredDate: z.string()
        .min(1, 'Please select a preferred date')
        .refine((date) => {
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return selectedDate >= today;
        }, 'Date cannot be in the past'),
});

// Contact form validation schema (simpler version)
export const contactFormSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name is too long'),
    email: z.string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    phone: z.string()
        .min(1, 'Phone number is required')
        .regex(phoneRegex, 'Please enter a valid phone number'),
    message: z.string()
        .min(10, 'Message must be at least 10 characters')
        .max(2000, 'Message is too long'),
});

// Type exports for use in components
export type QuoteFormData = z.infer<typeof quoteFormSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;

// Validation helper functions
export function validateQuoteForm(data: unknown): {
    success: boolean;
    data?: QuoteFormData;
    errors?: Record<string, string>;
} {
    const result = quoteFormSchema.safeParse(data);

    if (result.success) {
        return { success: true, data: result.data };
    }

    const errors: Record<string, string> = {};
    result.error.errors.forEach((err) => {
        if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
        }
    });

    return { success: false, errors };
}

export function validateContactForm(data: unknown): {
    success: boolean;
    data?: ContactFormData;
    errors?: Record<string, string>;
} {
    const result = contactFormSchema.safeParse(data);

    if (result.success) {
        return { success: true, data: result.data };
    }

    const errors: Record<string, string> = {};
    result.error.errors.forEach((err) => {
        if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
        }
    });

    return { success: false, errors };
}

// Sanitize text input to prevent XSS
export function sanitizeInput(input: string): string {
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .trim();
}
