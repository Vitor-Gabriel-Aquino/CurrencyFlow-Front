import { createBrowserRouter } from 'react-router'

import { AuthCallbackPage } from '@/presentation/pages/AuthCallbackPage'
import { DashboardPage } from '@/presentation/pages/DashboardPage'
import { HomePage } from '@/presentation/pages/HomePage'
import { LoginPage } from '@/presentation/pages/LoginPage'
import { ProtectedRoute } from '@/presentation/routes/ProtectedRoute'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/auth/callback',
    element: <AuthCallbackPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
])
