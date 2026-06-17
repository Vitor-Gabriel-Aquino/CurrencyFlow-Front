import type { Country, Currency } from '@/domain/referenceData/types'

export type UserRole = 'employee' | 'finance'

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  country: Country
  preferred_currency: Currency
}

export type RegisterUserPayload = {
  name: string
  email: string
  password: string
  password_confirmation: string
  country_code: string
  preferred_currency_code: string
}

export type UpdateCurrentUserPayload = {
  name?: string
  email?: string
  country_code?: string
  preferred_currency_code?: string
  current_password?: string
  password?: string
  password_confirmation?: string
}

export type OAuthScope =
  | 'profile:read'
  | 'profile:update'
  | 'payments:read'
  | 'payments:create'
  | 'payments:approve'

export const requestedOAuthScopes: OAuthScope[] = [
  'profile:read',
  'profile:update',
  'payments:read',
  'payments:create',
  'payments:approve',
]

export type OAuthTokenPayload = {
  grant_type: 'authorization_code'
  client_id: string
  redirect_uri: string
  code: string
  code_verifier: string
}

export type OAuthTokenResponse = {
  token_type: 'Bearer'
  expires_in: number
  access_token: string
  refresh_token: string
}
