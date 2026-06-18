import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { makePaymentRequest } from '@/test/paymentRequestFactory'
import { renderWithProviders } from '@/test/render'

import { NewPaymentRequestPage } from './NewPaymentRequestPage'

const apiMocks = vi.hoisted(() => ({
  listCurrencies: vi.fn(),
  getCurrentUser: vi.fn(),
  getExchangeRatePreview: vi.fn(),
  createPaymentRequest: vi.fn(),
}))

const navigateMock = vi.hoisted(() => vi.fn())
const authTokenStorageMock = vi.hoisted(() => ({
  hasAccessToken: false,
}))

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router')

  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})

vi.mock('@/infrastructure', async () => {
  const actual = await vi.importActual<typeof import('@/infrastructure')>('@/infrastructure')

  return {
    ...actual,
    currencyFlowApi: {
      ...actual.currencyFlowApi,
      listCurrencies: apiMocks.listCurrencies,
      getCurrentUser: apiMocks.getCurrentUser,
      getExchangeRatePreview: apiMocks.getExchangeRatePreview,
      createPaymentRequest: apiMocks.createPaymentRequest,
    },
    sessionAuthTokenStorage: {
      ...actual.sessionAuthTokenStorage,
      getAccessToken: () => (authTokenStorageMock.hasAccessToken ? 'access-token' : null),
    },
  }
})

describe('NewPaymentRequestPage', () => {
  beforeEach(() => {
    authTokenStorageMock.hasAccessToken = false
    apiMocks.listCurrencies.mockResolvedValue([
      {
        code: 'BRL',
        name: 'Brazilian Real',
        exponent: 2,
      },
      {
        code: 'CAD',
        name: 'Canadian Dollar',
        exponent: 2,
      },
    ])
    apiMocks.getCurrentUser.mockResolvedValue({
      id: 'user-id',
      name: 'Jane Employee',
      email: 'jane@example.com',
      role: 'employee',
      country: {
        code: 'CA',
        name: 'Canada',
      },
      preferred_currency: {
        code: 'CAD',
        name: 'Canadian Dollar',
        exponent: 2,
      },
    })
    apiMocks.getExchangeRatePreview.mockResolvedValue({
      base_currency_code: 'EUR',
      local_currency_code: 'CAD',
      eur_exchange_rate: '1.62352800',
      source: 'ExchangeRate-API',
      fetched_at: '2026-06-17T21:02:00.000000Z',
    })
    apiMocks.createPaymentRequest.mockResolvedValue(makePaymentRequest())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('validates required fields before submitting', async () => {
    const user = userEvent.setup()
    renderWithProviders(<NewPaymentRequestPage />)

    await user.click(screen.getByRole('button', { name: 'Create request' }))

    expect(await screen.findAllByText('This field is required.')).toHaveLength(3)
    expect(apiMocks.createPaymentRequest).not.toHaveBeenCalled()
  })

  it('prefills the currency field with the current user preferred currency', async () => {
    authTokenStorageMock.hasAccessToken = true
    renderWithProviders(<NewPaymentRequestPage />)

    await waitFor(() => {
      expect(screen.getByLabelText('Currency')).toHaveValue('CAD - Canadian Dollar')
    })
    expect(await screen.findByText('1 EUR = 1.62352800 CAD')).toBeInTheDocument()
  })

  it('creates a payment request and navigates to its detail page', async () => {
    const user = userEvent.setup()
    renderWithProviders(<NewPaymentRequestPage />)

    await user.type(screen.getByLabelText('Title'), 'Laptop reimbursement')
    await user.type(screen.getByLabelText('Description'), 'Replacement device')
    await user.type(screen.getByLabelText('Amount'), '1200.00')
    await user.tab()
    expect(screen.getByLabelText('Amount')).toHaveValue('1,200.00')
    await user.type(await screen.findByLabelText('Currency'), 'brl')
    await user.click(screen.getByRole('option', { name: 'BRL - Brazilian Real' }))
    await user.click(screen.getByRole('button', { name: 'Create request' }))

    expect(apiMocks.createPaymentRequest).toHaveBeenCalledWith({
      title: 'Laptop reimbursement',
      description: 'Replacement device',
      amount: '1200.00',
      currency_code: 'BRL',
    })
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/dashboard/payment-requests/payment-request-id')
    })
  })
})
