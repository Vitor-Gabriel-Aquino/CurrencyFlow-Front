import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useSearchParams } from 'react-router'

import { env } from '@/infrastructure/config/env'
import { currencyFlowApi, sessionAuthTokenStorage, sessionPkceStorage } from '@/infrastructure'

type CallbackState = 'processing' | 'failed'

export function AuthCallbackPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [state, setState] = useState<CallbackState>('processing')
  const { t } = useTranslation()
  const hasStartedTokenExchange = useRef(false)
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    async function exchangeAuthorizationCode() {
      if (hasStartedTokenExchange.current) {
        return
      }

      hasStartedTokenExchange.current = true

      const code = searchParams.get('code')
      const returnedState = searchParams.get('state')
      const pkceSession = sessionPkceStorage.get()

      if (!code || !returnedState || !pkceSession || returnedState !== pkceSession.state) {
        if (isMounted.current) {
          setState('failed')
        }

        return
      }

      try {
        const tokenResponse = await currencyFlowApi.issueOAuthToken({
          grant_type: 'authorization_code',
          client_id: env.VITE_OAUTH_CLIENT_ID,
          redirect_uri: env.VITE_OAUTH_REDIRECT_URI,
          code,
          code_verifier: pkceSession.codeVerifier,
        })

        sessionAuthTokenStorage.setTokens({
          accessToken: tokenResponse.access_token,
          refreshToken: tokenResponse.refresh_token,
        })
        sessionPkceStorage.clear()

        if (isMounted.current) {
          navigate('/dashboard', { replace: true })
        }
      } catch {
        if (isMounted.current) {
          setState('failed')
        }
      }
    }

    void exchangeAuthorizationCode()

    return () => {
      isMounted.current = false
    }
  }, [navigate, searchParams])

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8fb] px-6">
      <section className="w-full max-w-md rounded-lg border border-[#dfe5ef] bg-white p-8 text-center shadow-sm">
        {state === 'processing' ? (
          <>
            <h1 className="text-2xl font-semibold text-[#172033]">
              {t('auth.callback.processingTitle')}
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#526076]">
              {t('auth.callback.processingDescription')}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-[#172033]">
              {t('auth.callback.failedTitle')}
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#526076]">
              {t('auth.callback.failedDescription')}
            </p>
            <Link className="mt-6 inline-flex text-sm font-semibold text-[#1268b3]" to="/login">
              {t('auth.callback.returnToLogin')}
            </Link>
          </>
        )}
      </section>
    </main>
  )
}
