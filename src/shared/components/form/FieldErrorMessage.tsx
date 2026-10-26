type FieldErrorMessageProps = {
  id: string
  message?: string
}

export function FieldErrorMessage({ id, message }: FieldErrorMessageProps) {
  if (!message) return null

  return (
    <p id={id} role="alert" className="mt-1 text-xs text-red-600">
      {message}
    </p>
  )
}
