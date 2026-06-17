import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { makePaymentRequest } from '@/test/paymentRequestFactory'
import { renderWithProviders } from '@/test/render'

import { NewPaymentRequestPage } from './NewPaymentRequestPage'

const apiMocks = vi.hoisted(() => ({
  listCurrencies: vi.fn(),
  createPaymentRequest: vi.fn(),
}))

const navigateMock = vi.hoisted(() => vi.fn())

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
      createPaymentRequest: apiMocks.createPaymentRequest,
    },
  }
})

describe('NewPaymentRequestPage', () => {
  beforeEach(() => {
    apiMocks.listCurrencies.mockResolvedValue([
      {
        code: 'BRL',
        name: 'Brazilian Real',
        exponent: 2,
      },
    ])
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
