import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { env } from '@/infrastructure/config/env'
import { en } from '@/infrastructure/i18n/resources/en'
import { ptBR } from '@/infrastructure/i18n/resources/pt-BR'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  lng: env.VITE_DEFAULT_LOCALE,
  resources: {
    en: {
      translation: en,
    },
    'pt-BR': {
      translation: ptBR,
    },
  },
})

export { i18n }
