import type { ComponentType, SVGProps } from 'react'
import { CarIcon, HammerIcon, SprayIcon } from '@/shared/components/icons'

export type HeroSlide = {
  id: string
  title: string
  /** Foto opcional en `features/landing/assets/`; sin ella se usa el degradado de marca. */
  image?: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  gradient: string
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'chaperia',
    title: 'Chapería de precisión',
    icon: HammerIcon,
    gradient: 'from-slate-700 via-navy to-navy-deep',
  },
  {
    id: 'pintura',
    title: 'Pintura profesional',
    icon: SprayIcon,
    gradient: 'from-accent/80 via-navy to-navy-deep',
  },
  {
    id: 'entrega',
    title: 'Entregas a tiempo',
    icon: CarIcon,
    gradient: 'from-sky-600 via-navy to-slate-900',
  },
]
