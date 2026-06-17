import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { i18n } from '@/infrastructure/i18n/i18n'
import { renderWithProviders } from '@/test/render'

import { HomePage } from './HomePage'

describe('HomePage', () => {
  beforeEach(async () => {
    window.localStorage.clear()
    await i18n.changeLanguage('en')
  })

  it('links users to sign in and registration flows', () => {
    renderWithProviders(<HomePage />)

    expect(screen.getAllByRole('link', { name: /sign in/i })[0]).toHaveAttribute(
      'href',
      '/login',
    )
    expect(screen.getByRole('link', { name: /create account/i })).toHaveAttribute(
      'href',
      '/register',
    )
  })

  it('switches and persists the active language', async () => {
    const user = userEvent.setup()
    renderWithProviders(<HomePage />)

    await user.click(screen.getByRole('button', { name: /portuguese/i }))

    expect(
      await screen.findByRole('heading', {
        name: /gerencie pagamentos da empresa em várias moedas com confiança/i,
      }),
    ).toBeInTheDocument()
    expect(window.localStorage.getItem('currencyflow.language')).toBe('pt-BR')
  })
})
