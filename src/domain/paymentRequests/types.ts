export type PaymentRequestStatus = 'pending' | 'approved' | 'rejected' | 'expired'

export type PaymentRequest = {
  id: string
  requester_id: string
  title: string
  description: string | null
  status: PaymentRequestStatus
  currency: {
    code: string
  }
  amount: string
  amount_eur: string
  exchange_rate: {
    base_currency_code: string
    local_currency_code: string
    eur_exchange_rate: string
    source: string
    fetched_at: string
  }
  review: {
    reviewed_by: string | null
    reviewed_at: string | null
    review_note: string | null
  }
  expires_at: string
  events: Array<'created' | 'approved' | 'rejected' | 'expired'>
}

export type ExchangeRatePreview = {
  base_currency_code: string
  local_currency_code: string
  eur_exchange_rate: string
  source: string
  fetched_at: string
}

export type CreatePaymentRequestPayload = {
  title: string
  description?: string | null
  amount: string
  currency_code: string
}

export type ReviewPaymentRequestPayload = {
  review_note?: string | null
}

export type ListPaymentRequestsParams = {
  status?: PaymentRequestStatus
  page?: number
  per_page?: number
}

export type PaginationMeta = {
  current_page: number
  per_page: number
  total: number
  last_page: number
}
