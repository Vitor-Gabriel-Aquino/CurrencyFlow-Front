import type { LoginPromptStorage } from '@/infrastructure/auth/loginPromptStorage'
import type { PkceStorage } from '@/infrastructure/auth/pkceStorage'

import { createLoginRedirectUrl } from './authFlow'

describe('createLoginRedirectUrl', () => {
  it('stores temporary PKCE data and clears forced-login preference', async () => {
    const pkceStorage = {
      set: vi.fn(),
    } as unknown as PkceStorage
    const loginPromptStorage: LoginPromptStorage = {
      shouldForceLogin: vi.fn(() => true),
      requestForcedLogin: vi.fn(),
      clear: vi.fn(),
    }

    const authorizationUrl = await createLoginRedirectUrl(pkceStorage, loginPromptStorage)
    const url = new URL(authorizationUrl)

    expect(pkceStorage.set).toHaveBeenCalledWith({
      codeVerifier: expect.stringMatching(/^[A-Za-z0-9_-]+$/),
      state: expect.stringMatching(/^[A-Za-z0-9_-]+$/),
    })
    expect(loginPromptStorage.clear).toHaveBeenCalled()
    expect(url.searchParams.get('prompt')).toBe('login')
  })
})
