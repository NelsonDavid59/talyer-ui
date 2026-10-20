import { env } from '@/shared/config/env'

export const AUTH0_CALLBACK_PATH = '/callback'

export function buildAuth0Options() {
  return {
    domain: env.auth0Domain,
    clientId: env.auth0ClientId,
    authorizationParams: {
      redirect_uri: `${window.location.origin}${AUTH0_CALLBACK_PATH}`,
      audience: env.auth0Audience,
      scope: 'openid profile email',
    },
    skipRedirectCallback: window.location.pathname !== AUTH0_CALLBACK_PATH,
  }
}
