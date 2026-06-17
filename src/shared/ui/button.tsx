import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/shared/utils/cn'

const buttonVariants = cva(
  'inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[#1268b3] text-white hover:bg-[#0f5a9c] focus-visible:outline-[#1268b3]',
        secondary:
          'border border-[#cfd8e6] bg-white text-[#172033] hover:bg-[#f2f5f9] focus-visible:outline-[#1268b3]',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export function Button({ asChild = false, className, variant, ...props }: ButtonProps) {
  const Component = asChild ? Slot : 'button'

  return <Component className={cn(buttonVariants({ variant }), className)} {...props} />
}
