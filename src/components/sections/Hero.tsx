import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Zap, Calendar, Gauge, Activity } from 'lucide-react'
import { useSite } from '../../context/SiteContext'
import { Moto } from '../../data/initialData'

function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })
}

/** Splits model name: first word(s) as headline, rest as subline */
function splitModelName(marca: string, modelo: string): { headline: string; subline: string } {
  // Use brand as headline, model as subline
  return { headline: marca.toUpperCase(), subline: modelo.toUpperCase() }
}

export default function Hero() {
  const { data } = useSite()
  const destaque = data.motos.filter(m => m.destaque && m.status === 'Disponivel')
  const motos = destaque.length > 0 ? destaque : data.motos.slice(0, 4)

  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir)
    setCurrent(idx)
  }, [])

  const prev = () => goTo((current - 1 + motos.length) % motos.length, -1)
  const next = useCallback(() => goTo((current + 1) % motos.length, 1), [current, motos.length, goTo])

  useEffect(() => {
    if (motos.length <= 1) return
    const t = setTimeout(next, 6500)
    return () => clearTimeout(t)
  }, [current, next, motos.length])

  if (motos.length === 0) return null

  const moto = motos[current]
  const { headline, subline } = splitModelName(moto.marca, moto.modelo)

  const imgVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '6%' : '-6%', opacity: 0, scale: 1.04 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-6%' : '6%', opacity: 0, scale: 0.97 }),
  }

  const handleScrollToEstoque = () => {
    document.querySelector('#estoque')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleWhatsApp = (moto: Moto) => {
    const msg = encodeURIComponent(
      `Olá! Tenho interesse na ${moto.marca} ${moto.modelo} ${moto.ano}. Gostaria de mais informações.`
    )
    window.open(`https://wa.me/5548999152309?text=${msg}`, '_blank')
  }

  const specs = [
    { icon: Calendar, label: 'Ano', value: moto.ano.toString() },
    { icon: Gauge, label: 'Motor', value: moto.motor },
    { icon: Activity, label: '0–100', value: moto.zero100 },
    { icon: Zap, label: 'Potência', value: moto.potencia },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-mkp-black">

      {/* ── WATERMARK: huge model name behind everything ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={moto.id + '-wm'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
        >
          <span
            className="font-bebas text-white whitespace-nowrap w-full text-center block"
            style={{
              fontSize: 'clamp(120px, 22vw, 340px)',
              lineHeight: 1,
              opacity: 0.045,
              letterSpacing: '-0.02em',
            }}
          >
            {moto.modelo.toUpperCase()}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* ── RIGHT SIDE: motorcycle photo ── */}
      <div className="absolute inset-0 z-0">
        {/* Dark base + left-side gradient overlay */}
        <div className="absolute inset-0 bg-mkp-black" />
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={moto.id + '-bg'}
            custom={direction}
            variants={imgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            {/* Photo occupies right ~55% */}
            <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%]">
              <img
                src={moto.fotos[0]}
                alt={`${moto.marca} ${moto.modelo}`}
                className="w-full h-full object-cover object-center"
              />
              {/* Fade from left edge of photo into dark */}
              <div className="absolute inset-0 bg-gradient-to-r from-mkp-black via-mkp-black/60 to-transparent" />
            </div>
          </motion.div>
        </AnimatePresence>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-mkp-black to-transparent" />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-mkp-black/80 to-transparent" />
      </div>

      {/* ── LEFT CONTENT ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-0">

          {/* Left column: all text */}
          <div className="flex-1 max-w-xl lg:max-w-[52%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={moto.id + '-text'}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="flex flex-col gap-5"
              >
                {/* Red overline subtitle */}
                <motion.p
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 }}
                  className="font-barlow font-700 text-mkp-red uppercase tracking-[0.22em] text-xs leading-relaxed"
                >
                  {data.hero.subtitulo || 'AS MELHORES MOTOS DO MERCADO ESTÃO AQUI NA MKP MOTOS'}
                </motion.p>

                {/* Model name: brand big white, model lighter gray */}
                <div className="flex flex-col leading-none">
                  <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-bebas text-white"
                    style={{ fontSize: 'clamp(54px, 9vw, 118px)', lineHeight: 0.92 }}
                  >
                    {headline}
                  </motion.h1>
                  <motion.span
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 }}
                    className="font-bebas text-white/40"
                    style={{ fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 1.05 }}
                  >
                    {subline}
                  </motion.span>
                </div>

                {/* Price */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.22 }}
                  className="font-bebas text-mkp-red tracking-wide"
                  style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
                >
                  {formatPrice(moto.preco)}
                </motion.p>

                {/* Specs row — horizontal with red left bar */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                  className="flex items-stretch gap-0 border-l-4 border-mkp-red pl-4"
                >
                  {specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex flex-col gap-0.5 pr-5 ${i < specs.length - 1 ? 'border-r border-white/10 mr-5' : ''}`}
                    >
                      <div className="flex items-center gap-1.5">
                        <spec.icon className="w-3.5 h-3.5 text-mkp-red flex-shrink-0" />
                        <span className="font-barlow text-[10px] uppercase tracking-widest text-mkp-muted">
                          {spec.label}
                        </span>
                      </div>
                      <span className="font-bebas text-lg text-white tracking-wide leading-none">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34 }}
                  className="flex flex-wrap gap-3 pt-1"
                >
                  <button
                    onClick={handleScrollToEstoque}
                    className="font-barlow font-700 text-sm uppercase tracking-widest px-7 py-3 bg-mkp-red hover:bg-mkp-red-hover text-white transition-all duration-300 rounded-sm glow-red-hover"
                  >
                    {data.hero.btnVerDetalhes}
                  </button>
                  <button
                    onClick={() => handleWhatsApp(moto)}
                    className="font-barlow font-700 text-sm uppercase tracking-widest px-7 py-3 bg-black/60 border border-white/25 text-white hover:border-mkp-red hover:text-mkp-red transition-all duration-300 rounded-sm backdrop-blur-sm"
                  >
                    {data.hero.btnSolicitarProposta}
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right column: spacer (photo is absolutely positioned) */}
          <div className="hidden lg:block flex-1" />
        </div>
      </div>

      {/* ── CAROUSEL CONTROLS ── */}
      {motos.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/60 border border-white/20 flex items-center justify-center hover:border-mkp-red hover:text-mkp-red text-white transition-all duration-200 rounded-sm"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/60 border border-white/20 flex items-center justify-center hover:border-mkp-red hover:text-mkp-red text-white transition-all duration-200 rounded-sm"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {motos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className={`transition-all duration-300 rounded-full ${
                  i === current ? 'w-8 h-2 bg-mkp-red' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
