import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/test/render'

import { HomePage } from './HomePage'

describe('HomePage', () => {
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
})
