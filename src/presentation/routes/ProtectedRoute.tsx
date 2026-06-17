import { useEffect, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useLocation } from 'react-router'

import {
  sessionAuthTokenStorage,
  sessionLoginPromptStorage,
  sessionPkceStorage,
} from '@/infrastructure'
import { hasStoredAccessToken, useCurrentUser } from '@/presentation/hooks/useAuth'

type ProtectedRouteProps = {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation()
  const currentUser = useCurrentUser()
  const { t } = useTranslation()

  useEffect(() => {
    if (!currentUser.isError) {
      return
    }

    sessionAuthTokenStorage.clear()
    sessionPkceStorage.clear()
    sessionLoginPromptStorage.requestForcedLogin()
  }, [currentUser.isError])

  if (!hasStoredAccessToken()) {
    return <Navigate replace state={{ from: location }} to="/login" />
  }

  if (currentUser.isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f8fb] text-[#172033]">
        <p className="text-sm font-medium">{t('auth.loadingWorkspace')}</p>
      </main>
    )
  }

  if (currentUser.isError) {
    return <Navigate replace state={{ from: location }} to="/login" />
  }

  return children
}
