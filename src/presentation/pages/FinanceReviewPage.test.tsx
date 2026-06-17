import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ApiError } from '@/infrastructure/http/apiError'
import { makePaymentRequest } from '@/test/paymentRequestFactory'
import { renderWithProviders } from '@/test/render'

import { FinanceReviewPage } from './FinanceReviewPage'

const apiMocks = vi.hoisted(() => ({
  approvePaymentRequest: vi.fn(),
  listPaymentRequests: vi.fn(),
  rejectPaymentRequest: vi.fn(),
}))

vi.mock('@/infrastructure', async () => {
  const actual = await vi.importActual<typeof import('@/infrastructure')>('@/infrastructure')

  return {
    ...actual,
    currencyFlowApi: {
      ...actual.currencyFlowApi,
      approvePaymentRequest: apiMocks.approvePaymentRequest,
      listPaymentRequests: apiMocks.listPaymentRequests,
      rejectPaymentRequest: apiMocks.rejectPaymentRequest,
    },
  }
})

describe('FinanceReviewPage', () => {
  beforeEach(() => {
    apiMocks.listPaymentRequests.mockResolvedValue({
      data: [makePaymentRequest()],
      meta: {
        current_page: 1,
        per_page: 10,
        total: 1,
        last_page: 1,
      },
    })
    apiMocks.approvePaymentRequest.mockResolvedValue(
      makePaymentRequest({
        status: 'approved',
        review: {
          reviewed_by: 'finance-user-id',
          reviewed_at: '2026-06-17T13:00:00.000000Z',
          review_note: 'Approved for replacement.',
        },
      }),
    )
    apiMocks.rejectPaymentRequest.mockResolvedValue(makePaymentRequest({ status: 'rejected' }))
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders pending payment requests for finance review', async () => {
    renderWithProviders(<FinanceReviewPage />)

    expect(await screen.findByText('Laptop reimbursement')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toHaveClass('bg-[#e9f2fb]', 'text-[#1268b3]')
    expect(apiMocks.listPaymentRequests).toHaveBeenCalledWith({
      status: 'pending',
      page: 1,
      per_page: 10,
    })
  })

  it('approves a pending payment request with an optional review note', async () => {
    const user = userEvent.setup()
    renderWithProviders(<FinanceReviewPage />)

    await user.type(await screen.findByLabelText('Review note'), 'Approved for replacement.')
    await user.click(screen.getByRole('button', { name: /approve/i }))

    await waitFor(() => {
      expect(apiMocks.approvePaymentRequest).toHaveBeenCalledWith('payment-request-id', {
        review_note: 'Approved for replacement.',
      })
    })
    expect(await screen.findByText('Payment request approved.')).toBeInTheDocument()
  })

  it('rejects a pending payment request with an optional review note', async () => {
    const user = userEvent.setup()
    renderWithProviders(<FinanceReviewPage />)

    await user.type(await screen.findByLabelText('Review note'), 'Missing receipt.')
    await user.click(screen.getByRole('button', { name: /reject/i }))

    await waitFor(() => {
      expect(apiMocks.rejectPaymentRequest).toHaveBeenCalledWith('payment-request-id', {
        review_note: 'Missing receipt.',
      })
    })
    expect(await screen.findByText('Payment request rejected.')).toBeInTheDocument()
  })

  it('shows a conflict message when the request is no longer reviewable', async () => {
    const user = userEvent.setup()
    apiMocks.approvePaymentRequest.mockRejectedValue(
      new ApiError({
        kind: 'conflict',
        message: 'Only pending payment requests can be approved.',
        status: 409,
      }),
    )
    renderWithProviders(<FinanceReviewPage />)

    await user.click(await screen.findByRole('button', { name: /approve/i }))

    expect(
      await screen.findByText('This request is no longer pending or reviewable.'),
    ).toBeInTheDocument()
  })
})
