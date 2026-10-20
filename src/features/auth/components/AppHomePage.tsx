import { Button } from '@/shared/components/Button'
import { WrenchIcon } from '@/shared/components/icons'
import { useLogout } from '../hooks/useLogin'
import { useTalyerSession } from '../model/talyer-session.context'

export function AppHomePage() {
  const { state } = useTalyerSession()
  const logout = useLogout()

  if (state.status !== 'ready') return null

  const { session } = state
  const displayName = [session.firstName, session.lastName].filter(Boolean).join(' ') || session.username

  const handleLogout = () => void logout()

  return (
    <div className="mx-auto flex min-h-svh max-w-4xl flex-col gap-8 px-5 py-8 sm:px-8">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-navy text-white">
            <WrenchIcon className="size-5" />
          </span>
          <span className="text-sm font-extrabold tracking-[0.2em] text-navy">TALYERAPP</span>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </header>

      <main className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-bold tracking-[0.2em] text-accent">SESIÓN ACTIVA</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy">Hola, {displayName}</h1>
        <p className="mt-1 text-sm text-slate-500">{session.email}</p>

        <h2 className="mt-8 text-sm font-bold text-navy">Tus accesos</h2>
        {session.assignments.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">Todavía no tienes roles asignados.</p>
        ) : (
          <ul className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200">
            {session.assignments.map((assignment) => (
              <li
                key={`${assignment.tenantId}-${assignment.roleCode}-${assignment.branchId ?? 'all'}`}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
              >
                <span className="font-semibold text-slate-800">{assignment.tenantCode}</span>
                <span className="flex items-center gap-2">
                  {assignment.branchId !== null && (
                    <span className="text-xs text-slate-500">Sucursal #{assignment.branchId}</span>
                  )}
                  <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-navy">
                    {assignment.roleCode}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
