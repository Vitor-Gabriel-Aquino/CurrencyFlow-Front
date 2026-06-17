import { requestedOAuthScopes } from '@/domain'
import { env } from '@/infrastructure/config/env'

export type PkceAuthorizationRequest = {
  authorizationUrl: string
  codeVerifier: string
  state: string
}

type CreatePkceAuthorizationRequestOptions = {
  promptLogin?: boolean
}

const authorizePath = '/oauth/authorize'

export async function createPkceAuthorizationRequest(
  options: CreatePkceAuthorizationRequestOptions = {},
): Promise<PkceAuthorizationRequest> {
  const codeVerifier = randomUrlSafeString(64)
  const state = randomUrlSafeString(32)
  const codeChallenge = await createCodeChallenge(codeVerifier)
  const authorizationUrl = new URL(authorizePath, env.VITE_API_BASE_URL)

  authorizationUrl.searchParams.set('client_id', env.VITE_OAUTH_CLIENT_ID)
  authorizationUrl.searchParams.set('redirect_uri', env.VITE_OAUTH_REDIRECT_URI)
  authorizationUrl.searchParams.set('response_type', 'code')
  authorizationUrl.searchParams.set('scope', requestedOAuthScopes.join(' '))
  authorizationUrl.searchParams.set('code_challenge', codeChallenge)
  authorizationUrl.searchParams.set('code_challenge_method', 'S256')
  authorizationUrl.searchParams.set('state', state)

  if (options.promptLogin) {
    authorizationUrl.searchParams.set('prompt', 'login')
  }

  return {
    authorizationUrl: authorizationUrl.toString(),
    codeVerifier,
    state,
  }
}

async function createCodeChallenge(codeVerifier: string): Promise<string> {
  const digest = await window.crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(codeVerifier),
  )

  return base64UrlEncode(new Uint8Array(digest))
}

function randomUrlSafeString(byteLength: number): string {
  const randomBytes = new Uint8Array(byteLength)
  window.crypto.getRandomValues(randomBytes)

  return base64UrlEncode(randomBytes)
}

function base64UrlEncode(bytes: Uint8Array): string {
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('')

  return window.btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
