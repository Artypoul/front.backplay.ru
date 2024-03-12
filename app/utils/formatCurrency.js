const currency = new Intl.NumberFormat('ru-Ru', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export const formatCurrency = (value) => currency.format(value);