import { z } from 'zod'

const envSchema = z.object({
  VITE_API_BASE_URL: z.url(),
  VITE_OAUTH_CLIENT_ID: z.string().min(1),
  VITE_OAUTH_REDIRECT_URI: z.url(),
  VITE_DEFAULT_LOCALE: z.enum(['en', 'pt-BR']).default('en'),
})

export const env = envSchema.parse({
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_OAUTH_CLIENT_ID: import.meta.env.VITE_OAUTH_CLIENT_ID,
  VITE_OAUTH_REDIRECT_URI: import.meta.env.VITE_OAUTH_REDIRECT_URI,
  VITE_DEFAULT_LOCALE: import.meta.env.VITE_DEFAULT_LOCALE,
})
