import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createLoginRedirectUrl } from '@/application'
import {
  currencyFlowApi,
  sessionAuthTokenStorage,
  sessionLoginPromptStorage,
  sessionPkceStorage,
} from '@/infrastructure'

export const authQueryKeys = {
  currentUser: ['auth', 'currentUser'] as const,
}

export function useCurrentUser() {
  return useQuery({
    queryKey: authQueryKeys.currentUser,
    queryFn: () => currencyFlowApi.getCurrentUser(),
    retry: false,
    enabled: Boolean(sessionAuthTokenStorage.getAccessToken()),
  })
}

export function useLoginRedirect() {
  return useMutation({
    mutationFn: () => createLoginRedirectUrl(sessionPkceStorage, sessionLoginPromptStorage),
    onSuccess(authorizationUrl) {
      window.location.assign(authorizationUrl)
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => currencyFlowApi.revokeCurrentToken(),
    onSettled() {
      sessionAuthTokenStorage.clear()
      sessionPkceStorage.clear()
      sessionLoginPromptStorage.requestForcedLogin()
      queryClient.removeQueries({ queryKey: authQueryKeys.currentUser })
    },
  })
}

export function hasStoredAccessToken(): boolean {
  return Boolean(sessionAuthTokenStorage.getAccessToken())
}
