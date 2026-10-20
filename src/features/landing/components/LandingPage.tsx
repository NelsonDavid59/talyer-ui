import { HeroCarousel } from './HeroCarousel'
import { LandingFooter } from './LandingFooter'
import { LandingHeader } from './LandingHeader'
import { LeadFormCard } from './LeadFormCard'

export function LandingPage() {
  return (
    <div className="mx-auto flex min-h-svh max-w-7xl flex-col gap-8 px-5 py-6 sm:px-8 lg:gap-10 lg:py-8">
      <LandingHeader />

      <main className="grid flex-1 items-stretch gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-navy">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            LA PLATAFORMA PARA TU TALLER
          </span>

          <h1 className="mt-6 text-5xl leading-[0.95] font-extrabold tracking-tighter text-navy sm:text-6xl">
            Tu taller, <span className="text-accent">más simple.</span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">
            TalyerApp ayuda a talleres de chapería y pintura a ordenar su operación, crecer y atender mejor a
            sus clientes.
          </p>

          <div className="mt-8">
            <LeadFormCard />
          </div>
        </div>

        <HeroCarousel />
      </main>

      <LandingFooter />
    </div>
  )
}
