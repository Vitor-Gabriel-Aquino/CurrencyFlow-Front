export type PkceSession = {
  codeVerifier: string
  state: string
}

export type PkceStorage = {
  get(): PkceSession | null
  set(session: PkceSession): void
  clear(): void
}

const codeVerifierKey = 'currencyflow.pkce_code_verifier'
const stateKey = 'currencyflow.oauth_state'

export const sessionPkceStorage: PkceStorage = {
  get() {
    const codeVerifier = window.sessionStorage.getItem(codeVerifierKey)
    const state = window.sessionStorage.getItem(stateKey)

    if (!codeVerifier || !state) {
      return null
    }

    return { codeVerifier, state }
  },
  set(session) {
    window.sessionStorage.setItem(codeVerifierKey, session.codeVerifier)
    window.sessionStorage.setItem(stateKey, session.state)
  },
  clear() {
    window.sessionStorage.removeItem(codeVerifierKey)
    window.sessionStorage.removeItem(stateKey)
  },
}
