import { Clock3, Globe2, UserRound } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useCurrentUser } from '@/presentation/hooks/useAuth'

export function DashboardPage() {
  const currentUser = useCurrentUser()
  const user = currentUser.data
  const { t } = useTranslation()

  return (
    <div className="grid gap-6">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1268b3]">
          {t('dashboard.eyebrow')}
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#172033]">
          {t('dashboard.title')}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#526076]">
          {t('dashboard.description')}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <AccountSummaryCard
          label={t('dashboard.role')}
          title={user ? t(`appShell.roles.${user.role}`) : '-'}
          icon={UserRound}
        />
        <AccountSummaryCard
          label={t('dashboard.country')}
          title={user ? `${user.country.name} (${user.country.code})` : '-'}
          icon={Globe2}
        />
        <AccountSummaryCard
          label={t('dashboard.preferredCurrency')}
          title={
            user
              ? `${user.preferred_currency.name} (${user.preferred_currency.code})`
              : '-'
          }
          icon={Clock3}
        />
      </section>

      <section className="rounded-lg border border-[#dfe5ef] bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-[#172033]">
              {t('dashboard.reviewWindow.title')}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#526076]">
              {t('dashboard.reviewWindow.description')}
            </p>
          </div>
          <div className="rounded-lg bg-[#e9f2fb] px-4 py-3 text-right">
            <p className="text-2xl font-semibold text-[#1268b3]">48h</p>
            <p className="text-xs font-medium uppercase text-[#526076]">
              {t('dashboard.reviewWindow.metric')}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

type AccountSummaryCardProps = {
  icon: typeof UserRound
  label: string
  title: string
}

function AccountSummaryCard({ icon: Icon, label, title }: AccountSummaryCardProps) {
  return (
    <article className="rounded-lg border border-[#dfe5ef] bg-white p-5 shadow-sm">
      <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-[#e9f2fb] text-[#1268b3]">
        <Icon className="size-5" />
      </div>
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#657189]">
        {label}
      </p>
      <h3 className="mt-2 text-base font-semibold text-[#172033]">{title}</h3>
    </article>
  )
}
