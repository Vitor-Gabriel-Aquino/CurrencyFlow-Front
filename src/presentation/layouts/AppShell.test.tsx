import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'

import { AppShell } from './AppShell'

const authMocks = vi.hoisted(() => ({
  currentUser: {
    data: {
      id: 'user-id',
      name: 'Marta Kowalska',
      email: 'marta.kowalska@example.com',
      role: 'finance',
      country: {
        code: 'PL',
        name: 'Poland',
      },
      preferred_currency: {
        code: 'PLN',
        name: 'Polish Zloty',
        exponent: 2,
      },
    },
  },
  logoutMutate: vi.fn(),
}))

vi.mock('@/presentation/hooks/useAuth', () => ({
  useCurrentUser: () => authMocks.currentUser,
  useLogout: () => ({
    isPending: false,
    mutate: authMocks.logoutMutate,
  }),
}))

describe('AppShell', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the authenticated workspace navigation for finance users', () => {
    authMocks.currentUser.data.role = 'finance'

    renderAppShell()

    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute(
      'href',
      '/dashboard',
    )
    expect(screen.getByRole('link', { name: /payment requests/i })).toHaveAttribute(
      'href',
      '/dashboard/payment-requests',
    )
    expect(screen.getByRole('link', { name: /new payment request/i })).toHaveAttribute(
      'href',
      '/dashboard/payment-requests/new',
    )
    expect(screen.getByRole('link', { name: /finance review/i })).toHaveAttribute(
      'href',
      '/dashboard/finance-review',
    )
    expect(screen.getByText('Marta Kowalska')).toBeInTheDocument()
    expect(screen.getByText('Finance')).toBeInTheDocument()
  })

  it('hides finance navigation for employee users', () => {
    authMocks.currentUser.data.role = 'employee'

    renderAppShell()

    expect(screen.queryByRole('link', { name: /finance review/i })).not.toBeInTheDocument()
    expect(screen.getByText('Employee')).toBeInTheDocument()
  })

  it('marks only the exact current navigation item as active', () => {
    authMocks.currentUser.data.role = 'finance'

    renderAppShell('/dashboard/payment-requests/new')

    expect(screen.getByRole('link', { name: /^payment requests$/i })).not.toHaveAttribute(
      'aria-current',
    )
    expect(screen.getByRole('link', { name: /^new payment request$/i })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })
})

function renderAppShell(route = '/dashboard') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route element={<AppShell />} path="/dashboard/*">
          <Route element={<div>Dashboard content</div>} index />
          <Route element={<div>New payment request content</div>} path="payment-requests/new" />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}
