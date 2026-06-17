import { useTranslation } from 'react-i18next'

import type { PaymentRequestStatus } from '@/domain'
import { cn } from '@/shared/utils/cn'

const statusBadgeClasses: Record<PaymentRequestStatus, string> = {
  pending: 'bg-[#e9f2fb] text-[#1268b3]',
  approved: 'bg-[#ecfdf3] text-[#027a48]',
  rejected: 'bg-[#fef3f2] text-[#b42318]',
  expired: 'bg-[#fff4e5] text-[#b54708]',
}

export function PaymentRequestStatusBadge({
  className,
  status,
}: {
  className?: string
  status: PaymentRequestStatus
}) {
  const { t } = useTranslation()

  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize',
        statusBadgeClasses[status],
        className,
      )}
    >
      {t(`paymentRequests.status.${status}`)}
    </span>
  )
}
