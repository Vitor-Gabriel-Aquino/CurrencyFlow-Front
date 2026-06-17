export type LoginPromptStorage = {
  shouldForceLogin(): boolean
  requestForcedLogin(): void
  clear(): void
}

const forceLoginKey = 'currencyflow.force_login'

export const sessionLoginPromptStorage: LoginPromptStorage = {
  shouldForceLogin() {
    return window.sessionStorage.getItem(forceLoginKey) === 'true'
  },
  requestForcedLogin() {
    window.sessionStorage.setItem(forceLoginKey, 'true')
  },
  clear() {
    window.sessionStorage.removeItem(forceLoginKey)
  },
}
