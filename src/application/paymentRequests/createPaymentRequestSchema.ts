import { z } from 'zod'

type Translate = (key: string) => string

export type CreatePaymentRequestFormValues = {
  title: string
  description: string
  amount: string
  currency_code: string
}

export function createPaymentRequestSchema(t: Translate) {
  return z.object({
    title: z.string().trim().min(1, t('paymentRequests.form.validation.required')),
    description: z.string().trim(),
    amount: z
      .string()
      .trim()
      .min(1, t('paymentRequests.form.validation.required'))
      .regex(/^\d+(\.\d{1,2})?$/, t('paymentRequests.form.validation.amount')),
    currency_code: z.string().min(1, t('paymentRequests.form.validation.required')),
  })
}
