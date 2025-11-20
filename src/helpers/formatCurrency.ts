export const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
