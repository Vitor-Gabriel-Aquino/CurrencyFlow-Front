import type { ReactNode } from 'react'
import { Navigate } from 'react-router'

import { useCurrentUser } from '@/presentation/hooks/useAuth'

type FinanceRouteProps = {
  children: ReactNode
}

export function FinanceRoute({ children }: FinanceRouteProps) {
  const currentUser = useCurrentUser()

  if (currentUser.data?.role !== 'finance') {
    return <Navigate replace to="/dashboard" />
  }

  return children
}
