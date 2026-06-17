import { useState } from 'react'

import { cn } from '@/shared/utils/cn'

type AmountInputProps = {
  id: string
  invalid?: boolean
  value: string
  onChange(value: string): void
}

export function AmountInput({ id, invalid = false, onChange, value }: AmountInputProps) {
  const [displayValue, setDisplayValue] = useState(value)

  return (
    <input
      aria-invalid={invalid}
      className={cn(
        'min-h-11 w-full min-w-0 rounded-lg border border-[#cfd8e6] px-3 text-sm outline-none focus:border-[#1268b3] focus:ring-4 focus:ring-[#d9ecfb]',
        invalid && 'border-[#f04438]',
      )}
      id={id}
      inputMode="decimal"
      onBlur={() => {
        setDisplayValue(formatAmountForDisplay(value))
      }}
      onChange={(event) => {
        const normalizedValue = normalizeAmountInput(event.target.value)
        setDisplayValue(normalizedValue)
        onChange(normalizedValue)
      }}
      onFocus={() => setDisplayValue(value)}
      type="text"
      value={displayValue}
    />
  )
}

function normalizeAmountInput(value: string): string {
  const normalizedSeparators = value.replace(/,/g, '.')
  const sanitized = normalizedSeparators.replace(/[^\d.]/g, '')
  const [integer = '', decimal = ''] = sanitized.split('.')
  const normalizedInteger = integer.replace(/^0+(?=\d)/, '')
  const normalizedDecimal = decimal.slice(0, 2)

  if (sanitized.includes('.')) {
    return `${normalizedInteger || '0'}.${normalizedDecimal}`
  }

  return normalizedInteger
}

function formatAmountForDisplay(value: string): string {
  const numericValue = Number(value)

  if (!value || Number.isNaN(numericValue)) {
    return value
  }

  return new Intl.NumberFormat('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue)
}
