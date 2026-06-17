import { ArrowRight, BadgeEuro, Clock3, ShieldCheck, Workflow } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Button } from '@/shared/ui/button'
import { LanguageSwitcher } from '@/shared/ui/language-switcher'

const capabilities = [
  {
    descriptionKey: 'home.capabilities.oauth.description',
    icon: ShieldCheck,
    titleKey: 'home.capabilities.oauth.title',
  },
  {
    descriptionKey: 'home.capabilities.paymentRequests.description',
    icon: BadgeEuro,
    titleKey: 'home.capabilities.paymentRequests.title',
  },
  {
    descriptionKey: 'home.capabilities.financeReview.description',
    icon: Workflow,
    titleKey: 'home.capabilities.financeReview.title',
  },
]

const metrics = [
  { labelKey: 'home.metrics.currencies.label', valueKey: 'home.metrics.currencies.value' },
  { labelKey: 'home.metrics.reviewWindow.label', valueKey: 'home.metrics.reviewWindow.value' },
  { labelKey: 'home.metrics.rateSource.label', valueKey: 'home.metrics.rateSource.value' },
]

export function HomePage() {
  const { t } = useTranslation()

  return (
    <main className="min-h-screen bg-[#f7f8fb]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfe5ef] pb-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#1268b3] text-sm font-bold text-white">
              CF
            </div>
            <div>
              <p className="text-sm font-semibold text-[#172033]">CurrencyFlow</p>
              <p className="text-xs text-[#657189]">{t('home.brandSubtitle')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button asChild type="button" variant="secondary">
              <Link to="/login">{t('home.signIn')}</Link>
            </Button>
          </div>
        </header>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#1268b3]">
              {t('home.eyebrow')}
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[#172033] md:text-5xl">
              {t('home.title')}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#526076]">
              {t('home.description')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild type="button">
                <Link to="/login">
                  {t('home.signIn')}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild type="button" variant="secondary">
                <Link to="/register">{t('home.createAccount')}</Link>
              </Button>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {metrics.map((metric) => (
                <div
                  className="rounded-lg border border-[#dfe5ef] bg-white p-4"
                  key={metric.labelKey}
                >
                  <p className="text-2xl font-semibold text-[#172033]">{t(metric.valueKey)}</p>
                  <p className="mt-1 text-xs font-medium text-[#657189]">{t(metric.labelKey)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {capabilities.map((item) => (
              <article
                className="rounded-lg border border-[#dfe5ef] bg-white p-5 shadow-sm"
                key={item.titleKey}
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-[#e9f2fb] text-[#1268b3]">
                  <item.icon className="size-5" />
                </div>
                <h2 className="text-lg font-semibold text-[#172033]">{t(item.titleKey)}</h2>
                <p className="mt-2 text-sm leading-6 text-[#657189]">{t(item.descriptionKey)}</p>
              </article>
            ))}

            <article className="rounded-lg border border-[#dfe5ef] bg-[#172033] p-5 text-white shadow-sm">
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-white/10 text-white">
                <Clock3 className="size-5" />
              </div>
              <h2 className="text-lg font-semibold">{t('home.capabilities.expiration.title')}</h2>
              <p className="mt-2 text-sm leading-6 text-white/70">
                {t('home.capabilities.expiration.description')}
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
