import { env } from '@/shared/config/env'
import type { EstablishSessionResponse, SessionErrorKind } from '../model/talyer-session.types'

export class EstablishSessionError extends Error {
  readonly kind: SessionErrorKind
  readonly status: number | undefined

  constructor(kind: SessionErrorKind, message: string, status?: number) {
    super(message)
    this.name = 'EstablishSessionError'
    this.kind = kind
    this.status = status
  }
}

async function readProblemDetail(response: Response): Promise<string | undefined> {
  try {
    const body = (await response.json()) as { detail?: string; title?: string }
    return body.detail ?? body.title
  } catch {
    return undefined
  }
}

export async function establishSession(
  auth0AccessToken: string,
  signal?: AbortSignal,
): Promise<EstablishSessionResponse> {
  let response: Response
  try {
    response = await fetch(`${env.talyerApiUrl}/session`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth0AccessToken}`,
        Accept: 'application/json',
      },
      signal,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new EstablishSessionError('network', 'No pudimos conectar con Talyer. Revisa que la API esté disponible.')
  }

  if (response.ok) {
    return (await response.json()) as EstablishSessionResponse
  }

  const detail = await readProblemDetail(response)

  if (response.status === 403) {
    throw new EstablishSessionError(
      'forbidden',
      'Tu correo aún no tiene acceso en Talyer. Si ya solicitaste tu cuenta, espera la aprobación.',
      403,
    )
  }

  if (response.status === 401) {
    throw new EstablishSessionError(
      'unauthorized',
      'Talyer no aceptó tu sesión de Auth0. Vuelve a ingresar.',
      401,
    )
  }

  throw new EstablishSessionError(
    'unknown',
    detail ?? `Error inesperado al iniciar sesión (HTTP ${response.status}).`,
    response.status,
  )
}
