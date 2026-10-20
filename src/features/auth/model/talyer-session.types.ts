export type SessionAssignment = {
  roleCode: string
  tenantId: number
  tenantCode: string
  branchId: number | null
}

export type TalyerSession = {
  userId: string
  email: string
  username: string
  firstName: string
  lastName: string
  assignments: SessionAssignment[]
}

export type EstablishSessionResponse = {
  accessToken: string
  session: TalyerSession
}

export type SessionErrorKind = 'forbidden' | 'unauthorized' | 'network' | 'unknown'

export type TalyerSessionState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ready'; accessToken: string; session: TalyerSession }
  | { status: 'error'; kind: SessionErrorKind; message: string }
