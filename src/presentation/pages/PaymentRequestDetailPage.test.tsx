import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'

import { makePaymentRequest } from '@/test/paymentRequestFactory'

import { PaymentRequestDetailPage } from './PaymentRequestDetailPage'

const apiMocks = vi.hoisted(() => ({
  getPaymentRequest: vi.fn(),
}))

vi.mock('@/infrastructure', async () => {
  const actual = await vi.importActual<typeof import('@/infrastructure')>('@/infrastructure')

  return {
    ...actual,
    currencyFlowApi: {
      ...actual.currencyFlowApi,
      getPaymentRequest: apiMocks.getPaymentRequest,
    },
  }
})

describe('PaymentRequestDetailPage', () => {
  beforeEach(() => {
    apiMocks.getPaymentRequest.mockResolvedValue(makePaymentRequest())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders payment request details and exchange-rate snapshot', async () => {
    renderPaymentRequestDetailPage()

    expect(await screen.findByText('Laptop reimbursement')).toBeInTheDocument()
    expect(screen.getByText('Exchange-rate snapshot')).toBeInTheDocument()
    expect(screen.getByText('6.000000')).toBeInTheDocument()
    expect(screen.getByText('ExchangeRate-API')).toBeInTheDocument()
    expect(apiMocks.getPaymentRequest).toHaveBeenCalledWith('payment-request-id')
  })
})

function renderPaymentRequestDetailPage() {
  return render(
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              retry: false,
            },
          },
        })
      }
    >
      <MemoryRouter initialEntries={['/dashboard/payment-requests/payment-request-id']}>
        <Routes>
          <Route
            element={<PaymentRequestDetailPage />}
            path="/dashboard/payment-requests/:paymentRequestId"
          />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}
