import { Eye, EyeOff } from 'lucide-react'
import { useState, type ComponentPropsWithoutRef } from 'react'

import { cn } from '@/shared/utils/cn'

type PasswordInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'> & {
  toggleLabel: string
}

export function PasswordInput({ className, toggleLabel, ...props }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)
  const Icon = isVisible ? EyeOff : Eye

  return (
    <div className="relative min-w-0">
      <input
        className={cn(
          'min-h-11 w-full min-w-0 rounded-lg border border-[#cfd8e6] px-3 pr-11 text-sm outline-none focus:border-[#1268b3] focus:ring-4 focus:ring-[#d9ecfb]',
          className,
        )}
        type={isVisible ? 'text' : 'password'}
        {...props}
      />
      <button
        aria-label={toggleLabel}
        className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-[#526076] hover:bg-[#f2f5f9] hover:text-[#172033] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1268b3]"
        onClick={() => setIsVisible((current) => !current)}
        type="button"
      >
        <Icon className="size-4" />
      </button>
    </div>
  )
}
