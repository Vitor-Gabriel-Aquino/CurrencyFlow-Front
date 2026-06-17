import { LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { useCurrentUser, useLogout } from '@/presentation/hooks/useAuth'
import { Button } from '@/shared/ui/button'

export function DashboardPage() {
  const currentUser = useCurrentUser()
  const logout = useLogout()
  const navigate = useNavigate()
  const user = currentUser.data
  const { t } = useTranslation()

  return (
    <main className="min-h-screen bg-[#f7f8fb]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8">
        <header className="flex items-center justify-between border-b border-[#dfe5ef] pb-5">
          <div>
            <p className="text-sm font-semibold text-[#172033]">CurrencyFlow</p>
            <p className="text-xs text-[#657189]">{t('dashboard.subtitle')}</p>
          </div>

          <Button
            disabled={logout.isPending}
            onClick={() => {
              logout.mutate(undefined, {
                onSettled: () => navigate('/', { replace: true }),
              })
            }}
            type="button"
            variant="secondary"
          >
            <LogOut className="size-4" />
            {t('dashboard.signOut')}
          </Button>
        </header>

        <div className="grid flex-1 items-center gap-6 py-10">
          <section className="rounded-lg border border-[#dfe5ef] bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-[#657189]">{t('dashboard.signedInAs')}</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#172033]">{user?.name}</h1>
            <p className="mt-1 text-sm text-[#526076]">{user?.email}</p>

            <dl className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-[#dfe5ef] p-4">
                <dt className="text-xs font-medium uppercase text-[#657189]">
                  {t('dashboard.role')}
                </dt>
                <dd className="mt-2 text-sm font-semibold capitalize text-[#172033]">
                  {user?.role}
                </dd>
              </div>
              <div className="rounded-lg border border-[#dfe5ef] p-4">
                <dt className="text-xs font-medium uppercase text-[#657189]">
                  {t('dashboard.country')}
                </dt>
                <dd className="mt-2 text-sm font-semibold text-[#172033]">
                  {user?.country.name} ({user?.country.code})
                </dd>
              </div>
              <div className="rounded-lg border border-[#dfe5ef] p-4">
                <dt className="text-xs font-medium uppercase text-[#657189]">
                  {t('dashboard.preferredCurrency')}
                </dt>
                <dd className="mt-2 text-sm font-semibold text-[#172033]">
                  {user?.preferred_currency.name} ({user?.preferred_currency.code})
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </section>
    </main>
  )
}
