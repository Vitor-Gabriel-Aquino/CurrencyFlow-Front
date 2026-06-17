import { ChevronDown } from 'lucide-react'
import { useId, useMemo, useState } from 'react'

import { cn } from '@/shared/utils/cn'

export type AutocompleteOption = {
  label: string
  value: string
}

type AutocompleteFieldProps = {
  disabled?: boolean
  id: string
  invalid?: boolean
  noResultsText: string
  options: AutocompleteOption[]
  placeholder: string
  value: string
  onChange(value: string): void
}

export function AutocompleteField({
  disabled = false,
  id,
  invalid = false,
  noResultsText,
  onChange,
  options,
  placeholder,
  value,
}: AutocompleteFieldProps) {
  const listboxId = useId()
  const selectedOption = options.find((option) => option.value === value)
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState(selectedOption?.label ?? '')
  const visibleOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery || selectedOption?.label === query) {
      return options.slice(0, 30)
    }

    return options
      .filter((option) => option.label.toLowerCase().includes(normalizedQuery))
      .slice(0, 30)
  }, [options, query, selectedOption?.label])

  function selectOption(option: AutocompleteOption) {
    onChange(option.value)
    setQuery(option.label)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <input
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-invalid={invalid}
        className={cn(
          'min-h-11 w-full min-w-0 rounded-lg border border-[#cfd8e6] px-3 pr-10 text-sm outline-none focus:border-[#1268b3] focus:ring-4 focus:ring-[#d9ecfb]',
          invalid && 'border-[#f04438]',
        )}
        disabled={disabled}
        id={id}
        onBlur={() => {
          window.setTimeout(() => {
            setIsOpen(false)
            setQuery(selectedOption?.label ?? '')
          }, 100)
        }}
        onChange={(event) => {
          setQuery(event.target.value)
          onChange('')
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        role="combobox"
        type="text"
        value={query}
      />
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#657189]" />

      {isOpen && !disabled ? (
        <div
          className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-[#cfd8e6] bg-white p-1 shadow-lg"
          id={listboxId}
          role="listbox"
        >
          {visibleOptions.length > 0 ? (
            visibleOptions.map((option) => (
              <button
                className="flex min-h-9 w-full items-center rounded-md px-3 text-left text-sm text-[#172033] hover:bg-[#e9f2fb]"
                key={option.value}
                onMouseDown={(event) => {
                  event.preventDefault()
                  selectOption(option)
                }}
                role="option"
                type="button"
              >
                {option.label}
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-[#657189]">{noResultsText}</div>
          )}
        </div>
      ) : null}
    </div>
  )
}
