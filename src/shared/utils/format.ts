export function formatCurrencyAmount(amount: string, currencyCode: string): string {
  const numericAmount = Number(amount)

  if (Number.isNaN(numericAmount)) {
    return `${amount} ${currencyCode}`
  }

  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: currencyCode,
  }).format(numericAmount)
}

export function formatDateTime(value: string | null): string {
  if (!value) {
    return '-'
  }

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}
