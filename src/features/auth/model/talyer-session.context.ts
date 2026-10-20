import { createContext, useContext } from 'react'
import type { TalyerSessionState } from './talyer-session.types'

export type TalyerSessionContextValue = {
  state: TalyerSessionState
  establish: () => Promise<void>
  clear: () => void
}

export const TalyerSessionContext = createContext<TalyerSessionContextValue | null>(null)

export function useTalyerSession(): TalyerSessionContextValue {
  const value = useContext(TalyerSessionContext)
  if (!value) {
    throw new Error('useTalyerSession must be used inside TalyerSessionProvider')
  }
  return value
}
