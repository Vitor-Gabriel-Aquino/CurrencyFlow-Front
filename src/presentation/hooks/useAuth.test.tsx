import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'

import {
  sessionAuthTokenStorage,
  sessionLoginPromptStorage,
  sessionPkceStorage,
} from '@/infrastructure'

import { useLogout } from './useAuth'

const apiMocks = vi.hoisted(() => ({
  revokeCurrentToken: vi.fn(),
}))

vi.mock('@/infrastructure', async () => {
  const actual = await vi.importActual<typeof import('@/infrastructure')>('@/infrastructure')

  return {
    ...actual,
    currencyFlowApi: {
      ...actual.currencyFlowApi,
      revokeCurrentToken: apiMocks.revokeCurrentToken,
    },
  }
})

describe('useLogout', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
    apiMocks.revokeCurrentToken.mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.clearAllMocks()
    window.sessionStorage.clear()
  })

  it('revokes the current token and clears local authentication state', async () => {
    sessionAuthTokenStorage.setTokens({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    })
    sessionPkceStorage.set({
      codeVerifier: 'verifier',
      state: 'state',
    })
    const { result } = renderHook(() => useLogout(), {
      wrapper: createQueryWrapper(),
    })

    result.current.mutate()

    await waitFor(() => {
      expect(apiMocks.revokeCurrentToken).toHaveBeenCalled()
    })
    expect(sessionAuthTokenStorage.getAccessToken()).toBeNull()
    expect(sessionAuthTokenStorage.getRefreshToken()).toBeNull()
    expect(sessionPkceStorage.get()).toBeNull()
    expect(sessionLoginPromptStorage.shouldForceLogin()).toBe(true)
  })
})

function createQueryWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return function QueryWrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}
