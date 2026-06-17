import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ApiError } from '@/infrastructure'
import { renderWithProviders } from '@/test/render'

import { RegisterPage } from './RegisterPage'

const apiMocks = vi.hoisted(() => ({
  listCountries: vi.fn(),
  listCurrencies: vi.fn(),
  registerUser: vi.fn(),
}))

vi.mock('@/infrastructure', async () => {
  const actual = await vi.importActual<typeof import('@/infrastructure')>('@/infrastructure')

  return {
    ...actual,
    currencyFlowApi: {
      ...actual.currencyFlowApi,
      listCountries: apiMocks.listCountries,
      listCurrencies: apiMocks.listCurrencies,
      registerUser: apiMocks.registerUser,
    },
  }
})

describe('RegisterPage', () => {
  beforeEach(() => {
    apiMocks.listCountries.mockResolvedValue([
      {
        code: 'BR',
        name: 'Brazil',
      },
    ])
    apiMocks.listCurrencies.mockResolvedValue([
      {
        code: 'BRL',
        name: 'Brazilian Real',
        exponent: 2,
      },
    ])
    apiMocks.registerUser.mockResolvedValue({
      id: 'user-id',
      name: 'Jane Employee',
      email: 'jane@example.com',
      role: 'employee',
      country: {
        code: 'BR',
        name: 'Brazil',
      },
      preferred_currency: {
        code: 'BRL',
        name: 'Brazilian Real',
        exponent: 2,
      },
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('validates required fields before submitting', async () => {
    const user = userEvent.setup()
    renderWithProviders(<RegisterPage />)

    await user.click(screen.getByRole('button', { name: 'Create account' }))

    expect(await screen.findAllByText('This field is required.')).toHaveLength(6)
    expect(apiMocks.registerUser).not.toHaveBeenCalled()
  })

  it('submits registration data and shows the success state', async () => {
    const user = userEvent.setup()
    renderWithProviders(<RegisterPage />)

    await user.type(screen.getByLabelText('Full name'), 'Jane Employee')
    await user.type(screen.getByLabelText('Email'), 'jane@example.com')
    await user.type(screen.getByLabelText('Password'), 'password')
    await user.type(screen.getByLabelText('Confirm password'), 'password')
    await user.type(await screen.findByLabelText('Country'), 'bra')
    await user.click(screen.getByRole('option', { name: 'Brazil (BR)' }))
    await user.type(screen.getByLabelText('Preferred currency'), 'brl')
    await user.click(screen.getByRole('option', { name: 'BRL - Brazilian Real' }))
    await user.click(screen.getByRole('button', { name: 'Create account' }))

    expect(apiMocks.registerUser).toHaveBeenCalledWith({
      name: 'Jane Employee',
      email: 'jane@example.com',
      password: 'password',
      password_confirmation: 'password',
      country_code: 'BR',
      preferred_currency_code: 'BRL',
    })
    expect(await screen.findByText('Your account is ready.')).toBeInTheDocument()
  })

  it('shows a fallback message when server validation returns an empty error list', async () => {
    apiMocks.registerUser.mockRejectedValue(
      new ApiError({
        kind: 'validation',
        message: 'The submitted data is invalid.',
        status: 422,
        validationErrors: {
          email: [],
        },
      }),
    )
    const user = userEvent.setup()
    renderWithProviders(<RegisterPage />)

    await user.type(screen.getByLabelText('Full name'), 'Jane Employee')
    await user.type(screen.getByLabelText('Email'), 'jane@example.com')
    await user.type(screen.getByLabelText('Password'), 'password')
    await user.type(screen.getByLabelText('Confirm password'), 'password')
    await user.type(await screen.findByLabelText('Country'), 'bra')
    await user.click(screen.getByRole('option', { name: 'Brazil (BR)' }))
    await user.type(screen.getByLabelText('Preferred currency'), 'brl')
    await user.click(screen.getByRole('option', { name: 'BRL - Brazilian Real' }))
    await user.click(screen.getByRole('button', { name: 'Create account' }))

    expect(await screen.findByText('Registration could not be completed. Please try again.')).toBeInTheDocument()
  })
})
