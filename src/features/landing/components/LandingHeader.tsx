import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { useLogin } from '@/features/auth'
import { ArrowUpRightIcon, WrenchIcon } from '@/shared/components/icons'

const pillClasses =
  'inline-flex cursor-pointer items-center gap-2 rounded-full border border-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow-sm transition hover:border-navy/30 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-70'

export function LandingHeader() {
  const { isAuthenticated } = useAuth0()
  const login = useLogin()
  const [redirecting, setRedirecting] = useState(false)

  const handleLogin = async () => {
    setRedirecting(true)
    try {
      await login()
    } catch(error) {
      setRedirecting(false)
    }
  }

  return (
    <header className="flex items-center justify-between gap-4">
      <Link to="/" className="flex items-center gap-3" aria-label="TalyerApp, inicio">
        <span className="flex size-10 items-center justify-center rounded-xl bg-navy text-white shadow-md shadow-navy/20">
          <WrenchIcon className="size-5" />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-extrabold tracking-[0.2em] text-navy">TALYERAPP</span>
          <span className="block text-[9px] font-semibold tracking-[0.15em] whitespace-nowrap text-slate-400 sm:text-[10px] sm:tracking-[0.25em]">
            GESTIÓN PARA TALLERES
          </span>
        </span>
      </Link>

      {isAuthenticated ? (
        <Link to="/app" className={pillClasses}>
          Ir a mi taller
          <ArrowUpRightIcon className="size-4" />
        </Link>
      ) : (
        <button type="button" onClick={handleLogin} disabled={redirecting} className={pillClasses}>
          {redirecting ? 'Redirigiendo…' : 'Ingresar'}
          <ArrowUpRightIcon className="size-4" />
        </button>
      )}
    </header>
  )
}
