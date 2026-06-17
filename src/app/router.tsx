import { createBrowserRouter } from 'react-router'

import { HomePage } from '@/presentation/pages/HomePage'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
])
