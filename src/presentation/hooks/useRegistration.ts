import { useMutation, useQuery } from '@tanstack/react-query'

import type { RegisterUserPayload } from '@/domain'
import { currencyFlowApi } from '@/infrastructure'

export const registrationQueryKeys = {
  countries: ['registration', 'countries'] as const,
  currencies: ['registration', 'currencies'] as const,
}

export function useCountries() {
  return useQuery({
    queryKey: registrationQueryKeys.countries,
    queryFn: () => currencyFlowApi.listCountries(),
    staleTime: 1000 * 60 * 30,
  })
}

export function useCurrencies() {
  return useQuery({
    queryKey: registrationQueryKeys.currencies,
    queryFn: () => currencyFlowApi.listCurrencies(),
    staleTime: 1000 * 60 * 30,
  })
}

export function useRegisterUser() {
  return useMutation({
    mutationFn: (payload: RegisterUserPayload) => currencyFlowApi.registerUser(payload),
  })
}
