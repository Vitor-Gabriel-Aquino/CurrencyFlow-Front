import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/shared/utils/cn'

type TextInputProps = ComponentPropsWithoutRef<'input'>

export function TextInput({ className, ...props }: TextInputProps) {
  return (
    <input
      className={cn(
        'min-h-11 w-full min-w-0 rounded-lg border border-[#cfd8e6] px-3 text-sm outline-none focus:border-[#1268b3] focus:ring-4 focus:ring-[#d9ecfb]',
        className,
      )}
      {...props}
    />
  )
}
