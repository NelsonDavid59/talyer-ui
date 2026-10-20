import { useAuth0 } from '@auth0/auth0-react'
import { Link, Navigate } from 'react-router'
import { FullScreenStatus } from '@/shared/components/FullScreenStatus'

export function CallbackPage() {
  const { isLoading, isAuthenticated, error } = useAuth0()

  if (error) {
    return (
      <FullScreenStatus
        title="No pudimos completar el ingreso"
        description={error.message}
        actions={
          <Link
            to="/"
            className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-deep"
          >
            Volver al inicio
          </Link>
        }
      />
    )
  }

  if (isLoading) {
    return <FullScreenStatus loading title="Confirmando tu ingreso…" />
  }

  return <Navigate to={isAuthenticated ? '/app' : '/'} replace />
}
