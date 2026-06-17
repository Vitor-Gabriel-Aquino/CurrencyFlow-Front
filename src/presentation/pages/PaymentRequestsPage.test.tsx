import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { makePaymentRequest } from '@/test/paymentRequestFactory'
import { renderWithProviders } from '@/test/render'

import { PaymentRequestsPage } from './PaymentRequestsPage'

const apiMocks = vi.hoisted(() => ({
  listPaymentRequests: vi.fn(),
}))

vi.mock('@/infrastructure', async () => {
  const actual = await vi.importActual<typeof import('@/infrastructure')>('@/infrastructure')

  return {
    ...actual,
    currencyFlowApi: {
      ...actual.currencyFlowApi,
      listPaymentRequests: apiMocks.listPaymentRequests,
    },
  }
})

describe('PaymentRequestsPage', () => {
  beforeEach(() => {
    apiMocks.listPaymentRequests.mockResolvedValue({
      data: [
        makePaymentRequest(),
        makePaymentRequest({
          id: 'rejected-payment-request-id',
          status: 'rejected',
          title: 'Rejected request',
        }),
        makePaymentRequest({
          id: 'expired-payment-request-id',
          status: 'expired',
          title: 'Expired request',
        }),
      ],
      meta: {
        current_page: 1,
        per_page: 10,
        total: 3,
        last_page: 1,
      },
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders payment requests returned by the API', async () => {
    renderWithProviders(<PaymentRequestsPage />)

    expect(await screen.findByText('Laptop reimbursement')).toBeInTheDocument()
    expect(screen.getAllByText('R$1,200.00')).toHaveLength(3)
    expect(screen.getAllByRole('link', { name: /view details/i })[0]).toHaveAttribute(
      'href',
      '/dashboard/payment-requests/payment-request-id',
    )
    expect(screen.getAllByText('Rejected')[1]).toHaveClass('bg-[#fef3f2]', 'text-[#b42318]')
    expect(screen.getAllByText('Expired')[1]).toHaveClass('bg-[#fff4e5]', 'text-[#b54708]')
  })

  it('filters requests by status', async () => {
    const user = userEvent.setup()
    renderWithProviders(<PaymentRequestsPage />)

    await user.selectOptions(await screen.findByLabelText('Status'), 'approved')

    await waitFor(() => {
      expect(apiMocks.listPaymentRequests).toHaveBeenLastCalledWith({
        status: 'approved',
        page: 1,
        per_page: 10,
      })
    })
  })
})
