import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@/shared/components/icons'
import { heroSlides } from '../model/slides'

const pad = (value: number) => String(value).padStart(2, '0')

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const total = heroSlides.length

  const go = (delta: number) => setIndex((current) => (current + delta + total) % total)

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Servicios del taller"
      className="relative isolate h-full min-h-80 overflow-hidden rounded-[2rem] bg-navy-deep shadow-2xl shadow-navy/20 sm:min-h-[26rem]"
    >
      {heroSlides.map((slide, slideIndex) => {
        const Icon = slide.icon
        const active = slideIndex === index
        return (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${slideIndex + 1} de ${total}: ${slide.title}`}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}
          >
            {slide.image ? (
              <img src={slide.image} alt="" className="size-full object-cover" />
            ) : (
              <div className={`flex size-full items-center justify-center bg-linear-to-br ${slide.gradient}`}>
                <Icon className="size-40 text-white/10 sm:size-56" strokeWidth={1.25} />
              </div>
            )}
          </div>
        )
      })}

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-deep/90 via-navy-deep/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
        <div aria-live="polite">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-accent">
            {pad(index + 1)} / {pad(total)}
          </p>
          <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">{heroSlides[index].title}</p>
          <div className="mt-3 flex gap-1.5">
            {heroSlides.map((slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setIndex(slideIndex)}
                aria-label={`Ir a ${slide.title}`}
                aria-current={slideIndex === index}
                className={`h-1 cursor-pointer rounded-full transition-all ${slideIndex === index ? 'w-6 bg-accent' : 'w-3 bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Diapositiva anterior"
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Diapositiva siguiente"
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
