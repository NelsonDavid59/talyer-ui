import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'outline'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-deep',
  outline: 'border border-navy/20 bg-white text-navy hover:border-navy/40 hover:bg-slate-50',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }

export function Button({ variant = 'primary', className = '', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
