export type AuthTokens = {
  accessToken: string
  refreshToken: string
}

export type AuthTokenStorage = {
  getAccessToken(): string | null
  getRefreshToken(): string | null
  setTokens(tokens: AuthTokens): void
  clear(): void
}

const accessTokenKey = 'currencyflow.access_token'
const refreshTokenKey = 'currencyflow.refresh_token'

export const sessionAuthTokenStorage: AuthTokenStorage = {
  getAccessToken() {
    return window.sessionStorage.getItem(accessTokenKey)
  },
  getRefreshToken() {
    return window.sessionStorage.getItem(refreshTokenKey)
  },
  setTokens(tokens) {
    window.sessionStorage.setItem(accessTokenKey, tokens.accessToken)
    window.sessionStorage.setItem(refreshTokenKey, tokens.refreshToken)
  },
  clear() {
    window.sessionStorage.removeItem(accessTokenKey)
    window.sessionStorage.removeItem(refreshTokenKey)
  },
}
