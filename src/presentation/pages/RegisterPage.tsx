import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { Eye, EyeOff } from 'lucide-react'

import { ApiError } from '@/infrastructure'
import { useCountries, useCurrencies, useRegisterUser } from '@/presentation/hooks/useRegistration'
import { Button } from '@/shared/ui/button'

type RegistrationFormErrors = Record<string, string[]>

const defaultFormErrors: RegistrationFormErrors = {}

export function RegisterPage() {
  const countries = useCountries()
  const currencies = useCurrencies()
  const registerUser = useRegisterUser()
  const [formErrors, setFormErrors] = useState<RegistrationFormErrors>(defaultFormErrors)
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)
  const [passwordConfirmationIsVisible, setPasswordConfirmationIsVisible] = useState(false)
  const { t } = useTranslation()

  const countryOptions = useMemo(
    () => [...(countries.data ?? [])].sort((left, right) => left.name.localeCompare(right.name)),
    [countries.data],
  )
  const currencyOptions = useMemo(
    () =>
      [...(currencies.data ?? [])].sort((left, right) =>
        `${left.code} ${left.name}`.localeCompare(`${right.code} ${right.name}`),
      ),
    [currencies.data],
  )

  const referenceDataIsLoading = countries.isLoading || currencies.isLoading
  const referenceDataFailed = countries.isError || currencies.isError
  const registrationSucceeded = registerUser.isSuccess

  function fieldError(field: string): string | undefined {
    return formErrors[field]?.[0]
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const password = String(formData.get('password') ?? '')
    const passwordConfirmation = String(formData.get('password_confirmation') ?? '')
    const countryCode = String(formData.get('country_code') ?? '')
    const preferredCurrencyCode = String(formData.get('preferred_currency_code') ?? '')
    const validationErrors = validateRegistrationForm({
      countryCode,
      email,
      name,
      password,
      passwordConfirmation,
      preferredCurrencyCode,
      t,
    })

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors)
      return
    }

    setFormErrors(defaultFormErrors)
    registerUser.mutate(
      {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        country_code: countryCode,
        preferred_currency_code: preferredCurrencyCode,
      },
      {
        onError(error) {
          if (error instanceof ApiError && error.kind === 'validation') {
            setFormErrors(error.validationErrors ?? defaultFormErrors)
            return
          }

          setFormErrors({
            form: [t('auth.register.error')],
          })
        },
      },
    )
  }

  return (
    <main className="min-h-screen bg-[#f7f8fb] px-6 py-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-lg border border-[#dfe5ef] bg-white shadow-sm lg:grid-cols-[0.75fr_1fr]">
          <aside className="bg-[#172033] p-8 text-white">
            <div className="flex size-11 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">
              CF
            </div>
            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.16em] text-[#8fc7f5]">
              {t('auth.register.eyebrow')}
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight">
              {t('auth.register.title')}
            </h1>
            <p className="mt-4 text-sm leading-6 text-white/70">
              {t('auth.register.description')}
            </p>
          </aside>

          <section className="p-8">
            {registrationSucceeded ? (
              <div className="flex min-h-[30rem] flex-col justify-center">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1268b3]">
                  {t('auth.register.successEyebrow')}
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-[#172033]">
                  {t('auth.register.successTitle')}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#526076]">
                  {t('auth.register.successDescription')}
                </p>
                <Button asChild className="mt-8 w-fit" type="button">
                  <Link to="/login">{t('auth.register.goToLogin')}</Link>
                </Button>
              </div>
            ) : (
              <form className="grid gap-5" noValidate onSubmit={handleSubmit}>
                <div>
                  <h2 className="text-2xl font-semibold text-[#172033]">
                    {t('auth.register.formTitle')}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#526076]">
                    {t('auth.register.formDescription')}
                  </p>
                </div>

                {referenceDataFailed ? (
                  <p className="rounded-lg border border-[#fecdca] bg-[#fffbfa] p-3 text-sm font-medium text-[#b42318]">
                    {t('auth.register.referenceDataError')}
                  </p>
                ) : null}

                {fieldError('form') ? (
                  <p className="rounded-lg border border-[#fecdca] bg-[#fffbfa] p-3 text-sm font-medium text-[#b42318]">
                    {fieldError('form')}
                  </p>
                ) : null}

                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-[#172033]" htmlFor="name">
                    {t('auth.register.fields.name')}
                  </label>
                  <input
                    className="min-h-11 rounded-lg border border-[#cfd8e6] px-3 text-sm outline-none focus:border-[#1268b3] focus:ring-4 focus:ring-[#d9ecfb]"
                    id="name"
                    name="name"
                    required
                    type="text"
                  />
                  <FieldError message={fieldError('name')} />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-[#172033]" htmlFor="email">
                    {t('auth.register.fields.email')}
                  </label>
                  <input
                    className="min-h-11 rounded-lg border border-[#cfd8e6] px-3 text-sm outline-none focus:border-[#1268b3] focus:ring-4 focus:ring-[#d9ecfb]"
                    id="email"
                    name="email"
                    required
                    type="email"
                  />
                  <FieldError message={fieldError('email')} />
                </div>

                <div className="grid gap-4 md:grid-cols-2 md:gap-x-6">
                  <div className="grid gap-2">
                    <label className="text-sm font-semibold text-[#172033]" htmlFor="password">
                      {t('auth.register.fields.password')}
                    </label>
                    <PasswordInput
                      id="password"
                      isVisible={passwordIsVisible}
                      label={t('auth.register.actions.togglePassword')}
                      name="password"
                      onToggle={() => setPasswordIsVisible((current) => !current)}
                    />
                    <FieldError message={fieldError('password')} />
                  </div>

                  <div className="grid gap-2">
                    <label
                      className="text-sm font-semibold text-[#172033]"
                      htmlFor="password_confirmation"
                    >
                      {t('auth.register.fields.passwordConfirmation')}
                    </label>
                    <PasswordInput
                      id="password_confirmation"
                      isVisible={passwordConfirmationIsVisible}
                      label={t('auth.register.actions.togglePasswordConfirmation')}
                      name="password_confirmation"
                      onToggle={() => setPasswordConfirmationIsVisible((current) => !current)}
                    />
                    <FieldError message={fieldError('password_confirmation')} />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 md:gap-x-6">
                  <div className="grid gap-2">
                    <label className="text-sm font-semibold text-[#172033]" htmlFor="country_code">
                      {t('auth.register.fields.country')}
                    </label>
                    <select
                      className="min-h-11 w-full min-w-0 rounded-lg border border-[#cfd8e6] bg-white px-3 text-sm outline-none focus:border-[#1268b3] focus:ring-4 focus:ring-[#d9ecfb]"
                      disabled={referenceDataIsLoading}
                      id="country_code"
                      name="country_code"
                      required
                    >
                      <option value="">{t('auth.register.placeholders.country')}</option>
                      {countryOptions.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name} ({country.code})
                        </option>
                      ))}
                    </select>
                    <FieldError message={fieldError('country_code')} />
                  </div>

                  <div className="grid gap-2">
                    <label
                      className="text-sm font-semibold text-[#172033]"
                      htmlFor="preferred_currency_code"
                    >
                      {t('auth.register.fields.preferredCurrency')}
                    </label>
                    <select
                      className="min-h-11 w-full min-w-0 rounded-lg border border-[#cfd8e6] bg-white px-3 text-sm outline-none focus:border-[#1268b3] focus:ring-4 focus:ring-[#d9ecfb]"
                      disabled={referenceDataIsLoading}
                      id="preferred_currency_code"
                      name="preferred_currency_code"
                      required
                    >
                      <option value="">{t('auth.register.placeholders.preferredCurrency')}</option>
                      {currencyOptions.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </option>
                      ))}
                    </select>
                    <FieldError message={fieldError('preferred_currency_code')} />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <Link className="text-sm font-semibold text-[#1268b3]" to="/login">
                    {t('auth.register.alreadyHaveAccount')}
                  </Link>
                  <Button
                    disabled={referenceDataIsLoading || registerUser.isPending}
                    type="submit"
                  >
                    {registerUser.isPending
                      ? t('auth.register.pending')
                      : t('auth.register.submit')}
                  </Button>
                </div>
              </form>
            )}
          </section>
        </div>
      </section>
    </main>
  )
}

