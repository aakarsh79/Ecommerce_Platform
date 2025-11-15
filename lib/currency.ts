export const formatINR = (amount: number | string): string => {
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(value) || !isFinite(value)) {
    return '₹0';
  }

  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(value);
  } catch (error) {
    // Fallback if Intl is not available
    return `₹${Math.round(value).toLocaleString('en-IN')}`;
  }
};

