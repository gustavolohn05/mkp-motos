import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useSite } from '../../context/SiteContext'
import AnimatedSection from '../ui/AnimatedSection'

function CountUp({ end, duration = 2000 }: { end: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayed, setDisplayed] = useState('0')

  useEffect(() => {
    if (!isInView) return
    // Extract numeric part and suffix
    const match = end.match(/^(\d+)(.*)$/)
    if (!match) { setDisplayed(end); return }
    const target = parseInt(match[1])
    const suffix = match[2]
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setDisplayed(`${target}${suffix}`)
        clearInterval(timer)
      } else {
        setDisplayed(`${Math.floor(start)}${suffix}`)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, end, duration])

  return <span ref={ref}>{displayed}</span>
}

export default function Sobre() {
  const { data } = useSite()

  return (
    <section id="sobre" className="py-20 bg-mkp-black relative noise-overlay overflow-hidden">
      {/* Decorative diagonal */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-mkp-red/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <AnimatedSection direction="left">
            <div className="flex items-center gap-3 mb-4">
              <div className="section-divider" />
              <span className="font-barlow font-600 text-xs uppercase tracking-[0.3em] text-mkp-red">
                Sobre Nós
              </span>
            </div>
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wide leading-none mb-8">
              A MKP MOTOS
            </h2>
            <p className="font-barlow text-mkp-muted leading-relaxed mb-8 text-base">
              {data.sobre.historia}
            </p>

            {/* Differentials */}
            <div className="flex flex-col gap-4">
              {data.sobre.diferenciais.map((dif, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-mkp-red flex-shrink-0 mt-0.5" />
                  <span className="font-barlow text-sm text-white/80 leading-relaxed">{dif}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: Numbers */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {data.sobre.numeros.map((num, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.3 }}
                  className="bg-mkp-card border border-mkp-border rounded-sm p-6 flex flex-col gap-2 group hover:border-mkp-red/50 transition-all duration-300"
                >
                  <span className="font-bebas text-4xl md:text-5xl text-mkp-red tracking-wide leading-none">
                    <CountUp end={num.valor} />
                  </span>
                  <span className="font-barlow text-sm text-mkp-muted uppercase tracking-wide">
                    {num.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
