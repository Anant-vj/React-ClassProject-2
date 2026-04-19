import { format, parseISO } from 'date-fns';

export const formatCurrency = (value) => {
  if (!value) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return format(new Date(dateString), 'MMM dd, yyyy');
  } catch (e) {
    return dateString;
  }
};

export const getLogoUrl = (companyName) => {
  if (!companyName) return '';
  // Try to create a domain name from the company name
  const domain = companyName.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '') + '.com';
  return `https://logo.clearbit.com/${domain}`;
};

export const generateId = () => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};