function PasswordInput({
  id,
  isVisible,
  label,
  name,
  onToggle,
}: {
  id: string
  isVisible: boolean
  label: string
  name: string
  onToggle(): void
}) {
  const Icon = isVisible ? EyeOff : Eye

  return (
    <div className="relative min-w-0">
      <input
        className="min-h-11 w-full min-w-0 rounded-lg border border-[#cfd8e6] px-3 pr-11 text-sm outline-none focus:border-[#1268b3] focus:ring-4 focus:ring-[#d9ecfb]"
        id={id}
        minLength={8}
        name={name}
        required
        type={isVisible ? 'text' : 'password'}
      />
      <button
        aria-label={label}
        className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-[#526076] hover:bg-[#f2f5f9] hover:text-[#172033] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1268b3]"
        onClick={onToggle}
        type="button"
      >
        <Icon className="size-4" />
      </button>
    </div>
  )
}

function FieldError({ message }: { message?: string }) {
  return (
    <p
      aria-live="polite"
      className="min-h-10 text-sm font-medium leading-5 text-[#b42318]"
    >
      {message ?? ''}
    </p>
  )
}

function validateRegistrationForm({
  countryCode,
  email,
  name,
  password,
  passwordConfirmation,
  preferredCurrencyCode,
  t,
}: {
  countryCode: string
  email: string
  name: string
  password: string
  passwordConfirmation: string
  preferredCurrencyCode: string
  t(key: string): string
}): RegistrationFormErrors {
  const errors: RegistrationFormErrors = {}

  if (!name) {
    errors.name = [t('auth.register.validation.required')]
  }

  if (!email) {
    errors.email = [t('auth.register.validation.required')]
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = [t('auth.register.validation.email')]
  }

  if (!password) {
    errors.password = [t('auth.register.validation.required')]
  } else if (password.length < 8) {
    errors.password = [t('auth.register.validation.passwordMin')]
  }

  if (!passwordConfirmation) {
    errors.password_confirmation = [t('auth.register.validation.required')]
  } else if (password !== passwordConfirmation) {
    errors.password_confirmation = [t('auth.register.validation.passwordConfirmation')]
  }

  if (!countryCode) {
    errors.country_code = [t('auth.register.validation.required')]
  }

  if (!preferredCurrencyCode) {
    errors.preferred_currency_code = [t('auth.register.validation.required')]
  }

  return errors
}
