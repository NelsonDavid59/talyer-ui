import { useAuth0 } from '@auth0/auth0-react'
import { useCallback } from 'react'
import { env } from '@/shared/config/env'

export function useLogin() {
  const { loginWithRedirect } = useAuth0()

  return useCallback(
    (returnTo = '/app') =>
      loginWithRedirect({
        appState: { returnTo },
        authorizationParams: {
          audience: env.auth0Audience,
          connection: env.auth0Connection,
        },
      }),
    [loginWithRedirect],
  )
}

export function useLogout() {
  const { logout } = useAuth0()

  return useCallback(
    () => logout({ logoutParams: { returnTo: window.location.origin } }),
    [logout],
  )
}
