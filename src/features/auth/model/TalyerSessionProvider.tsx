import { useAuth0 } from '@auth0/auth0-react'
import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { env } from '@/shared/config/env'
import { EstablishSessionError, establishSession } from '../api/establishSession'
import { TalyerSessionContext, type TalyerSessionContextValue } from './talyer-session.context'
import type { TalyerSessionState } from './talyer-session.types'

export function TalyerSessionProvider({ children }: { children: ReactNode }) {
  const { getAccessTokenSilently } = useAuth0()
  const [state, setState] = useState<TalyerSessionState>({ status: 'idle' })
  const inFlight = useRef<Promise<void> | null>(null)

  const establish = useCallback(() => {
    if (inFlight.current) return inFlight.current

    const run = async () => {
      setState({ status: 'loading' })
      try {
        const auth0Token = await getAccessTokenSilently({
          authorizationParams: { audience: env.auth0Audience },
        })
        if (!auth0Token) {
          throw new EstablishSessionError('unauthorized', 'Auth0 no devolvió un access token. Vuelve a ingresar.')
        }
        const result = await establishSession(auth0Token)
        setState({ status: 'ready', accessToken: result.accessToken, session: result.session })
      } catch (error) {
        if (error instanceof EstablishSessionError) {
          setState({ status: 'error', kind: error.kind, message: error.message })
        } else {
          const message = error instanceof Error ? error.message : 'No pudimos obtener tu token de Auth0.'
          setState({ status: 'error', kind: 'unauthorized', message })
        }
      } finally {
        inFlight.current = null
      }
    }

    inFlight.current = run()
    return inFlight.current
  }, [getAccessTokenSilently])

  const clear = useCallback(() => setState({ status: 'idle' }), [])

  const value = useMemo<TalyerSessionContextValue>(
    () => ({ state, establish, clear }),
    [state, establish, clear],
  )

  return <TalyerSessionContext value={value}>{children}</TalyerSessionContext>
}
