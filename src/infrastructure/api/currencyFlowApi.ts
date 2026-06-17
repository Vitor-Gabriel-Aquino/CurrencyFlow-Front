import type { CurrencyFlowApi, PaginatedResponse } from '@/application'
import type {
  Country,
  CreatePaymentRequestPayload,
  Currency,
  ListPaymentRequestsParams,
  OAuthTokenPayload,
  OAuthTokenResponse,
  PaymentRequest,
  RegisterUserPayload,
  ReviewPaymentRequestPayload,
  UpdateCurrentUserPayload,
  User,
} from '@/domain'
import { sessionAuthTokenStorage } from '@/infrastructure/auth/tokenStorage'
import { createHttpClient } from '@/infrastructure/http/httpClient'

type DataResponse<T> = {
  data: T
}

type CollectionResponse<T> = {
  data: T[]
}

const httpClient = createHttpClient(() => sessionAuthTokenStorage.getAccessToken())

export const currencyFlowApi: CurrencyFlowApi = {
  async listCountries() {
    const response = await httpClient.request<CollectionResponse<Country>>('/api/countries')

    return response.data
  },

  async listCurrencies() {
    const response = await httpClient.request<CollectionResponse<Currency>>('/api/currencies')

    return response.data
  },

  async registerUser(payload: RegisterUserPayload) {
    const response = await httpClient.request<DataResponse<User>>('/api/register', {
      method: 'POST',
      body: payload,
    })

    return response.data
  },

  async issueOAuthToken(payload: OAuthTokenPayload) {
    return httpClient.request<OAuthTokenResponse>('/oauth/token', {
      method: 'POST',
      body: payload,
    })
  },

  async getCurrentUser() {
    const response = await httpClient.request<DataResponse<User>>('/api/user', {
      authenticated: true,
    })

    return response.data
  },

  async updateCurrentUser(payload: UpdateCurrentUserPayload) {
    const response = await httpClient.request<DataResponse<User>>('/api/user', {
      method: 'PATCH',
      authenticated: true,
      body: payload,
    })

    return response.data
  },

  async revokeCurrentToken() {
    await httpClient.request('/api/tokens/current', {
      method: 'DELETE',
      authenticated: true,
    })
  },

  listPaymentRequests(params?: ListPaymentRequestsParams) {
    return httpClient.request<PaginatedResponse<PaymentRequest>>('/api/payment-requests', {
      authenticated: true,
      query: {
        status: params?.status,
        page: params?.page,
        per_page: params?.per_page,
      },
    })
  },

  async createPaymentRequest(payload: CreatePaymentRequestPayload) {
    const response = await httpClient.request<DataResponse<PaymentRequest>>(
      '/api/payment-requests',
      {
        method: 'POST',
        authenticated: true,
        body: payload,
      },
    )

    return response.data
  },

  async getPaymentRequest(paymentRequestId: string) {
    const response = await httpClient.request<DataResponse<PaymentRequest>>(
      `/api/payment-requests/${paymentRequestId}`,
      {
        authenticated: true,
      },
    )

    return response.data
  },

  async approvePaymentRequest(paymentRequestId: string, payload?: ReviewPaymentRequestPayload) {
    const response = await httpClient.request<DataResponse<PaymentRequest>>(
      `/api/payment-requests/${paymentRequestId}/approval`,
      {
        method: 'POST',
        authenticated: true,
        body: payload ?? {},
      },
    )

    return response.data
  },

  async rejectPaymentRequest(paymentRequestId: string, payload?: ReviewPaymentRequestPayload) {
    const response = await httpClient.request<DataResponse<PaymentRequest>>(
      `/api/payment-requests/${paymentRequestId}/rejection`,
      {
        method: 'POST',
        authenticated: true,
        body: payload ?? {},
      },
    )

    return response.data
  },
}
