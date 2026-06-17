import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/utils/cn'

const languageOptions = [
  { label: 'EN', nameKey: 'common.languages.en', value: 'en' },
  { label: 'PT', nameKey: 'common.languages.ptBR', value: 'pt-BR' },
] as const

export function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n, t } = useTranslation()
  const currentLanguage = i18n.resolvedLanguage === 'pt-BR' ? 'pt-BR' : 'en'

  return (
    <div
      aria-label={t('common.language')}
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border border-[#cfd8e6] bg-white p-1',
        className,
      )}
      role="group"
    >
      <Languages aria-hidden="true" className="ml-2 size-4 text-[#526076]" />
      {languageOptions.map((language) => (
        <Button
          aria-label={t(language.nameKey)}
          className={cn(
            'min-h-8 rounded-md px-2.5 text-xs',
            currentLanguage === language.value && 'bg-[#1268b3] text-white hover:bg-[#1268b3]',
          )}
          key={language.value}
          onClick={() => void i18n.changeLanguage(language.value)}
          type="button"
          variant={currentLanguage === language.value ? 'primary' : 'secondary'}
        >
          {language.label}
        </Button>
      ))}
    </div>
  )
}
