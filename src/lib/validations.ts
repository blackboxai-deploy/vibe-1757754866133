import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(20, 'Phone number too long'),
  company: z.string().min(2, 'Company name must be at least 2 characters').max(100, 'Company name too long'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
});

// Admin login validation schema
export const adminLoginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(50, 'Username too long'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password too long'),
});

// Types derived from schemas
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type AdminLoginData = z.infer<typeof adminLoginSchema>;

// Service options for contact form
export const serviceOptions = [
  { value: 'website', label: { id: 'Website Development', en: 'Website Development' } },
  { value: 'mobile', label: { id: 'Mobile App Development', en: 'Mobile App Development' } },
  { value: 'ecommerce', label: { id: 'E-Commerce Solutions', en: 'E-Commerce Solutions' } },
  { value: 'marketing', label: { id: 'Digital Marketing', en: 'Digital Marketing' } },
  { value: 'cloud', label: { id: 'Cloud Solutions', en: 'Cloud Solutions' } },
  { value: 'consulting', label: { id: 'Consulting & Strategy', en: 'Consulting & Strategy' } },
  { value: 'other', label: { id: 'Lainnya', en: 'Other' } },
];

// Form validation helpers
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Sanitize user input
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

// Format phone number for display
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('62')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return `+62${cleaned.substring(1)}`;
  }
  return `+62${cleaned}`;
};