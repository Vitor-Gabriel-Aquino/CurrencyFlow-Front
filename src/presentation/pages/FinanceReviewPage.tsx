import { Scale } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function FinanceReviewPage() {
  const { t } = useTranslation()

  return (
    <section className="grid gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1268b3]">
          {t('financeReview.eyebrow')}
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#172033]">
          {t('financeReview.title')}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#526076]">
          {t('financeReview.description')}
        </p>
      </div>

      <div className="rounded-lg border border-[#dfe5ef] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-[#e9f2fb] text-[#1268b3]">
          <Scale className="size-6" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-[#172033]">
          {t('financeReview.emptyTitle')}
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#526076]">
          {t('financeReview.emptyDescription')}
        </p>
      </div>
    </section>
  )
}
