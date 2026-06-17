export type ApiErrorKind =
  | 'unauthenticated'
  | 'forbidden'
  | 'conflict'
  | 'validation'
  | 'serviceUnavailable'
  | 'notFound'
  | 'rateLimited'
  | 'unknown'

export type ValidationErrors = Record<string, string[]>

export class ApiError extends Error {
  readonly kind: ApiErrorKind
  readonly status: number
  readonly validationErrors?: ValidationErrors

  constructor(params: {
    kind: ApiErrorKind
    message: string
    status: number
    validationErrors?: ValidationErrors
  }) {
    super(params.message)
    this.name = 'ApiError'
    this.kind = params.kind
    this.status = params.status
    this.validationErrors = params.validationErrors
  }
}

type ErrorPayload = {
  message?: unknown
  errors?: unknown
}

export function normalizeApiError(status: number, payload: ErrorPayload | null): ApiError {
  const message = typeof payload?.message === 'string' ? payload.message : fallbackMessage(status)
  const validationErrors = isValidationErrors(payload?.errors) ? payload.errors : undefined

  return new ApiError({
    kind: statusToKind(status),
    message,
    status,
    validationErrors,
  })
}

function statusToKind(status: number): ApiErrorKind {
  if (status === 401) return 'unauthenticated'
  if (status === 403) return 'forbidden'
  if (status === 404) return 'notFound'
  if (status === 409) return 'conflict'
  if (status === 422) return 'validation'
  if (status === 429) return 'rateLimited'
  if (status === 503) return 'serviceUnavailable'

  return 'unknown'
}

function fallbackMessage(status: number): string {
  if (status === 401) return 'Authentication is required.'
  if (status === 403) return 'This action is not allowed.'
  if (status === 404) return 'The requested resource was not found.'
  if (status === 409) return 'The request could not be completed because the resource changed.'
  if (status === 422) return 'The submitted data is invalid.'
  if (status === 429) return 'Too many requests. Please try again soon.'
  if (status === 503) return 'The service is temporarily unavailable.'

  return 'Unexpected API error.'
}

function isValidationErrors(value: unknown): value is ValidationErrors {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false
  }

  return Object.values(value).every(
    (messages) =>
      Array.isArray(messages) && messages.every((message) => typeof message === 'string'),
  )
}
