import {
  BadgeEuro,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Scale,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NavLink, Outlet, useNavigate } from 'react-router'

import type { User } from '@/domain'
import { useCurrentUser, useLogout } from '@/presentation/hooks/useAuth'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/utils/cn'

type NavigationItem = {
  icon: typeof LayoutDashboard
  labelKey: string
  path: string
  financeOnly?: boolean
}

const navigationItems: NavigationItem[] = [
  {
    icon: LayoutDashboard,
    labelKey: 'appShell.navigation.dashboard',
    path: '/dashboard',
  },
  {
    icon: ClipboardList,
    labelKey: 'appShell.navigation.paymentRequests',
    path: '/dashboard/payment-requests',
  },
  {
    icon: PlusCircle,
    labelKey: 'appShell.navigation.newPaymentRequest',
    path: '/dashboard/payment-requests/new',
  },
  {
    icon: Scale,
    labelKey: 'appShell.navigation.financeReview',
    path: '/dashboard/finance-review',
    financeOnly: true,
  },
]

export function AppShell() {
  const currentUser = useCurrentUser()
  const logout = useLogout()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const user = currentUser.data
  const visibleNavigationItems = navigationItems.filter(
    (item) => !item.financeOnly || user?.role === 'finance',
  )

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-[#172033]">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl lg:grid-cols-[17rem_1fr]">
        <aside className="border-b border-[#dfe5ef] bg-white px-6 py-5 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#1268b3] text-sm font-bold text-white">
              CF
            </div>
            <div>
              <p className="text-sm font-semibold">CurrencyFlow</p>
              <p className="text-xs text-[#657189]">{t('appShell.brandSubtitle')}</p>
            </div>
          </div>

          <nav aria-label={t('appShell.navigation.label')} className="mt-7 grid gap-1">
            {visibleNavigationItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    'flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-[#526076] transition-colors hover:bg-[#eef4fb] hover:text-[#172033]',
                    isActive && 'bg-[#e9f2fb] text-[#1268b3]',
                  )
                }
                end
                key={item.path}
                to={item.path}
              >
                <item.icon className="size-4" />
                {t(item.labelKey)}
              </NavLink>
            ))}
          </nav>
        </aside>

        <section className="flex min-w-0 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfe5ef] bg-white px-6 py-4">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#657189]">
                {t('appShell.signedInAs')}
              </p>
              <h1 className="mt-1 truncate text-lg font-semibold">{user?.name}</h1>
              <p className="truncate text-sm text-[#657189]">{user?.email}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {user ? <UserRoleBadge user={user} /> : null}
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
                {t('appShell.signOut')}
              </Button>
            </div>
          </header>

          <div className="min-w-0 flex-1 px-6 py-6">
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  )
}

function UserRoleBadge({ user }: { user: User }) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-2 rounded-lg border border-[#dfe5ef] bg-[#f8fafc] px-3 py-2">
      <BadgeEuro className="size-4 text-[#1268b3]" />
      <span className="text-sm font-semibold capitalize">
        {t(`appShell.roles.${user.role}`)}
      </span>
    </div>
  )
}
