const raw = import.meta.env

const requiredVars = {
  VITE_AUTH0_DOMAIN: raw.VITE_AUTH0_DOMAIN,
  VITE_AUTH0_CLIENT_ID: raw.VITE_AUTH0_CLIENT_ID,
  VITE_AUTH0_AUDIENCE: raw.VITE_AUTH0_AUDIENCE,
}

export const missingEnvVars = Object.entries(requiredVars)
  .filter(([, value]) => !value || value.trim() === '')
  .map(([name]) => name)

export const env = {
  auth0Domain: raw.VITE_AUTH0_DOMAIN?.trim() ?? '',
  auth0ClientId: raw.VITE_AUTH0_CLIENT_ID?.trim() ?? '',
  auth0Audience: raw.VITE_AUTH0_AUDIENCE?.trim() ?? '',
  auth0Connection: raw.VITE_AUTH0_CONNECTION?.trim() || 'email',
  talyerApiUrl: (raw.VITE_TALYER_API_URL ?? '').trim().replace(/\/+$/, ''),
} as const
