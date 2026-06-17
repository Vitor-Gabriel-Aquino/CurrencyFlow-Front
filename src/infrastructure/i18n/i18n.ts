import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { env } from '@/infrastructure/config/env'
import { en } from '@/infrastructure/i18n/resources/en'
import { ptBR } from '@/infrastructure/i18n/resources/pt-BR'

const languageStorageKey = 'currencyflow.language'
const supportedLanguages = ['en', 'pt-BR'] as const
type SupportedLanguage = (typeof supportedLanguages)[number]

function resolveInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') {
    return env.VITE_DEFAULT_LOCALE
  }

  const storedLanguage = readStoredLanguage()

  if (isSupportedLanguage(storedLanguage)) {
    return storedLanguage
  }

  return env.VITE_DEFAULT_LOCALE
}

function isSupportedLanguage(value: string | null): value is SupportedLanguage {
  return supportedLanguages.includes(value as SupportedLanguage)
}

function readStoredLanguage() {
  try {
    return window.localStorage.getItem(languageStorageKey)
  } catch {
    return null
  }
}

function storeLanguage(language: SupportedLanguage) {
  try {
    window.localStorage.setItem(languageStorageKey, language)
  } catch {
    // The chosen language still applies for the current session when storage is unavailable.
  }
}

function syncDocumentLanguage(language: SupportedLanguage) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.lang = language
}

const initialLanguage = resolveInitialLanguage()

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  lng: initialLanguage,
  resources: {
    en: {
      translation: en,
    },
    'pt-BR': {
      translation: ptBR,
    },
  },
})

syncDocumentLanguage(initialLanguage)

i18n.on('languageChanged', (language) => {
  if (typeof window === 'undefined' || !isSupportedLanguage(language)) {
    return
  }

  storeLanguage(language)
  syncDocumentLanguage(language)
})

export { i18n }
