import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2, ClipboardList, XCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router'

import {
  reviewPaymentRequestSchema,
  type ReviewPaymentRequestFormValues,
} from '@/application'
import type { PaymentRequest } from '@/domain'
import { ApiError } from '@/infrastructure/http/apiError'
import {
  useApprovePaymentRequest,
  usePaymentRequests,
  useRejectPaymentRequest,
} from '@/presentation/hooks/usePaymentRequests'
import { Button } from '@/shared/ui/button'
import { FieldError } from '@/shared/ui/field-error'
import { PaymentRequestStatusBadge } from '@/shared/ui/payment-request-status-badge'
import { formatCurrencyAmount, formatDateTime } from '@/shared/utils/format'

const perPage = 10

export function FinanceReviewPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const currentPage = Number.isInteger(page) && page > 0 ? page : 1
  const paymentRequests = usePaymentRequests({
    status: 'pending',
    page: currentPage,
    per_page: perPage,
  })
  const meta = paymentRequests.data?.meta

  function updatePage(nextPage: number) {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(nextPage))
    setSearchParams(params)
  }

  return (
    <section className="grid gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1268b3]">
          {t('financeReview.eyebrow')}
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#172033]">
          {t('financeReview.title')}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#526076]">
          {t('financeReview.description')}
        </p>
      </div>

      {paymentRequests.isLoading ? (
        <StatePanel
          icon={ClipboardList}
          title={t('financeReview.loadingTitle')}
          description={t('financeReview.loadingDescription')}
        />
      ) : null}

      {paymentRequests.isError ? (
        <StatePanel
          icon={AlertCircle}
          title={t('financeReview.errorTitle')}
          description={t('financeReview.errorDescription')}
        />
      ) : null}

      {paymentRequests.data && paymentRequests.data.data.length === 0 ? (
        <StatePanel
          icon={ClipboardList}
          title={t('financeReview.emptyTitle')}
          description={t('financeReview.emptyDescription')}
        />
      ) : null}

      {paymentRequests.data && paymentRequests.data.data.length > 0 ? (
        <div className="grid gap-4">
          {paymentRequests.data.data.map((paymentRequest) => (
            <ReviewQueueItem key={paymentRequest.id} paymentRequest={paymentRequest} />
          ))}

          {meta ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#dfe5ef] bg-white p-4 shadow-sm">
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
        </div>
      ) : null}
    </section>
  )
}

