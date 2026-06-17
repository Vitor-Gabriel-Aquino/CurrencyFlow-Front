import type { PaymentRequest } from '@/domain'

export function makePaymentRequest(overrides: Partial<PaymentRequest> = {}): PaymentRequest {
  return {
    id: 'payment-request-id',
    requester_id: 'requester-id',
    title: 'Laptop reimbursement',
    description: 'Replacement device for remote work.',
    status: 'pending',
    currency: {
      code: 'BRL',
    },
    amount: '1200.00',
    amount_eur: '200.00',
    exchange_rate: {
      base_currency_code: 'EUR',
      local_currency_code: 'BRL',
      eur_exchange_rate: '6.000000',
      source: 'ExchangeRate-API',
      fetched_at: '2026-06-17T12:00:00.000000Z',
    },
    review: {
      reviewed_by: null,
      reviewed_at: null,
      review_note: null,
    },
    expires_at: '2026-06-19T12:00:00.000000Z',
    events: ['created'],
    ...overrides,
  }
}
