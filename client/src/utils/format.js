export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

export const formatPercentage = (value) => {
  return `${Math.round(value)}%`;
};

export const truncateString = (str, length) => {
  if (!str) return '';
  return str.length > length ? `${str.substring(0, length)}...` : str;
};
