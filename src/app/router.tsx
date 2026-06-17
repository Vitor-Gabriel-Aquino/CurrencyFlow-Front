import { createBrowserRouter } from 'react-router'

import { AppShell } from '@/presentation/layouts/AppShell'
import { AuthCallbackPage } from '@/presentation/pages/AuthCallbackPage'
import { DashboardPage } from '@/presentation/pages/DashboardPage'
import { FinanceReviewPage } from '@/presentation/pages/FinanceReviewPage'
import { HomePage } from '@/presentation/pages/HomePage'
import { LoginPage } from '@/presentation/pages/LoginPage'
import { NewPaymentRequestPage } from '@/presentation/pages/NewPaymentRequestPage'
import { PaymentRequestDetailPage } from '@/presentation/pages/PaymentRequestDetailPage'
import { PaymentRequestsPage } from '@/presentation/pages/PaymentRequestsPage'
import { FinanceRoute } from '@/presentation/routes/FinanceRoute'
import { RegisterPage } from '@/presentation/pages/RegisterPage'
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
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/auth/callback',
    element: <AuthCallbackPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'payment-requests',
        element: <PaymentRequestsPage />,
      },
      {
        path: 'payment-requests/new',
        element: <NewPaymentRequestPage />,
      },
      {
        path: 'payment-requests/:paymentRequestId',
        element: <PaymentRequestDetailPage />,
      },
      {
        path: 'finance-review',
        element: (
          <FinanceRoute>
            <FinanceReviewPage />
          </FinanceRoute>
        ),
      },
    ],
  },
])
