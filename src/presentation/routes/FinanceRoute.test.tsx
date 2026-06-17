import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'

import { FinanceRoute } from './FinanceRoute'

const authMocks = vi.hoisted(() => ({
  currentUser: {
    data: {
      role: 'employee',
    },
  },
}))

vi.mock('@/presentation/hooks/useAuth', () => ({
  useCurrentUser: () => authMocks.currentUser,
}))

describe('FinanceRoute', () => {
  it('redirects employee users away from finance-only pages', () => {
    authMocks.currentUser.data.role = 'employee'

    renderFinanceRoute()

    expect(screen.getByText('Dashboard content')).toBeInTheDocument()
    expect(screen.queryByText('Finance content')).not.toBeInTheDocument()
  })

  it('allows finance users to access finance-only pages', () => {
    authMocks.currentUser.data.role = 'finance'

    renderFinanceRoute()

    expect(screen.getByText('Finance content')).toBeInTheDocument()
  })
})

function renderFinanceRoute() {
  return render(
    <MemoryRouter initialEntries={['/dashboard/finance-review']}>
      <Routes>
        <Route element={<div>Dashboard content</div>} path="/dashboard" />
        <Route
          element={
            <FinanceRoute>
              <div>Finance content</div>
            </FinanceRoute>
          }
          path="/dashboard/finance-review"
        />
      </Routes>
    </MemoryRouter>,
  )
}
