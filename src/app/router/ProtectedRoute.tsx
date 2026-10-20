import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router'
import { useLogout, useTalyerSession } from '@/features/auth'
import { Button } from '@/shared/components/Button'
import { FullScreenStatus } from '@/shared/components/FullScreenStatus'

export function ProtectedRoute() {
  const { isLoading, isAuthenticated } = useAuth0()
  const { state, establish } = useTalyerSession()
  const logout = useLogout()

  useEffect(() => {
    if (isAuthenticated && state.status === 'idle') {
      void establish()
    }
  }, [isAuthenticated, state.status, establish])

  if (isLoading) {
    return <FullScreenStatus loading title="Verificando tu acceso…" />
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (state.status === 'error') {
    const forbidden = state.kind === 'forbidden'
    return (
      <FullScreenStatus
        title={forbidden ? 'Acceso pendiente' : 'No pudimos iniciar tu sesión'}
        description={state.message}
        actions={
          <>
            {!forbidden && <Button onClick={() => void establish()}>Reintentar</Button>}
            <Button variant="outline" onClick={() => void logout()}>
              Cerrar sesión
            </Button>
          </>
        }
      />
    )
  }

  if (state.status !== 'ready') {
    return <FullScreenStatus loading title="Preparando tu taller…" />
  }

  return <Outlet />
}
