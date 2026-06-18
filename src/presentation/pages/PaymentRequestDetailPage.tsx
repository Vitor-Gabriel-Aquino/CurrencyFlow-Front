import { AlertCircle, ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'

import type { PaymentRequest } from '@/domain'
import { usePaymentRequest } from '@/presentation/hooks/usePaymentRequests'
import { Button } from '@/shared/ui/button'
import { PaymentRequestStatusBadge } from '@/shared/ui/payment-request-status-badge'
import { formatCurrencyAmount, formatDateTime } from '@/shared/utils/format'

export function PaymentRequestDetailPage() {
  const { paymentRequestId } = useParams()
  const { t } = useTranslation()
  const paymentRequest = usePaymentRequest(paymentRequestId ?? '')

  if (!paymentRequestId) {
    return (
      <StatePanel
        title={t('paymentRequests.detail.notFoundTitle')}
        description={t('paymentRequests.detail.notFoundDescription')}
      />
    )
  }

  if (paymentRequest.isLoading) {
    return (
      <StatePanel
        title={t('paymentRequests.detail.loadingTitle')}
        description={t('paymentRequests.detail.loadingDescription')}
      />
    )
  }

  if (paymentRequest.isError || !paymentRequest.data) {
    return (
      <StatePanel
        title={t('paymentRequests.detail.errorTitle')}
        description={t('paymentRequests.detail.errorDescription')}
      />
    )
  }

  return <PaymentRequestDetail paymentRequest={paymentRequest.data} />
}

function PaymentRequestDetail({ paymentRequest }: { paymentRequest: PaymentRequest }) {
  const { t } = useTranslation()

  return (
    <section className="grid gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Button asChild type="button" variant="secondary">
            <Link to="/dashboard/payment-requests">
              <ArrowLeft className="size-4" />
              {t('paymentRequests.detail.back')}
            </Link>
          </Button>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#1268b3]">
            {t('paymentRequests.detail.eyebrow')}
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#172033]">
            {paymentRequest.title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#526076]">
            {paymentRequest.description ?? t('paymentRequests.table.noDescription')}
          </p>
        </div>

        <PaymentRequestStatusBadge className="px-3 py-1.5 text-sm" status={paymentRequest.status} />
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label={t('paymentRequests.detail.originalAmount')}
          value={formatCurrencyAmount(paymentRequest.amount, paymentRequest.currency.code)}
        />
        <MetricCard
          label={t('paymentRequests.detail.convertedAmount')}
          value={formatCurrencyAmount(paymentRequest.amount_eur, 'EUR')}
        />
        <MetricCard
          label={t('paymentRequests.detail.expiresAt')}
          value={formatDateTime(paymentRequest.expires_at)}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-[#dfe5ef] bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-[#172033]">
            {t('paymentRequests.detail.exchangeSnapshot')}
          </h3>
          <dl className="mt-4 grid gap-4">
            <DetailItem
              label={t('paymentRequests.detail.exchangeFields.baseCurrency')}
              value={paymentRequest.exchange_rate.base_currency_code}
            />
            <DetailItem
              label={t('paymentRequests.detail.exchangeFields.localCurrency')}
              value={paymentRequest.exchange_rate.local_currency_code}
            />
            <DetailItem
              label={t('paymentRequests.detail.exchangeFields.rate')}
              value={paymentRequest.exchange_rate.eur_exchange_rate}
            />
            <DetailItem
              label={t('paymentRequests.detail.exchangeFields.source')}
              value={paymentRequest.exchange_rate.source}
            />
            <DetailItem
              label={t('paymentRequests.detail.exchangeFields.fetchedAt')}
              value={formatDateTime(paymentRequest.exchange_rate.fetched_at)}
            />
          </dl>
        </article>

        <article className="rounded-lg border border-[#dfe5ef] bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-[#172033]">
            {t('paymentRequests.detail.review')}
          </h3>
          <dl className="mt-4 grid gap-4">
            <DetailItem
              label={t('paymentRequests.detail.reviewFields.reviewedAt')}
              value={formatDateTime(paymentRequest.review.reviewed_at)}
            />
            <DetailItem
              label={t('paymentRequests.detail.reviewFields.note')}
              value={paymentRequest.review.review_note ?? '-'}
            />
            <DetailItem
              label={t('paymentRequests.detail.reviewFields.events')}
              value={paymentRequest.events
                .map((event) => t(`paymentRequests.events.${event}`))
                .join(', ')}
            />
          </dl>
        </article>
      </section>
    </section>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-lg border border-[#dfe5ef] bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#657189]">{label}</p>
      <p className="mt-2 text-lg font-semibold text-[#172033]">{value}</p>
    </article>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-[0.08em] text-[#657189]">
        {label}
      </dt>
      <dd className="mt-1 break-words text-sm font-semibold text-[#172033]">{value}</dd>
    </div>
  )
}

function StatePanel({ description, title }: { description: string; title: string }) {
  return (
    <div className="rounded-lg border border-[#dfe5ef] bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-[#e9f2fb] text-[#1268b3]">
        <AlertCircle className="size-6" />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-[#172033]">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#526076]">{description}</p>
    </div>
  )
}
