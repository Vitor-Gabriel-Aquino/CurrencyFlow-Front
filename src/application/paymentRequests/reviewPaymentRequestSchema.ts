import { z } from 'zod'

export const reviewPaymentRequestSchema = z.object({
  reviewNote: z.string().trim().max(500).optional(),
})

export type ReviewPaymentRequestFormValues = z.infer<typeof reviewPaymentRequestSchema>
