import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import { MemoryRouter } from 'react-router'
import { render, type RenderOptions } from '@testing-library/react'

type RenderWithProvidersOptions = RenderOptions & {
  route?: string
}

export function renderWithProviders(
  ui: ReactElement,
  { route = '/', ...renderOptions }: RenderWithProvidersOptions = {},
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </QueryClientProvider>,
    renderOptions,
  )
}
