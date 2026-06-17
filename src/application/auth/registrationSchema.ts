import { z } from 'zod'

import type { RegisterUserPayload } from '@/domain'

type Translate = (key: string) => string

export type RegisterUserFormValues = RegisterUserPayload

export function createRegisterUserSchema(t: Translate) {
  return z
    .object({
      name: z.string().trim().min(1, t('auth.register.validation.required')),
      email: z
        .string()
        .trim()
        .min(1, t('auth.register.validation.required'))
        .email(t('auth.register.validation.email')),
      password: z.string().min(1, t('auth.register.validation.required')).min(8, {
        message: t('auth.register.validation.passwordMin'),
      }),
      password_confirmation: z.string().min(1, t('auth.register.validation.required')),
      country_code: z.string().min(1, t('auth.register.validation.required')),
      preferred_currency_code: z.string().min(1, t('auth.register.validation.required')),
    })
    .refine((values) => values.password === values.password_confirmation, {
      message: t('auth.register.validation.passwordConfirmation'),
      path: ['password_confirmation'],
    })
}
