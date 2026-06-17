import { normalizeApiError } from './apiError'

describe('normalizeApiError', () => {
  it('normalizes validation responses with field errors', () => {
    const error = normalizeApiError(422, {
      message: 'The submitted data is invalid.',
      errors: {
        email: ['The email has already been taken.'],
      },
    })

    expect(error.kind).toBe('validation')
    expect(error.status).toBe(422)
    expect(error.validationErrors).toEqual({
      email: ['The email has already been taken.'],
    })
  })

  it.each([
    [401, 'unauthenticated'],
    [403, 'forbidden'],
    [409, 'conflict'],
    [503, 'serviceUnavailable'],
  ] as const)('maps HTTP %s to %s', (status, kind) => {
    expect(normalizeApiError(status, null).kind).toBe(kind)
  })
})
