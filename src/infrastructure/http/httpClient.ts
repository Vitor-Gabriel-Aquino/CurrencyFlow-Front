import { env } from '@/infrastructure/config/env'
import { normalizeApiError } from '@/infrastructure/http/apiError'

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

type RequestOptions = {
  method?: HttpMethod
  body?: unknown
  query?: Record<string, string | number | undefined>
  authenticated?: boolean
}

type AccessTokenProvider = () => string | null

export class HttpClient {
  private readonly baseUrl: string

  private readonly getAccessToken: AccessTokenProvider

  constructor(baseUrl: string, getAccessToken: AccessTokenProvider) {
    this.baseUrl = baseUrl
    this.getAccessToken = getAccessToken
  }

  async request<TResponse>(path: string, options: RequestOptions = {}): Promise<TResponse> {
    const response = await fetch(this.buildUrl(path, options.query), {
      method: options.method ?? 'GET',
      headers: this.buildHeaders(options),
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    })

    if (!response.ok) {
      throw normalizeApiError(response.status, await this.readJson(response))
    }

    if (response.status === 204) {
      return undefined as TResponse
    }

    return (await this.readJson(response)) as TResponse
  }

  private buildUrl(path: string, query?: RequestOptions['query']): string {
    const url = new URL(path, this.baseUrl)

    Object.entries(query ?? {}).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    })

    return url.toString()
  }

  private buildHeaders(options: RequestOptions): HeadersInit {
    const headers = new Headers({
      Accept: 'application/json',
    })

    if (options.body !== undefined) {
      headers.set('Content-Type', 'application/json')
    }

    if (options.authenticated) {
      const accessToken = this.getAccessToken()

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`)
      }
    }

    return headers
  }

  private async readJson(response: Response): Promise<Record<string, unknown> | null> {
    const text = await response.text()

    if (!text) {
      return null
    }

    return JSON.parse(text) as Record<string, unknown>
  }
}

export function createHttpClient(getAccessToken: AccessTokenProvider): HttpClient {
  return new HttpClient(env.VITE_API_BASE_URL, getAccessToken)
}
