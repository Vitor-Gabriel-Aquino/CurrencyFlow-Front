import { ArrowRight, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { useLoginRedirect } from '@/presentation/hooks/useAuth'
import { Button } from '@/shared/ui/button'
import { LanguageSwitcher } from '@/shared/ui/language-switcher'

export function LoginPage() {
  const loginRedirect = useLoginRedirect()
  const { t } = useTranslation()

  return (
    <main className="min-h-screen bg-[#f7f8fb] px-6 py-6">
      <div className="mx-auto flex w-full max-w-5xl justify-end">
        <LanguageSwitcher />
      </div>

      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <section className="w-full max-w-md rounded-lg border border-[#dfe5ef] bg-white p-8 shadow-sm">
          <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-[#e9f2fb] text-[#1268b3]">
            <ShieldCheck className="size-6" />
          </div>

          <h1 className="text-3xl font-semibold text-[#172033]">{t('auth.login.title')}</h1>
          <p className="mt-3 text-sm leading-6 text-[#526076]">{t('auth.login.description')}</p>

          <Button
            className="mt-8 w-full"
            disabled={loginRedirect.isPending}
            onClick={() => loginRedirect.mutate()}
            type="button"
          >
            {loginRedirect.isPending ? t('auth.login.pending') : t('auth.login.submit')}
            <ArrowRight className="size-4" />
          </Button>

          {loginRedirect.isError ? (
            <p className="mt-4 text-sm font-medium text-[#b42318]">{t('auth.login.error')}</p>
          ) : null}

          <Link className="mt-6 block text-sm font-medium text-[#1268b3]" to="/">
            {t('auth.login.back')}
          </Link>
        </section>
      </div>
    </main>
  )
}
