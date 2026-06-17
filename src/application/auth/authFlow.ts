import { createPkceAuthorizationRequest } from '@/application/auth/pkce'
import type { LoginPromptStorage } from '@/infrastructure/auth/loginPromptStorage'
import type { PkceStorage } from '@/infrastructure/auth/pkceStorage'

export async function createLoginRedirectUrl(
  pkceStorage: PkceStorage,
  loginPromptStorage: LoginPromptStorage,
): Promise<string> {
  const forceLogin = loginPromptStorage.shouldForceLogin()
  const request = await createPkceAuthorizationRequest({
    promptLogin: forceLogin,
  })

  pkceStorage.set({
    codeVerifier: request.codeVerifier,
    state: request.state,
  })
  loginPromptStorage.clear()

  return request.authorizationUrl
}
