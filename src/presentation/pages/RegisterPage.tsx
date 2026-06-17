import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { createRegisterUserSchema, type RegisterUserFormValues } from '@/application'
import { ApiError } from '@/infrastructure'
import { useCountries, useCurrencies, useRegisterUser } from '@/presentation/hooks/useRegistration'
import { Button } from '@/shared/ui/button'
import { FieldError } from '@/shared/ui/field-error'
import { PasswordInput } from '@/shared/ui/password-input'
import { SelectField } from '@/shared/ui/select-field'
import { TextInput } from '@/shared/ui/text-input'

const defaultRegisterValues: RegisterUserFormValues = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  country_code: '',
  preferred_currency_code: '',
}
const registerFieldNames = new Set<keyof RegisterUserFormValues>([
  'name',
  'email',
  'password',
  'password_confirmation',
  'country_code',
  'preferred_currency_code',
])

export function RegisterPage() {
  const countries = useCountries()
  const currencies = useCurrencies()
  const registerUser = useRegisterUser()
  const { t } = useTranslation()
  const schema = useMemo(() => createRegisterUserSchema(t), [t])
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<RegisterUserFormValues>({
    defaultValues: defaultRegisterValues,
    resolver: zodResolver(schema),
  })

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

  function submitRegistration(values: RegisterUserFormValues) {
    registerUser.mutate(values, {
      onError(error) {
        if (error instanceof ApiError && error.kind === 'validation') {
          applyServerValidationErrors(error.validationErrors)
          return
        }

        setError('root', {
          message: t('auth.register.error'),
        })
      },
    })
  }

  function applyServerValidationErrors(validationErrors: ApiError['validationErrors']) {
    if (!validationErrors) {
      setError('root', {
        message: t('auth.register.error'),
      })
      return
    }

    Object.entries(validationErrors).forEach(([field, messages]) => {
      const message = messages[0] ?? t('auth.register.error')

      if (!registerFieldNames.has(field as keyof RegisterUserFormValues)) {
        setError('root', {
          message,
        })
        return
      }

      setError(field as keyof RegisterUserFormValues, {
        message,
      })
    })
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
              <form className="grid gap-5" noValidate onSubmit={handleSubmit(submitRegistration)}>
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

                {errors.root?.message ? (
                  <p className="rounded-lg border border-[#fecdca] bg-[#fffbfa] p-3 text-sm font-medium text-[#b42318]">
                    {errors.root.message}
                  </p>
                ) : null}

                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-[#172033]" htmlFor="name">
                    {t('auth.register.fields.name')}
                  </label>
                  <TextInput
                    aria-describedby="name-error"
                    aria-invalid={Boolean(errors.name)}
                    id="name"
                    type="text"
                    {...register('name')}
                  />
                  <FieldError id="name-error" message={errors.name?.message} />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-[#172033]" htmlFor="email">
                    {t('auth.register.fields.email')}
                  </label>
                  <TextInput
                    aria-describedby="email-error"
                    aria-invalid={Boolean(errors.email)}
                    id="email"
                    type="email"
                    {...register('email')}
                  />
                  <FieldError id="email-error" message={errors.email?.message} />
                </div>

                <div className="grid gap-4 md:grid-cols-2 md:gap-x-6">
                  <div className="grid gap-2">
                    <label className="text-sm font-semibold text-[#172033]" htmlFor="password">
                      {t('auth.register.fields.password')}
                    </label>
                    <PasswordInput
                      aria-describedby="password-error"
                      aria-invalid={Boolean(errors.password)}
                      id="password"
                      toggleLabel={t('auth.register.actions.togglePassword')}
                      {...register('password')}
                    />
                    <FieldError id="password-error" message={errors.password?.message} />
                  </div>

                  <div className="grid gap-2">
                    <label
                      className="text-sm font-semibold text-[#172033]"
                      htmlFor="password_confirmation"
                    >
                      {t('auth.register.fields.passwordConfirmation')}
                    </label>
                    <PasswordInput
                      aria-describedby="password-confirmation-error"
                      aria-invalid={Boolean(errors.password_confirmation)}
                      id="password_confirmation"
                      toggleLabel={t('auth.register.actions.togglePasswordConfirmation')}
                      {...register('password_confirmation')}
                    />
                    <FieldError
                      id="password-confirmation-error"
                      message={errors.password_confirmation?.message}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 md:gap-x-6">
                  <div className="grid gap-2">
                    <label className="text-sm font-semibold text-[#172033]" htmlFor="country_code">
                      {t('auth.register.fields.country')}
                    </label>
                    <SelectField
                      aria-describedby="country-code-error"
                      aria-invalid={Boolean(errors.country_code)}
                      disabled={referenceDataIsLoading}
                      id="country_code"
                      {...register('country_code')}
                    >
                      <option value="">{t('auth.register.placeholders.country')}</option>
                      {countryOptions.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name} ({country.code})
                        </option>
                      ))}
                    </SelectField>
                    <FieldError id="country-code-error" message={errors.country_code?.message} />
                  </div>

                  <div className="grid gap-2">
                    <label
                      className="text-sm font-semibold text-[#172033]"
                      htmlFor="preferred_currency_code"
                    >
                      {t('auth.register.fields.preferredCurrency')}
                    </label>
                    <SelectField
                      aria-describedby="preferred-currency-code-error"
                      aria-invalid={Boolean(errors.preferred_currency_code)}
                      disabled={referenceDataIsLoading}
                      id="preferred_currency_code"
                      {...register('preferred_currency_code')}
                    >
                      <option value="">{t('auth.register.placeholders.preferredCurrency')}</option>
                      {currencyOptions.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </option>
                      ))}
                    </SelectField>
                    <FieldError
                      id="preferred-currency-code-error"
                      message={errors.preferred_currency_code?.message}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <Link className="text-sm font-semibold text-[#1268b3]" to="/login">
                    {t('auth.register.alreadyHaveAccount')}
                  </Link>
                  <Button disabled={referenceDataIsLoading || registerUser.isPending} type="submit">
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
