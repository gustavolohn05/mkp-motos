import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useSite } from '../../context/SiteContext'
import AnimatedSection from '../ui/AnimatedSection'

export default function Depoimentos() {
  const { data } = useSite()
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(i => (i - 1 + data.depoimentos.length) % data.depoimentos.length)
  const next = useCallback(() => setCurrent(i => (i + 1) % data.depoimentos.length), [data.depoimentos.length])

  useEffect(() => {
    const t = setTimeout(next, 5000)
    return () => clearTimeout(t)
  }, [current, next])

  if (data.depoimentos.length === 0) return null

  const dep = data.depoimentos[current]

  return (
    <section className="py-20 bg-mkp-dark relative overflow-hidden">
      {/* Big quote decoration */}
      <div
        className="absolute top-8 left-8 font-bebas text-mkp-red/10 select-none pointer-events-none leading-none"
        style={{ fontSize: 'clamp(120px, 20vw, 280px)' }}
      >
        "
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <AnimatedSection className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-mkp-red" />
            <span className="font-barlow font-600 text-xs uppercase tracking-[0.3em] text-mkp-red">
              Depoimentos
            </span>
            <div className="w-8 h-0.5 bg-mkp-red" />
          </div>
          <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wide leading-none">
            O QUE DIZEM
          </h2>
        </AnimatedSection>

        {/* Carousel */}
        <div className="relative flex items-center gap-4">
          <button
            onClick={prev}
            className="hidden sm:flex flex-shrink-0 w-10 h-10 border border-mkp-border items-center justify-center text-mkp-muted hover:border-mkp-red hover:text-mkp-red transition-all rounded-sm"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex-1 overflow-hidden min-h-[220px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={dep.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full text-center flex flex-col items-center gap-5"
              >
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: dep.estrelas }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-mkp-red text-mkp-red" />
                  ))}
                </div>

                {/* Text */}
                <p className="font-barlow text-lg md:text-xl text-white/80 leading-relaxed italic max-w-2xl">
                  "{dep.texto}"
                </p>

                {/* Author */}
                <div className="flex flex-col items-center gap-1">
                  <span className="font-barlow font-700 text-white text-base">{dep.nome}</span>
                  <span className="font-barlow text-sm text-mkp-red">{dep.modelo}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            className="hidden sm:flex flex-shrink-0 w-10 h-10 border border-mkp-border items-center justify-center text-mkp-muted hover:border-mkp-red hover:text-mkp-red transition-all rounded-sm"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile arrows */}
        <div className="flex sm:hidden items-center justify-center gap-3 mt-6">
          <button
            onClick={prev}
            className="w-10 h-10 border border-mkp-border flex items-center justify-center text-mkp-muted hover:border-mkp-red hover:text-mkp-red transition-all rounded-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 border border-mkp-border flex items-center justify-center text-mkp-muted hover:border-mkp-red hover:text-mkp-red transition-all rounded-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {data.depoimentos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? 'w-8 h-2 bg-mkp-red' : 'w-2 h-2 bg-mkp-muted/30 hover:bg-mkp-muted/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
