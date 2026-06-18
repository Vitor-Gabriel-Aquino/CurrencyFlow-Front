import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import {
  createPaymentRequestSchema,
  type CreatePaymentRequestFormValues,
} from '@/application'
import { ApiError } from '@/infrastructure'
import { useCurrencies } from '@/presentation/hooks/useRegistration'
import {
  useCreatePaymentRequest,
  useExchangeRatePreview,
} from '@/presentation/hooks/usePaymentRequests'
import { useCurrentUser } from '@/presentation/hooks/useAuth'
import { AmountInput } from '@/shared/ui/amount-input'
import { AutocompleteField } from '@/shared/ui/autocomplete-field'
import { Button } from '@/shared/ui/button'
import { FieldError } from '@/shared/ui/field-error'
import { TextInput } from '@/shared/ui/text-input'
import { formatDateTime } from '@/shared/utils/format'

const defaultValues: CreatePaymentRequestFormValues = {
  title: '',
  description: '',
  amount: '',
  currency_code: '',
}
const paymentRequestFieldNames = new Set<keyof CreatePaymentRequestFormValues>([
  'title',
  'description',
  'amount',
  'currency_code',
])

export function NewPaymentRequestPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const currencies = useCurrencies()
  const currentUser = useCurrentUser()
  const createPaymentRequest = useCreatePaymentRequest()
  const schema = useMemo(() => createPaymentRequestSchema(t), [t])
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<CreatePaymentRequestFormValues>({
    defaultValues,
    resolver: zodResolver(schema),
  })
  const selectedCurrencyCode = useWatch({ control, name: 'currency_code' })
  const exchangeRatePreview = useExchangeRatePreview(selectedCurrencyCode)
  const currencyOptions = useMemo(
    () =>
      [...(currencies.data ?? [])]
        .sort((left, right) =>
          `${left.code} ${left.name}`.localeCompare(`${right.code} ${right.name}`),
        )
        .map((currency) => ({
          label: `${currency.code} - ${currency.name}`,
          value: currency.code,
        })),
    [currencies.data],
  )

  useEffect(() => {
    const preferredCurrencyCode = currentUser.data?.preferred_currency.code

    if (!preferredCurrencyCode || selectedCurrencyCode) {
      return
    }

    const preferredCurrencyExists = currencies.data?.some(
      (currency) => currency.code === preferredCurrencyCode,
    )

    if (preferredCurrencyExists) {
      setValue('currency_code', preferredCurrencyCode, {
        shouldDirty: false,
        shouldValidate: true,
      })
    }
  }, [currencies.data, currentUser.data?.preferred_currency.code, selectedCurrencyCode, setValue])

  function submitPaymentRequest(values: CreatePaymentRequestFormValues) {
    createPaymentRequest.mutate(
      {
        ...values,
        description: values.description.length > 0 ? values.description : null,
      },
      {
        onSuccess(paymentRequest) {
          navigate(`/dashboard/payment-requests/${paymentRequest.id}`)
        },
        onError(error) {
          if (error instanceof ApiError && error.kind === 'validation') {
            applyServerValidationErrors(error.validationErrors)
            return
          }

          setError('root', {
            message:
              error instanceof ApiError && error.kind === 'serviceUnavailable'
                ? t('paymentRequests.form.errors.exchangeProviderUnavailable')
                : t('paymentRequests.form.errors.generic'),
          })
        },
      },
    )
  }

  function applyServerValidationErrors(validationErrors: ApiError['validationErrors']) {
    if (!validationErrors) {
      setError('root', {
        message: t('paymentRequests.form.errors.generic'),
      })
      return
    }

    Object.entries(validationErrors).forEach(([field, messages]) => {
      const message = messages[0] ?? t('paymentRequests.form.errors.generic')

      if (!paymentRequestFieldNames.has(field as keyof CreatePaymentRequestFormValues)) {
        setError('root', { message })
        return
      }

      setError(field as keyof CreatePaymentRequestFormValues, { message })
    })
  }

  return (
    <section className="grid gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1268b3]">
          {t('newPaymentRequest.eyebrow')}
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#172033]">
          {t('newPaymentRequest.title')}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#526076]">
          {t('newPaymentRequest.description')}
        </p>
      </div>

      <form
        className="grid gap-5 rounded-lg border border-[#dfe5ef] bg-white p-6 shadow-sm"
        noValidate
        onSubmit={handleSubmit(submitPaymentRequest)}
      >
        {currencies.isError ? (
          <div className="flex gap-3 rounded-lg border border-[#fecdca] bg-[#fffbfa] p-3 text-sm font-medium text-[#b42318]">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            {t('paymentRequests.form.errors.currencies')}
          </div>
        ) : null}

        {errors.root?.message ? (
          <div className="flex gap-3 rounded-lg border border-[#fecdca] bg-[#fffbfa] p-3 text-sm font-medium text-[#b42318]">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            {errors.root.message}
          </div>
        ) : null}

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-[#172033]" htmlFor="title">
            {t('paymentRequests.form.fields.title')}
          </label>
          <TextInput
            aria-describedby="title-error"
            aria-invalid={Boolean(errors.title)}
            id="title"
            type="text"
            {...register('title')}
          />
          <FieldError id="title-error" message={errors.title?.message} />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-[#172033]" htmlFor="description">
            {t('paymentRequests.form.fields.description')}
          </label>
          <textarea
            aria-describedby="description-error"
            aria-invalid={Boolean(errors.description)}
            className="min-h-28 w-full min-w-0 rounded-lg border border-[#cfd8e6] px-3 py-2 text-sm outline-none focus:border-[#1268b3] focus:ring-4 focus:ring-[#d9ecfb]"
            id="description"
            {...register('description')}
          />
          <FieldError id="description-error" message={errors.description?.message} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-x-6">
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-[#172033]" htmlFor="amount">
              {t('paymentRequests.form.fields.amount')}
            </label>
            <Controller
              control={control}
              name="amount"
              render={({ field }) => (
                <AmountInput
                  id="amount"
                  invalid={Boolean(errors.amount)}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            <FieldError id="amount-error" message={errors.amount?.message} />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-[#172033]" htmlFor="currency_code">
              {t('paymentRequests.form.fields.currency')}
            </label>
            <Controller
              control={control}
              name="currency_code"
              render={({ field }) => (
                <AutocompleteField
                  disabled={currencies.isLoading}
                  id="currency_code"
                  invalid={Boolean(errors.currency_code)}
                  noResultsText={t('common.noResults')}
                  onChange={field.onChange}
                  options={currencyOptions}
                  placeholder={t('paymentRequests.form.placeholders.currency')}
                  value={field.value}
                />
              )}
            />
            <FieldError id="currency-code-error" message={errors.currency_code?.message} />
          </div>
        </div>

        {selectedCurrencyCode ? (
          <section className="rounded-lg border border-[#dfe5ef] bg-[#f8fafc] p-4">
            <p className="text-sm font-semibold text-[#172033]">
              {t('paymentRequests.form.exchangePreview.title')}
            </p>
            {exchangeRatePreview.isLoading ? (
              <p className="mt-2 text-sm text-[#526076]">
                {t('paymentRequests.form.exchangePreview.loading')}
              </p>
            ) : null}
            {exchangeRatePreview.isError ? (
              <p className="mt-2 text-sm font-medium text-[#b42318]">
                {t('paymentRequests.form.exchangePreview.error')}
              </p>
            ) : null}
            {exchangeRatePreview.data ? (
              <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-[0.08em] text-[#657189]">
                    {t('paymentRequests.form.exchangePreview.rate')}
                  </dt>
                  <dd className="mt-1 font-semibold text-[#172033]">
                    1 {exchangeRatePreview.data.base_currency_code} ={' '}
                    {exchangeRatePreview.data.eur_exchange_rate}{' '}
                    {exchangeRatePreview.data.local_currency_code}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-[0.08em] text-[#657189]">
                    {t('paymentRequests.form.exchangePreview.source')}
                  </dt>
                  <dd className="mt-1 font-semibold text-[#172033]">
                    {exchangeRatePreview.data.source}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-[0.08em] text-[#657189]">
                    {t('paymentRequests.form.exchangePreview.fetchedAt')}
                  </dt>
                  <dd className="mt-1 font-semibold text-[#172033]">
                    {formatDateTime(exchangeRatePreview.data.fetched_at)}
                  </dd>
                </div>
              </dl>
            ) : null}
            <p className="mt-3 text-xs leading-5 text-[#657189]">
              {t('paymentRequests.form.exchangePreview.disclaimer')}
            </p>
          </section>
        ) : null}

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#dfe5ef] pt-5">
          <Button
            onClick={() => navigate('/dashboard/payment-requests')}
            type="button"
            variant="secondary"
          >
            {t('paymentRequests.form.actions.cancel')}
          </Button>
          <Button disabled={currencies.isLoading || createPaymentRequest.isPending} type="submit">
            {createPaymentRequest.isPending
              ? t('paymentRequests.form.actions.creating')
              : t('paymentRequests.form.actions.create')}
          </Button>
        </div>
      </form>
    </section>
  )
}
