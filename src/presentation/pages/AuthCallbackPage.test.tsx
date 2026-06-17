import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'

import { env } from '@/infrastructure/config/env'

import { AuthCallbackPage } from './AuthCallbackPage'

const infrastructureMocks = vi.hoisted(() => ({
  issueOAuthToken: vi.fn(),
  setTokens: vi.fn(),
  getPkceSession: vi.fn(),
  clearPkceSession: vi.fn(),
}))

vi.mock('@/infrastructure', async () => {
  const actual = await vi.importActual<typeof import('@/infrastructure')>('@/infrastructure')

  return {
    ...actual,
    currencyFlowApi: {
      ...actual.currencyFlowApi,
      issueOAuthToken: infrastructureMocks.issueOAuthToken,
    },
    sessionAuthTokenStorage: {
      ...actual.sessionAuthTokenStorage,
      setTokens: infrastructureMocks.setTokens,
    },
    sessionPkceStorage: {
      ...actual.sessionPkceStorage,
      get: infrastructureMocks.getPkceSession,
      clear: infrastructureMocks.clearPkceSession,
    },
  }
})

describe('AuthCallbackPage', () => {
  beforeEach(() => {
    infrastructureMocks.getPkceSession.mockReturnValue({
      codeVerifier: 'verifier',
      state: 'state-1',
    })
    infrastructureMocks.issueOAuthToken.mockResolvedValue({
      token_type: 'Bearer',
      expires_in: 31536000,
      access_token: 'access-token',
      refresh_token: 'refresh-token',
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('exchanges the authorization code and redirects to the dashboard', async () => {
    renderCallback('/auth/callback?code=auth-code&state=state-1')

    expect(await screen.findByText('Dashboard')).toBeInTheDocument()
    expect(infrastructureMocks.issueOAuthToken).toHaveBeenCalledWith({
      grant_type: 'authorization_code',
      client_id: env.VITE_OAUTH_CLIENT_ID,
      redirect_uri: env.VITE_OAUTH_REDIRECT_URI,
      code: 'auth-code',
      code_verifier: 'verifier',
    })
    expect(infrastructureMocks.setTokens).toHaveBeenCalledWith({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    })
    expect(infrastructureMocks.clearPkceSession).toHaveBeenCalled()
  })

  it('shows a failure state when the returned state is invalid', async () => {
    renderCallback('/auth/callback?code=auth-code&state=wrong-state')

    await waitFor(() => {
      expect(screen.getByText('Sign in could not be completed')).toBeInTheDocument()
    })
    expect(infrastructureMocks.issueOAuthToken).not.toHaveBeenCalled()
  })
})

function renderCallback(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route element={<AuthCallbackPage />} path="/auth/callback" />
        <Route element={<div>Dashboard</div>} path="/dashboard" />
      </Routes>
    </MemoryRouter>,
  )
}