function ReviewQueueItem({ paymentRequest }: { paymentRequest: PaymentRequest }) {
  const { t } = useTranslation()
  const approvePaymentRequest = useApprovePaymentRequest()
  const rejectPaymentRequest = useRejectPaymentRequest()
  const [actionMessage, setActionMessage] = useState<string | null>(null)
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ReviewPaymentRequestFormValues>({
    resolver: zodResolver(reviewPaymentRequestSchema),
    defaultValues: {
      reviewNote: '',
    },
  })
  const isSubmitting = approvePaymentRequest.isPending || rejectPaymentRequest.isPending
  const mutationError = approvePaymentRequest.error ?? rejectPaymentRequest.error
  const errorMessage = getReviewErrorMessage(mutationError, t)

  const submitApproval = handleSubmit((values) => {
    setActionMessage(null)
    approvePaymentRequest.reset()
    rejectPaymentRequest.reset()
    approvePaymentRequest.mutate(
      {
        paymentRequestId: paymentRequest.id,
        payload: {
          review_note: values.reviewNote?.trim() || null,
        },
      },
      {
        onSuccess() {
          reset()
          setActionMessage(t('financeReview.actions.approved'))
        },
      },
    )
  })

  const submitRejection = handleSubmit((values) => {
    setActionMessage(null)
    approvePaymentRequest.reset()
    rejectPaymentRequest.reset()
    rejectPaymentRequest.mutate(
      {
        paymentRequestId: paymentRequest.id,
        payload: {
          review_note: values.reviewNote?.trim() || null,
        },
      },
      {
        onSuccess() {
          reset()
          setActionMessage(t('financeReview.actions.rejected'))
        },
      },
    )
  })

  return (
    <article className="rounded-lg border border-[#dfe5ef] bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-semibold text-[#172033]">{paymentRequest.title}</h3>
            <PaymentRequestStatusBadge status={paymentRequest.status} />
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#526076]">
            {paymentRequest.description ?? t('paymentRequests.table.noDescription')}
          </p>
        </div>
        <Link
          className="text-sm font-semibold text-[#1268b3]"
          to={`/dashboard/payment-requests/${paymentRequest.id}`}
        >
          {t('paymentRequests.actions.view')}
        </Link>
      </div>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <ReviewDetail
          label={t('financeReview.fields.originalAmount')}
          value={formatCurrencyAmount(paymentRequest.amount, paymentRequest.currency.code)}
        />
        <ReviewDetail
          label={t('financeReview.fields.convertedAmount')}
          value={formatCurrencyAmount(paymentRequest.amount_eur, 'EUR')}
        />
        <ReviewDetail
          label={t('financeReview.fields.exchangeRate')}
          value={paymentRequest.exchange_rate.eur_exchange_rate}
        />
        <ReviewDetail
          label={t('financeReview.fields.expiresAt')}
          value={formatDateTime(paymentRequest.expires_at)}
        />
      </dl>

      <form className="mt-5 grid gap-3" noValidate>
        <label className="grid gap-1 text-sm font-semibold text-[#172033]">
          {t('financeReview.fields.reviewNote')}
          <textarea
            className="min-h-24 rounded-lg border border-[#cfd8e6] bg-white px-3 py-2 text-sm outline-none focus:border-[#1268b3] focus:ring-4 focus:ring-[#d9ecfb]"
            placeholder={t('financeReview.placeholders.reviewNote')}
            {...register('reviewNote')}
          />
          <FieldError message={errors.reviewNote?.message} />
        </label>

        {errorMessage ? (
          <p className="rounded-lg border border-[#fecdca] bg-[#fffbfa] px-3 py-2 text-sm font-semibold text-[#b42318]">
            {errorMessage}
          </p>
        ) : null}

        {actionMessage ? (
          <p className="rounded-lg border border-[#abefc6] bg-[#f6fef9] px-3 py-2 text-sm font-semibold text-[#027a48]">
            {actionMessage}
          </p>
        ) : null}

        <div className="flex flex-wrap justify-end gap-2">
          <Button disabled={isSubmitting} onClick={submitRejection} type="button" variant="danger">
            <XCircle className="size-4" />
            {rejectPaymentRequest.isPending
              ? t('financeReview.actions.rejecting')
              : t('financeReview.actions.reject')}
          </Button>
          <Button disabled={isSubmitting} onClick={submitApproval} type="button">
            <CheckCircle2 className="size-4" />
            {approvePaymentRequest.isPending
              ? t('financeReview.actions.approving')
              : t('financeReview.actions.approve')}
          </Button>
        </div>
      </form>
    </article>
  )
}

function ReviewDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#edf1f7] bg-[#f8fafc] p-3">
      <dt className="text-xs font-medium uppercase tracking-[0.08em] text-[#657189]">{label}</dt>
      <dd className="mt-1 break-words font-semibold text-[#172033]">{value}</dd>
    </div>
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
    <div className="rounded-lg border border-[#dfe5ef] bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-[#e9f2fb] text-[#1268b3]">
        <Icon className="size-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-[#172033]">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#526076]">{description}</p>
    </div>
  )
}

function getReviewErrorMessage(error: Error | null, t: ReturnType<typeof useTranslation>['t']) {
  if (!error) return null

  if (error instanceof ApiError && error.kind === 'conflict') {
    return t('financeReview.errors.conflict')
  }

  if (error instanceof ApiError && error.kind === 'forbidden') {
    return t('financeReview.errors.forbidden')
  }

  return t('financeReview.errors.generic')
}
