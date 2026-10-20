import { Auth0Provider, type AppState } from '@auth0/auth0-react'
import { useCallback, useMemo } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { TalyerSessionProvider } from '@/features/auth'
import { missingEnvVars } from '@/shared/config/env'
import { buildAuth0Options } from './Auth0Config'

function MissingConfigScreen() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-surface p-6">
      <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-navy">Falta configurar Auth0</h1>
        <p className="mt-2 text-sm text-slate-600">
          Copia <code className="rounded bg-slate-100 px-1">.env.example</code> a{' '}
          <code className="rounded bg-slate-100 px-1">.env.local</code>, completa estas variables y reinicia{' '}
          <code className="rounded bg-slate-100 px-1">npm run dev</code>:
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 font-mono text-sm text-slate-800">
          {missingEnvVars.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export function AppProviders() {
  const navigate = useNavigate()
  const options = useMemo(() => buildAuth0Options(), [])

  const onRedirectCallback = useCallback(
    (appState?: AppState) => {
      const returnTo = typeof appState?.returnTo === 'string' ? appState.returnTo : '/app'
      navigate(returnTo, { replace: true })
    },
    [navigate],
  )

  if (missingEnvVars.length > 0) {
    return <MissingConfigScreen />
  }

  return (
    <Auth0Provider {...options} onRedirectCallback={onRedirectCallback}>
      <TalyerSessionProvider>
        <Outlet />
      </TalyerSessionProvider>
    </Auth0Provider>
  )
}
