import { AlertCircle, ClipboardList, PlusCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router'

import type { PaymentRequest, PaymentRequestStatus } from '@/domain'
import {
  isPaymentRequestStatus,
  usePaymentRequests,
} from '@/presentation/hooks/usePaymentRequests'
import { Button } from '@/shared/ui/button'
import { PaymentRequestStatusBadge } from '@/shared/ui/payment-request-status-badge'
import { SelectField } from '@/shared/ui/select-field'
import { formatCurrencyAmount, formatDateTime } from '@/shared/utils/format'

const perPage = 10
const statusOptions: Array<PaymentRequestStatus | 'all'> = [
  'all',
  'pending',
  'approved',
  'rejected',
  'expired',
]
export function PaymentRequestsPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const statusParam = searchParams.get('status')
  const status = isPaymentRequestStatus(statusParam) ? statusParam : undefined
  const page = Number(searchParams.get('page') ?? '1')
  const currentPage = Number.isInteger(page) && page > 0 ? page : 1
  const paymentRequests = usePaymentRequests({
    status,
    page: currentPage,
    per_page: perPage,
  })
  const meta = paymentRequests.data?.meta

  function updateStatus(nextStatus: string) {
    const params = new URLSearchParams(searchParams)
    params.delete('page')

    if (isPaymentRequestStatus(nextStatus)) {
      params.set('status', nextStatus)
    } else {
      params.delete('status')
    }

    setSearchParams(params)
  }

  function updatePage(nextPage: number) {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(nextPage))
    setSearchParams(params)
  }

  return (
    <section className="grid gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1268b3]">
            {t('paymentRequests.eyebrow')}
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#172033]">
            {t('paymentRequests.title')}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#526076]">
            {t('paymentRequests.description')}
          </p>
        </div>

        <Button asChild>
          <Link to="/dashboard/payment-requests/new">
            <PlusCircle className="size-4" />
            {t('paymentRequests.actions.new')}
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border border-[#dfe5ef] bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dfe5ef] p-4">
          <div>
            <h3 className="text-base font-semibold text-[#172033]">
              {t('paymentRequests.table.title')}
            </h3>
            <p className="text-sm text-[#657189]">{t('paymentRequests.table.description')}</p>
          </div>

          <label className="grid min-w-52 gap-1 text-sm font-semibold text-[#172033]">
            {t('paymentRequests.filters.status')}
            <SelectField
              aria-label={t('paymentRequests.filters.status')}
              onChange={(event) => updateStatus(event.target.value)}
              value={status ?? 'all'}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {t(`paymentRequests.status.${option}`)}
                </option>
              ))}
            </SelectField>
          </label>
        </div>

        {paymentRequests.isLoading ? (
          <StatePanel
            icon={ClipboardList}
            title={t('paymentRequests.loadingTitle')}
            description={t('paymentRequests.loadingDescription')}
          />
        ) : null}

        {paymentRequests.isError ? (
          <StatePanel
            icon={AlertCircle}
            title={t('paymentRequests.errorTitle')}
            description={t('paymentRequests.errorDescription')}
          />
        ) : null}

        {paymentRequests.data && paymentRequests.data.data.length === 0 ? (
          <StatePanel
            icon={ClipboardList}
            title={t('paymentRequests.emptyTitle')}
            description={t('paymentRequests.emptyDescription')}
          />
        ) : null}

        {paymentRequests.data && paymentRequests.data.data.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[48rem] text-left text-sm">
                <thead className="bg-[#f8fafc] text-xs font-semibold uppercase tracking-[0.08em] text-[#657189]">
                  <tr>
                    <th className="px-4 py-3">{t('paymentRequests.table.columns.request')}</th>
                    <th className="px-4 py-3">{t('paymentRequests.table.columns.amount')}</th>
                    <th className="px-4 py-3">{t('paymentRequests.table.columns.status')}</th>
                    <th className="px-4 py-3">{t('paymentRequests.table.columns.expires')}</th>
                    <th className="px-4 py-3 text-right">
                      {t('paymentRequests.table.columns.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf1f7]">
                  {paymentRequests.data.data.map((paymentRequest) => (
                    <PaymentRequestRow key={paymentRequest.id} paymentRequest={paymentRequest} />
                  ))}
                </tbody>
              </table>
            </div>

            {meta ? (
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#dfe5ef] p-4">
                <p className="text-sm text-[#657189]">
                  {t('paymentRequests.pagination.summary', {
                    page: meta.current_page,
                    total: meta.last_page,
                    count: meta.total,
                  })}
                </p>
                <div className="flex gap-2">
                  <Button
                    disabled={meta.current_page <= 1}
                    onClick={() => updatePage(meta.current_page - 1)}
                    type="button"
                    variant="secondary"
                  >
                    {t('paymentRequests.pagination.previous')}
                  </Button>
                  <Button
                    disabled={meta.current_page >= meta.last_page}
                    onClick={() => updatePage(meta.current_page + 1)}
                    type="button"
                    variant="secondary"
                  >
                    {t('paymentRequests.pagination.next')}
                  </Button>
                </div>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  )
}

function PaymentRequestRow({ paymentRequest }: { paymentRequest: PaymentRequest }) {
  const { t } = useTranslation()

  return (
    <tr className="align-top">
      <td className="px-4 py-4">
        <p className="font-semibold text-[#172033]">{paymentRequest.title}</p>
        <p className="mt-1 max-w-md truncate text-[#657189]">
          {paymentRequest.description ?? t('paymentRequests.table.noDescription')}
        </p>
      </td>
      <td className="px-4 py-4">
        <p className="font-semibold text-[#172033]">
          {formatCurrencyAmount(paymentRequest.amount, paymentRequest.currency.code)}
        </p>
        <p className="mt-1 text-[#657189]">
          {formatCurrencyAmount(paymentRequest.amount_eur, 'EUR')}
        </p>
      </td>
      <td className="px-4 py-4">
        <PaymentRequestStatusBadge status={paymentRequest.status} />
      </td>
      <td className="px-4 py-4 text-[#526076]">{formatDateTime(paymentRequest.expires_at)}</td>
      <td className="px-4 py-4 text-right">
        <Link
          className="text-sm font-semibold text-[#1268b3]"
          to={`/dashboard/payment-requests/${paymentRequest.id}`}
        >
          {t('paymentRequests.actions.view')}
        </Link>
      </td>
    </tr>
  )
}

function StatePanel({
  description,
  icon: Icon,
  title,
}: {
  description: string
  icon: typeof ClipboardList
  title: string
}) {
  return (
    <div className="p-8 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-[#e9f2fb] text-[#1268b3]">
        <Icon className="size-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-[#172033]">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#526076]">{description}</p>
    </div>
  )
}
