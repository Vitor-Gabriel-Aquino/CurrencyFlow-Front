import type {
  Country,
  CreatePaymentRequestPayload,
  Currency,
  ListPaymentRequestsParams,
  OAuthTokenPayload,
  OAuthTokenResponse,
  PaymentRequest,
  PaginationMeta,
  RegisterUserPayload,
  ReviewPaymentRequestPayload,
  UpdateCurrentUserPayload,
  User,
} from '@/domain'

export type PaginatedResponse<T> = {
  data: T[]
  meta: PaginationMeta
}

export type CurrencyFlowApi = {
  listCountries(): Promise<Country[]>
  listCurrencies(): Promise<Currency[]>
  registerUser(payload: RegisterUserPayload): Promise<User>
  issueOAuthToken(payload: OAuthTokenPayload): Promise<OAuthTokenResponse>
  getCurrentUser(): Promise<User>
  updateCurrentUser(payload: UpdateCurrentUserPayload): Promise<User>
  revokeCurrentToken(): Promise<void>
  listPaymentRequests(
    params?: ListPaymentRequestsParams,
  ): Promise<PaginatedResponse<PaymentRequest>>
  createPaymentRequest(payload: CreatePaymentRequestPayload): Promise<PaymentRequest>
  getPaymentRequest(paymentRequestId: string): Promise<PaymentRequest>
  approvePaymentRequest(
    paymentRequestId: string,
    payload?: ReviewPaymentRequestPayload,
  ): Promise<PaymentRequest>
  rejectPaymentRequest(
    paymentRequestId: string,
    payload?: ReviewPaymentRequestPayload,
  ): Promise<PaymentRequest>
}
