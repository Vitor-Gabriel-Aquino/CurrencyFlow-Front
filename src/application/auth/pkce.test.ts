import { env } from '@/infrastructure/config/env'

import { createPkceAuthorizationRequest } from './pkce'

describe('createPkceAuthorizationRequest', () => {
  it('builds an OAuth authorization URL with PKCE parameters', async () => {
    const request = await createPkceAuthorizationRequest()
    const url = new URL(request.authorizationUrl)

    expect(url.origin).toBe('http://localhost:8000')
    expect(url.pathname).toBe('/oauth/authorize')
    expect(url.searchParams.get('client_id')).toBe(env.VITE_OAUTH_CLIENT_ID)
    expect(url.searchParams.get('redirect_uri')).toBe(env.VITE_OAUTH_REDIRECT_URI)
    expect(url.searchParams.get('response_type')).toBe('code')
    expect(url.searchParams.get('scope')).toBe(
      'profile:read profile:update payments:read payments:create payments:approve',
    )
    expect(url.searchParams.get('code_challenge_method')).toBe('S256')
    expect(url.searchParams.get('code_challenge')).toMatch(/^[A-Za-z0-9_-]+$/)
    expect(url.searchParams.get('state')).toBe(request.state)
    expect(request.codeVerifier).toMatch(/^[A-Za-z0-9_-]+$/)
  })

  it('can require the backend to show the login screen again', async () => {
    const request = await createPkceAuthorizationRequest({ promptLogin: true })
    const url = new URL(request.authorizationUrl)

    expect(url.searchParams.get('prompt')).toBe('login')
  })
})
